<template>
  <div class="edit-block"  v-if="$route.name == 'sticker'">
    <div class="top-block">
      <div class="preview-block" v-loading="load">
        <div class="input-block input-block__lined">
          <el-input
            ref="input_name"
            v-model="item.name"
            placeholder="Enter a label name"
          ></el-input>
          <div class="selecet-size">
            <div
              class="size-one"
              :class="{ current: item.size == 0 }"
              @click="item.size = 0"
            >
              30x20
            </div>
            <div
              class="size-one"
              :class="{ current: item.size == 1 }"
              @click="item.size = 1"
            >
              50x70
            </div>
          </div>
        </div>
        <div class="preview-block__template">
            <div class="preview-zone" v-if="draw">
                <Moveable
    class="moveable"
    v-bind="moveable"
    @drag="handleDrag(el, $event)"
    v-for="el in draw_elems" :key="el.id"
    v-bind:style="{ transform: el.transform }"
  >
    <div v-html="el.content" ></div>
  </Moveable>
            </div>
    


          <v-stage
            ref="stage"
            :config="configKonva"
            @dragend="handleDragend"
            v-if="false"
          >
            <v-layer ref="layer">
              <v-image
                v-for="image in images"
                :key="image.id"
                :config="image.config"
              ></v-image>
            </v-layer>
          </v-stage>
        </div>
      </div>
      <div class="action-block">
        <a class="button btn-send" @click="$root.app.print = true">
          <div class="button-icon" v-html="$root.icons.print"></div>
          Print
        </a>

        <div class="stat-info-bock">
          <div class="stat-info">
            <div class="stati-icon" v-html="$root.icons.file_plus"></div>
            <div class="stat-info-data">
              Created
              <div class="stat-info-value">
                {{ item.created_at | moment("DD.MM.YYYY h:mm") }}
              </div>
            </div>
          </div>
          <div class="stat-info" v-if="item.user_id == 10">
            <div class="stati-icon" v-html="$root.icons.user"></div>
            <div class="stat-info-data">
              Created by
              <div class="stat-info-value">Dmitriy Pravdin</div>
            </div>
          </div>
          <div class="stat-info" v-else>
            <div class="stati-icon" v-html="$root.icons.user"></div>
            <div class="stat-info-data">
              Created by
              <div class="stat-info-value">Alexey Sherbakov</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-block">
      <div class="edit-list">
        <bl-wisy v-for="el in item.elems" :key="el.id" :item="el"></bl-wisy>
      </div>
      <div class="action-block">
        <a class="button btn-outline" @click="add()">
          <div class="button-icon" v-html="$root.icons.grid"></div>
          Add Block
        </a>
      </div>
    </div>
    <PrintForm />
  </div>
</template>

<script>
import PrintForm from "../../../layouts/PrintForm.vue";
import blWisy from "./bl-wisy.vue";
import Moveable from "vue-moveable";

import html2canvas from "html2canvas";
import _ from "lodash";

export default {
  name: "bl-sticker-edit",
  data: () => {
    return {
      content: "",
      draw: true,
      load: false,
      configKonva: {
        width: 556,
        height: 212,
      },
      moveable: {
        draggable: true,
        dragArea: true,
        edge: true,
        edgeDraggable: true,
        throttleDrag: 0,
        resizable: false,
        padding: { left: 6, top: 0, right: 6, bottom: 0 },
        throttleResize: 1,
        keepRatio: false,
        scalable: false,
        throttleScale: 0,
        rotatable: true,
        throttleRotate: 0,
        pinchable: false, // ["draggable", "resizable", "scalable", "rotatable"]
        origin: false,
      },
    };
  },
  computed: {
    item: function () {
      return this.$root.app.stickers.find(
        (x) => x.id == this.$route.params.sid
      );
    },
    draw_elems: function () {
      this.draw = false; this.load = true;
      setTimeout(() => { this.draw = true; this.load = false; }, 200)
      return this.item.elems
    }
  },
  watch: {
    item: {
      handler: _.debounce(function () {
        
        this.updateImage();
        
      }, 1000),
      deep: true,
    },
  },
  methods: {
    updateImage(){
        html2canvas(document.querySelector(".preview-zone"), {
                backgroundColor: "rgba(0,0,0,0)",
                allowTaint: true,
            }).then((canvas) => {
                this.item.base64 = canvas.toDataURL();
            })
    },
    handleDrag(el, { target, transform }) {
      el.transform = transform;
      target.style.transform = transform;
    },
    add() {
      this.item.elems.unshift({
        id: this.$root.app.generator(),
        content: "Put text",
        base64: "",
        transform: ''
      });
    },
    handleDragend(e) {
      const x = e.target.attrs.x;
      const y = e.target.attrs.y;
      const id = e.target.attrs.id;

      let obj = this.item.elems.find((x) => x.id == id);

      obj.x = x;
      obj.y = y;
    },
    onEditorChange() {},
  },
  components: {
    blWisy,
    PrintForm,
    Moveable,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.edit-block {
  padding-left: 48px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  flex-grow: 1;
}

.top-block {
  margin-bottom: 32px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
}
.preview-block__template {
  margin-top: 24px;
  display: flex;
  height: 280px;
  width: 620px;
  /* margin-left: 32px; */
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 6px 0 18px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 10;
  transition: 0.25s;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  padding: 32px;
}
.edit-block .action-block {
  margin-left: 32px;
  flex-grow: 1;
  max-width: 280px;
}
.konvajs-content {
  border: 1px dashed #0368fa;
  border-radius: 4px;
}
.bottom-block {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
}
.edit-list {
  width: 620px;
}
.quill-editor .ql-toolbar.ql-snow {
  border-radius: 5px;
  border: none;
  box-shadow: 6px 0 18px rgba(0, 0, 0, 0.06);
  background-color: #fff;
}

.quill-editor .ql-container.ql-snow {
  border: none;
}
.ql-editor {
  width: auto;
  height: auto;
  min-height: 10px !important;
}

div#quill-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: stretch;
}
.quillWrapper .ql-snow.ql-toolbar {
  padding-top: 8px;
  padding-bottom: 4px;
  background-color: #fff;
  border-radius: 4px;
  border: none;
}
.edit-list__one {
  padding: 12px;
  background-color: #fff;
  border-radius: 4px;
  font-size: 13px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: stretch;
}

.edit-list__one p {
  margin: 0;
}
.edit-list__one + .edit-list__one {
  margin-top: 12px;
}
.edit-list__one-actions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: auto;
  align-content: stretch;
}

.edit-list__one-text {
  min-height: 24px;
  padding: 2px 0;
  margin-left: 12px;
}
.edit-list__one a.sticker-action-one {
  background-color: transparent;
  &:hover {
    color: #0368fa;
    &.sticker-action-one__remove {
      color: #dc3545;
    }
  }
}
.ql-container.ql-snow {
  border: none !important;
  background-color: #f5f5f5;
  border-radius: 3px;
}
.selecet-size {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  background-color: #ffffff;
  height: 36px;
  border-radius: 3px;
  margin-left: 8px;
  padding: 4px;
}

.size-one {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  height: 100%;
  padding: 0 6px;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
}

.size-one.current {
  background-color: #0368fa;
  color: #fff;
  cursor: default;
}

.size-one + .size-one {
  margin-left: 0px;
}
.stat-info-bock {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
}

.stat-info {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
}

.stati-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  background-color: #f0f2f5;
  border-radius: 3px;
}

.stati-icon svg {
  height: 16px;
}

.stat-info-data {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  font-size: 14px;
  font-weight: 500;
  padding-top: 3px;
}

.stat-info-value {
  font-weight: 400;
  /* margin-top: 4px; */
  font-size: 13px;
}

.stat-info + .stat-info {
  margin-top: 16px;
}
.preview-zone {
    height: 100%;
    width: 100%;
    overflow: hidden;
    border: 2px dashed #CCD2DE;
    border-radius: 3px;
    position: relative;
}
.moveable {
    width: auto;
    height: auto;
    display: inline-block;
    line-height: 1.495;
    position: absolute;
}
.moveable-line.moveable-rotation-line {
    display: none;
}
.moveable-line.moveable-rotation-line {
    display: none;
}

.moveable-line {
    background-color: transparent!important;
    border: 1px dashed #0368fa;
}

.moveable-control-box {
    cursor: move;
    z-index: 1000!important;
}
</style>
