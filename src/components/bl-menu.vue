<template>
  <section class="menu-block" :class="{ 'menu-open': !open }">
    <div class="page-info">
      <div class="logo-block">
        <div
          class="menu-icon"
          v-html="$root.icons.menu"
          @click="open = !open"
        ></div>
        <div class="logo">HemTrack</div>
      </div>
      <div class="menu-block-one main-menu">
        <el-tooltip placement="right" :disabled="!open">
          <div slot="content">Dasboard</div>
          <router-link
            class="menu-one"
            :to="'/dashboard/'"
          >
            <div class="menu-icons" v-html="$root.icons.blocks"></div>
            <span>Dasboard</span>
          </router-link>
        </el-tooltip>

        <el-tooltip placement="right" :disabled="!open">
          <div slot="content">Workers</div>
          <router-link
            class="menu-one"
            :to="'/workers/'"
          >
            <div class="menu-icons" v-html="$root.icons.users"></div>
            <span>Workers</span>
          </router-link>
        </el-tooltip>

        <el-popover
          placement="right"
          width="220"
          trigger="hover"
          popper-class="popover-submenu"
        >
          <div class="menu-block-one">
            <div class="menu-title">
              <h3>Tools</h3>
            </div>
            <router-link
              class="menu-one"
              :to="'/tools/stickers/'"
            >
              <span>Label Generator</span>
            </router-link>
          </div>
          <div slot="reference">
            <router-link
              class="menu-one menu-one__subclass"
              :to="'/tools/'"
              :disabled="true"
            >
              <div class="menu-icons" v-html="$root.icons.tools"></div>
              <span>Tools</span>

              <div
                class="menu-icons menu-icon-right menu-icon-right__more"
                v-html="$root.icons.more"
              ></div>
            </router-link>
          </div>
        </el-popover>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Menu",
  data: () => {
    return {
      open: false,
    };
  },
  mounted() {
    this.open = localStorage.getItem("menu")
      ? localStorage.getItem("menu") == "false"
        ? false
        : true
      : false;
    this.$watch("open", (value) => {
      localStorage.setItem("menu", value);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
#app {
  .menu-block {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    flex-shrink: 0;
    width: 100%;
    height: 100vh;
    max-width: 66px;
    background: #fff;
    box-shadow: 6px 0 18px rgba(0, 0, 0, 0.06);
    position: relative;
    z-index: 5;
    overflow: hidden;
    transition: 0.25s;
  }
  .menu-block.menu-open {
    max-width: 280px;
  }
  h1 {
    margin: 0;
    font-weight: 500;
    font-size: 32px;
  }
  .add-icon {
    height: 18px;
    width: 18px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;

    svg {
      height: 100%;
      width: 100%;
      stroke: #fff;
    }
  }
  .logo-block {
    min-height: 72px;
    max-height: 72px;
    height: 100px;
    width: 100%;
    padding: 0 24px 0 17px;
    border-bottom: 1px solid #ebeff2;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: stretch;
  }
  .menu-icon {
    height: 32px;
    width: 32px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
    transition: 0.25s;
    border-radius: 3px;
    cursor: pointer;
    flex-shrink: 0;
  }
  .menu-one.router-link-exact-active.router-link-active, .menu-one.current {
    background-color: #f5f5f5;
    color: #0368fa;
}
  .logo {
    font-weight: 500;
    font-size: 19px;
    background-position: center left;
    background-size: 23px;
    background-repeat: no-repeat;
    max-width: 0;
    padding: 0;
    margin: 0;
    overflow: hidden;
    transition: 0.25s;
    flex-grow: 1;
    text-align: right;
  }
  .menu-block.menu-open .logo {
    max-width: 300px;
    padding-left: 35px;
    margin-left: auto;
  }
  .menu-block-one {
    padding: 9px;
    /* border-bottom: 1px solid #ebeff2; */
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
  }
  .menu-block-one.main-menu {
    overflow: scroll;
    min-height: calc(100vh - 250px);
  }
  .menu-block-one {
    padding: 9px;
    /* border-bottom: 1px solid #ebeff2; */
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
}

.menu-one {
    width: 100%;
    height: 42px;
    min-height: 42px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: stretch;
    font-weight: 500;
    font-size: 14px;
    padding: 0 14px;
    cursor: pointer;
    transition: .25s;
    border-radius: 4px;
}

.menu-icons svg {
    stroke: #344d6d;
    height: 18px;
    width: 18px;
    transition: .25s;
}

.menu-icons {
    transition: .35s;
    margin-right: 8px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
    width: 18px;
}

a.menu-one:hover {
    background-color: #f5f5f5;
    color: #0368fa;
}
.menu-block.menu-open a.menu-one.menu-one__subclass .menu-icons.menu-icon-right__more, .menu-block.menu-open a.menu-one .menu-icons.menu-icon-right {
    margin-right: 0;
    left: 0;
}
.menu-one.router-link-exact-active.router-link-active, .menu-one.current {
    background-color: #f5f5f5;
    color: #0368fa;
}

.menu-block.menu-open a.menu-one .menu-icons {
    margin-right: 15px;
}
.menu-icons.menu-icon-right {
    margin-left: auto;
    margin-right: 0;
}
a.menu-one.menu-one__subclass.router-link-active {
    background-color: #f5f5f5;
    color: #0368fa;
    svg{
      stroke: #0368fa;
    }
}
a.menu-one:hover{
    background-color: #f5f5f5;
    color: #0368fa;
}
}
.menu-block-one {
    padding: 9px;
    /* border-bottom: 1px solid #ebeff2; */
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
}
.menu-title {
    padding: 8px 12px;
}
.menu-title h3 {
    font-size: 13px;
    font-weight: 400;
    color: #b0b1b1;
    margin:0;
}
.menu-one {
    width: 100%;
    height: 42px;
    min-height: 42px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: stretch;
    font-weight: 500;
    font-size: 14px;
    padding: 0 14px;
    cursor: pointer;
    transition: .25s;
    border-radius: 4px;
}
.el-popover .menu-one {
    padding: 9px 12px;
    border-radius: 4px;
    min-height: 36px;
    height: auto;
    font-size: 13px;
    justify-content: flex-start;
    align-items: flex-start;
    display: flex;
    white-space: nowrap;
}

.el-popover .menu-one span {
    max-width: 300px;
}
.el-popover .menu-one .menu-icons {
    margin-right: 12px;
}
.el-popover.popover-submenu {
    padding: 0;
}
.el-popover .menu-one span {
    max-width: 300px;
}
.menu-one span {
    max-width: 0;
    transition: .25s;
}
.menu-icon:hover {
    background-color: #f5f5f5;
}
.menu-icon svg {
    stroke: #3a4a58;
    width: 20px;
    height: 20px;
}
.menu-one span {
    max-width: 0;
    transition: .25s;
    overflow: hidden;
}
.menu-block.menu-open span {
    max-width: 300px;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}
a.menu-one.menu-one__subclass .menu-icons.menu-icon-right.menu-icon-right__more {
    opacity: 1;
    position: relative;
    margin-left: auto;
    margin-right: 0;
    left: -8px;
}
</style>
