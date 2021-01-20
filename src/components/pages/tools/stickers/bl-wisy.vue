<template>
  <div class="edit-list__one">
    <el-tooltip
      class="item"
      effect="dark"
      :content="edit ? 'Save' : 'Edit'"
      placement="top-start"
    >
      <a
        class="sticker-action-one"
        @click.stop="editTrigger"
        :class="{ 'sticker-action-one__save': edit }"
      >
        <div
          class="action-icon"
          v-html="edit ? $root.icons.save : $root.icons.edit"
        ></div>
      </a>
    </el-tooltip>
    <div class="edit-list__one-text" v-html="item.content" v-if="!edit"></div>

    <div class="editor-block">
      <vue-editor
        v-model="item.content"
        v-if="edit"
        :editor-toolbar="editorOptions"
      ></vue-editor>
    </div>
    <div class="edit-list__one-actions" v-if="!edit">
      <el-tooltip
        class="item"
        effect="dark"
        content="Copy"
        placement="top-start"
      >
        <a class="sticker-action-one" @click.stop="copy()">
          <div class="action-icon" v-html="$root.icons.copy"></div>
        </a>
      </el-tooltip>

      <el-tooltip
        class="item"
        effect="dark"
        content="Remove"
        placement="top-start"
      >
        <a class="sticker-action-one sticker-action-one__remove" @click.stop="remove()">
          <div class="action-icon" v-html="$root.icons.trash_2"></div>
        </a>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";



export default {
  name: "bl-wisy",
  props: ["item"],
  data: function () {
    return {
      load: false,
      edit: false,
      editorOptions: [
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    };
  },
  watch:{
      'item.content' : function(){
        this.$parent.draw = false; this.$parent.load = true;
        setTimeout(() => { this.$parent.draw = true; this.$parent.load = false; }, 200)
      }
  },
  methods: {
    editTrigger() {
      this.edit = !this.edit;
    },
    copy() {
      this.$confirm(null, "Dublicate block?", {
        confirmButtonText: "Dublicate",
        cancelButtonText: "Cancel",
        center: true,
      })
        .then(() => {
          
          const block = Object.assign({}, this.item);
          block.id = this.$root.app.generator();
            this.$root.app.stickers.find( x => x.id == this.$route.params.sid ).elems.unshift(block)
                this.$message({
                  message: "Block has been successfully copied",
                  type: "success",
                });
              }
        )

    },
    remove() {
      this.$confirm(null, "Remove block ?", {
        confirmButtonText: "Remove",
        cancelButtonText: "Cancel",
        center: true,
      })
        .then(() => {
          
          let index = this.$root.app.stickers.find( x => x.id == this.$route.params.sid ).elems.findIndex(
            x => x.id == this.item.id
          );
        

            this.$root.app.stickers.find( x => x.id == this.$route.params.sid ).elems.splice(index, 1);


                this.$message({
                  message: "Block successfully deleted",
                  type: "success",
                });
        })
        .catch(() => {});
    }
  },
  components: {
    VueEditor,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#app {
  a.sticker-action-one {
    flex-shrink: 0;
  }
  .editor-block {
    padding: 0 12px;
    flex-grow: 1;
  }
  .edit-list__one a.sticker-action-one.sticker-action-one__save {
    background-color: rgba(3, 104, 250, 0.15);
  }
  .quillWrapper .ql-snow.ql-toolbar {
    padding: 0;
    padding-top: 0;
  }

  .quillWrapper .ql-toolbar.ql-snow .ql-formats {
    margin-right: 16px;
    margin-bottom: 8px;
  }

  .ql-snow .ql-toolbar button,
  .ql-snow.ql-toolbar button {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
    background-color: #f5f5f5;
    border-radius: 2px;
  }

  .ql-snow .ql-toolbar button + button,
  .ql-snow.ql-toolbar button + button {
    margin-left: 4px;
  }

  .ql-snow .ql-picker.ql-size {
    background-color: #f5f5f5;
    border-radius: 3px;
    top: 0;
  }

  .ql-toolbar.ql-snow .ql-picker-label {
    border: none;
    font-size: 13px;
  }
  .ql-editor {
    font-size: 15px;
  }
}
</style>
