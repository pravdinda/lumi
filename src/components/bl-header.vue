<template>
  <div class="header">
    <div class="header-pagi">
      <router-link class="pagi-one" :to="{ path: '/' }">
        <div class="page-icon" v-html="$root.icons.home"></div>
      </router-link>
      <div class="page-divider" v-html="$root.icons.arrow_right"></div>
      <router-link class="pagi-one" :to="{ path: '/tools/' }">
        Tools
      </router-link>
      <div class="page-divider" v-html="$root.icons.arrow_right"></div>

      <router-link class="pagi-one page-one__current" :to="{ path: '/tools/stickers' }" :disabled="$route.name != 'sticker'">
        {{ $route.meta.title }}
      </router-link>

      <div class="page-divider" v-html="$root.icons.arrow_right" v-if="$route.name == 'sticker'"></div>
      <a class="pagi-one" v-if="$route.name == 'sticker'">
        {{ $root.app.stickers.find( x => x.id == $route.params.sid ).name }}
      </a>
    </div>

    <div class="header-menu-one__right">
      <el-dropdown>
        <div class="user-block">
          <div class="user-icon" v-html="$root.icons.user"></div>
          <div class="user-info">
            <div class="user-name">Dmitriy Pravdin</div>
            <div class="user-email">Senior engineer</div>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link :to="'/app/account'">
              <span>Настройки профиля</span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <a>
              <span>Выход</span>
            </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.header {
  height: 72px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  padding: 0 48px;

  .user-block {
    margin-left: auto;
    font-size: 14px;
    height: 28px;
    border-radius: 3px;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
    padding: 0 14px;
  }

  .header-menu {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: stretch;
    padding: 0 0px 0 48px;
  }

  .header-menu-one__right {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: stretch;
  }

  a.header-menu-one:hover {
    color: #0368fa;
  }
  .user-icon {
    height: 32px;
    width: 32px;
    margin-right: 12px;
    background-color: #ccd2de;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
  }
  .user-name {
    color: #2a3f58;
  }
  .user-icon svg {
    width: 16px;
    stroke: #fff;
    stroke-width: 2px;
  }
  .user-block {
    cursor: pointer;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
  }

  .user-email {
    font-weight: 400;
    font-size: 12px;
  }
  .page-icon {
    height: 22px;
    width: 22px;
    background-color: #334d6e;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
  }

  .page-icon svg {
    width: 14px;
    stroke: #FFF;
  }
  .header-pagi {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: stretch;
  }

  .page-divider {
    margin: 0 12px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
    width: 14px;
  }

  .page-divider svg {
    height: 9px;
    stroke: #ccd2de;
  }

  a.pagi-one {
    font-size:15px;
    &.page-one__current {
      font-size: 17px;
      font-weight: 500;
    }
  }
}
</style>
