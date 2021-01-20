<template>
  <div class="content-block">
    <div class="data-block">
        <div class="list-block">
          <div class="list-functions">
            <div class="filter-block">
              <a class="filter-one" @click="filter = ''" :class="{ 'filter__current' : filter == '' }">
                <div class="filter-icon" v-html="$root.icons.users"></div>
                <span>All</span>
              </a>
              <a class="filter-one" @click="filter = $root.app.user.id" :class="{ 'filter__current' : filter == $root.app.user.id }">
                <div class="filter-icon" v-html="$root.icons.user"></div>
                <span>My</span>
              </a>
              <div class="block-add">
                <a class="button btn-add" @click="$root.app.add = true">
                  <div class="filter-icon" v-html="$root.icons.add"></div>
                  Add
                </a>
              </div>
            </div>
          </div>
          
          <div class="stickers-list">
            <staggered-fade :duration="150" tag="div" class="stickers-list-inner">
              <bl-sticker v-for="(item, index) in stickers_filtered" :data-index="index" :key="item.id" :item="item" :current="current" />
            </staggered-fade>
          </div>

        </div>
        <bl-sticker-edit :item="current_item"></bl-sticker-edit>
    </div>
  <AddForm />
  
  </div>
</template>

<script>

import AddForm from "../layouts/AddForm.vue";
import blTitle from "../layouts/bl-title.vue";
import StaggeredFade from "../layouts/StaggeredFade.vue";

import blSticker from "./tools/stickers/bl-sticker.vue";
import blStickerEdit from "./tools/stickers/bl-sticker-edit.vue";

export default {
  name: "Stickers",
  data: () => {
    return {
      filter: '',
      current: null
    };
  },
  components: {
    'staggered-fade' : StaggeredFade,
    blTitle,
    blSticker,
    blStickerEdit,
    AddForm
  },
  computed: {
    stickers: function(){
      return this.$root.app.stickers;
    },
    stickers_filtered: function(){
      let temp = this.stickers;
      if(this.filter != '') temp = temp.filter( x => x.user_id == this.filter );
      return temp;
    },
    current_item: function(){
      return {};
    }
  }
};
</script>


<style lang="scss">

.list-block {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  width: 368px;
}

.list-functions {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
}

.filter-block {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  margin-bottom: 24px;
}

a.filter-one {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  height: 32px;
  font-size: 14px;
  cursor: pointer;
  transition: .25s cubic-bezier(.645,.045,.355,1);
  padding: 0 12px;
  border-radius: 3px;
  font-weight: 500;
  transition: .25s;
}

a.filter-one.filter__current {
  cursor: default;
  color: #0368fa;
  background-color: rgba(3,104,250, .15);
}

.filter-icon {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  margin-right: 6px;
}

.filter-icon svg {
  height: 18px;
}


a.filter-one:hover {
  color: #0368fa;
}
</style>