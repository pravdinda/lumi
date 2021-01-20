<template>
  <div
    class="sticker-one"
    :class="{ current: $route.params.sid == item.id }"
    v-loading="load"
  >
    <div class="sticker-one-left">
      <div class="sticker-one-title">
        <div class="sticker-size" :data-size="item.size">{{ $root.app.sizes.find( x => x.id == item.size).label }}</div>
        {{ item.name }}
      </div>
      <div class="sticker-one-preview">
            <img v-if="item.base64" :src="item.base64" />
            <div v-else class="sticker-one__icon" v-html="$root.icons.image"></div>
      </div>
    </div>
    <div class="sticker-one-right">
      <div class="sticker-one-actions">

        <el-tooltip
          class="item"
          effect="dark"
          content="Print"
          placement="top-start"
        >

        <a class="sticker-action-one" @click.stop="print()">
          <div class="action-icon" v-html="$root.icons.print"></div>
        </a>

        </el-tooltip>

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

         <a
          class="sticker-action-one sticker-action-one__remove"
          @click.stop="remove()"
        >
          <div class="action-icon" v-html="$root.icons.trash_2"></div>
        </a>

        </el-tooltip>

       
    </div>


      <router-link class="edit-button" :to="'/tools/stickers/' + item.id">
        <span>Edit</span>
        <div class="edit-button-icon" v-html="$root.icons.chevrons_right"></div>
      </router-link>
  </div>
</div>
</template>

<script>

export default {
  name: "bl-sticker",
  props: ["item", "current"],
  data: function () {
    return {
      load: false
    };
  },
  methods: {
    print() {
      this.$root.app.print = true;
    },
    copy() {
      this.$confirm(null, "Dublicate label?", {
        confirmButtonText: "Dublicate",
        cancelButtonText: "Cancel",
        center: true,
      })
        .then(() => {
          
          const block = Object.assign({}, this.item);
          block.id = this.$root.app.generator();
          block.iser_id = this.$root.app.user.id;
            this.$root.app.stickers.unshift(block)
                this.$message({
                  message: "Label has been successfully copied",
                  type: "success",
                });
              }
        )
    },
    remove() {
      this.$confirm(null, "Remove label ?", {
        confirmButtonText: "Remove",
        cancelButtonText: "Cancel",
        center: true,
      })
        .then(() => {
          
          let index = this.$root.app.stickers.findIndex(
            x => x.id == this.item.id
          );
        

            this.$root.app.stickers.splice(index, 1);


                this.$message({
                  message: "Label successfully deleted",
                  type: "success",
                });
        })
        .catch(() => {});
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.sticker-one {
  background-color: #fff;
  width: 100%;
  border-radius: 3px;
  padding: 12px 24px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  transition: 0.25s;
  position: relative;
  & +  .sticker-one {
  margin-top: 12px;
}
  &::after {
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    border: 2px solid #0159fc;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    transition: 0.25s;
    z-index: -1;
    opacity: 0;
  }
  .el-loading-mask {
    background-color: rgba(1, 89, 252, 0.25);
  }
  .el-loading-mask circle.path {
    stroke: #fff;
    stroke-width: 5px;
  }
}
.action-one.preview {
  margin-bottom: 40px;
}

.sticker-one.current::after {
  opacity: 1;
}
.sticker-one-preview {
    height: 60px;
    width: 160px;
    margin-top: 12px;
    background-color: #f8f9fa;
    border-radius: 2px;
    display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
    align-content: stretch;
    .sticker-one__icon {
        display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
    align-content: stretch;
    }
    svg{
        height:24px;
        width: 24px;
        stroke: #ccd2de;
    }
    img{
        width:100%;
    }
}

.sticker-one-title {
  font-weight: 500;
  cursor: pointer;
  width: 200px;
height: 23px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
}

.sticker-size {
    height: 20px;
    width: auto;
    padding: 0 6px;
    border-radius: 3px;
    font-size: 11px;
    margin-right: 8px;
    background-color: #f5f5f5;
    color: #FFF;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
    font-weight: 500;
}

.sticker-size[data-size="0"] {
    background-color: #BB9CFF;
}
.sticker-size[data-size="1"] {
    background-color: #48E3FF;
}
</style>
