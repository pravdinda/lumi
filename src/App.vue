<template>
  <div id="app">
    <Menu />
    <section class="Main-section">
      <Header />
      <div class="wrap">
        <div class="content">
          <div class="page" v-if="ready">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </section>
    <div class="loader" v-if="!ready">
      <el-progress type="circle" :percentage="progres"></el-progress>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import Menu from "./components/bl-menu.vue";
import Header from "./components/bl-header.vue";
// import _ from "lodash";

export default {
  name: "App",
  components: {
    Menu,
    Header,
  },
  data: function () {
    return {
      user: {
        id: 10,
      },
      ready: false,
      add: false,
      stickers: [],
      print: false,
      progres: 0,
      sizes: [
        {
          id: 0,
          label: "30x20",
        },
        {
          id: 1,
          label: "50x70",
        },
      ],
    };
  },
  methods: {
    generator() {
      var length = 6;
      var string = "abcdefghijklmnopqrstuvwxyz"; //to upper
      var password = "";
      var character = "";
      while (password.length < length) {
        let entity1 = Math.ceil(string.length * Math.random() * Math.random());
        let hold = string.charAt(entity1);
        hold = password.length % 2 == 0 ? hold.toUpperCase() : hold;
        character += hold;
        password = character;
      }
      password = password
        .split("")
        .sort(function () {
          return 0.5 - Math.random();
        })
        .join("");
      return password.substr(0, length);
    },
  },
  mounted() {
    this.$root.app = this;
    this.ready = true;

    this.stickers = [
      {
        id: "NtCJgd",
        name: "label-one",
        user_id: 12,
        created_at:
          "2020-10-11",
        base64: '',
        size: 0,
        elems: [
          {
            id: 19,
            content: "<p>h</p>",
            base64:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABaCAYAAAAW7WCQAAACkElEQVR4Xu3YPWtTYRjG8fs5iZrBDro7+LpqG2nX6tiXuKjgVFycTMVv0G+gPQXn6hpw8CS4xqmCSXAQRYROzoJUqEibW+wLlBAl55LTPsq/Y3qu0/P88h+SBuNHEgjSipEBJ0YAHHCigDijOOBEAXFGccCJAuKM4oATBcQZxQEnCogzigNOFBBnFAecKCDOKA44UUCcURxwooA4ozjgRAFxRnHAiQLijOKAEwXEGcUBJwqIM4oDThQQZxQHnCggzijuX4S7WquPu4dXv57d3Vq9ZnpHPMehz460uOqNB1PW99c7cBZe9rLlmUMXEP8gcMCJAuKM4v4nuCtzixdLiV9yS06V3D6WK8m7tcajTfGMhcyiKu7YVv/eVtmemoXrQ07bOF4pLcQCGA2cma3vYZ37fSKhNbbx9Wa7vfq9kIxy3DQmuIOP/cRDWAt9P2nBbx0sMHhY6DSXn+U4YyGXxga34f1kqtd6/GH/tNPTS+VvY1+eu9n83muNbpbeLkQjx02jgnPzu71sZXXw+au1+qx5aO5+ULY3vSydzHHGQi6NCm6zcvrE+8bSj8GTjs/VLychvN17fb2bpecL0chx03jggn3uvkjPDHv2idrDC8G3P+387g/X5Tj3X18aD5x5u5utXANuhPd01C/5FDeACdwIdQ27BDjgRAFxRnHAiQLijOJEuInZxWpIrLP7udayTpbWht1qcv7+2W1L9v97wjcH0TuK2ZF+c4hCQHwI4IATBcQZxQEnCogzigNOFBBnFAecKCDOKA44UUCcURxwooA4ozjgRAFxRnHAiQLijOKAEwXEGcUBJwqIM4oDThQQZxQHnCggzigOOFFAnFEccKKAOKM44EQBcUZxwIkC4uwnix4hami9HxEAAAAASUVORK5CYII=",
            x: 256.25539568345323,
            y: 80.99056603773586,
            height: 45,
            width: 38,
            transform: ''
          },
          {
            id: 20,
            content: "<p>hello</p>",
            base64:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABaCAYAAAAW7WCQAAACkElEQVR4Xu3YPWtTYRjG8fs5iZrBDro7+LpqG2nX6tiXuKjgVFycTMVv0G+gPQXn6hpw8CS4xqmCSXAQRYROzoJUqEibW+wLlBAl55LTPsq/Y3qu0/P88h+SBuNHEgjSipEBJ0YAHHCigDijOOBEAXFGccCJAuKM4oATBcQZxQEnCogzigNOFBBnFAecKCDOKA44UUCcURxwooA4ozjgRAFxRnHAiQLijOKAEwXEGcUBJwqIM4oDThQQZxQHnCggzijuX4S7WquPu4dXv57d3Vq9ZnpHPMehz460uOqNB1PW99c7cBZe9rLlmUMXEP8gcMCJAuKM4v4nuCtzixdLiV9yS06V3D6WK8m7tcajTfGMhcyiKu7YVv/eVtmemoXrQ07bOF4pLcQCGA2cma3vYZ37fSKhNbbx9Wa7vfq9kIxy3DQmuIOP/cRDWAt9P2nBbx0sMHhY6DSXn+U4YyGXxga34f1kqtd6/GH/tNPTS+VvY1+eu9n83muNbpbeLkQjx02jgnPzu71sZXXw+au1+qx5aO5+ULY3vSydzHHGQi6NCm6zcvrE+8bSj8GTjs/VLychvN17fb2bpecL0chx03jggn3uvkjPDHv2idrDC8G3P+387g/X5Tj3X18aD5x5u5utXANuhPd01C/5FDeACdwIdQ27BDjgRAFxRnHAiQLijOJEuInZxWpIrLP7udayTpbWht1qcv7+2W1L9v97wjcH0TuK2ZF+c4hCQHwI4IATBcQZxQEnCogzigNOFBBnFAecKCDOKA44UUCcURxwooA4ozjgRAFxRnHAiQLijOKAEwXEGcUBJwqIM4oDThQQZxQHnCggzigOOFFAnFEccKKAOKM44EQBcUZxwIkC4uwnix4hami9HxEAAAAASUVORK5CYII=",
            x: 156.25539568345323,
            y: 100.99056603773586,
            height: 45,
            width: 38,
            transform: 'matrix(1,0,0,1,128,30) translate(101px, -1px)'
          },
        ],
      },
      {
        id: "DbDlfV",
        elems: [
          {
            id: 19,
            content: "<p>h</p>",
            base64:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABaCAYAAAAW7WCQAAACkElEQVR4Xu3YPWtTYRjG8fs5iZrBDro7+LpqG2nX6tiXuKjgVFycTMVv0G+gPQXn6hpw8CS4xqmCSXAQRYROzoJUqEibW+wLlBAl55LTPsq/Y3qu0/P88h+SBuNHEgjSipEBJ0YAHHCigDijOOBEAXFGccCJAuKM4oATBcQZxQEnCogzigNOFBBnFAecKCDOKA44UUCcURxwooA4ozjgRAFxRnHAiQLijOKAEwXEGcUBJwqIM4oDThQQZxQHnCggzijuX4S7WquPu4dXv57d3Vq9ZnpHPMehz460uOqNB1PW99c7cBZe9rLlmUMXEP8gcMCJAuKM4v4nuCtzixdLiV9yS06V3D6WK8m7tcajTfGMhcyiKu7YVv/eVtmemoXrQ07bOF4pLcQCGA2cma3vYZ37fSKhNbbx9Wa7vfq9kIxy3DQmuIOP/cRDWAt9P2nBbx0sMHhY6DSXn+U4YyGXxga34f1kqtd6/GH/tNPTS+VvY1+eu9n83muNbpbeLkQjx02jgnPzu71sZXXw+au1+qx5aO5+ULY3vSydzHHGQi6NCm6zcvrE+8bSj8GTjs/VLychvN17fb2bpecL0chx03jggn3uvkjPDHv2idrDC8G3P+387g/X5Tj3X18aD5x5u5utXANuhPd01C/5FDeACdwIdQ27BDjgRAFxRnHAiQLijOJEuInZxWpIrLP7udayTpbWht1qcv7+2W1L9v97wjcH0TuK2ZF+c4hCQHwI4IATBcQZxQEnCogzigNOFBBnFAecKCDOKA44UUCcURxwooA4ozjgRAFxRnHAiQLijOKAEwXEGcUBJwqIM4oDThQQZxQHnCggzigOOFFAnFEccKKAOKM44EQBcUZxwIkC4uwnix4hami9HxEAAAAASUVORK5CYII=",
            x: 56.25539568345323,
            y: 80.99056603773586,
            height: 45,
            width: 38,
            transform: ''
          },
          {
            id: 20,
            content: "<p>Hello</p>",
            base64:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABaCAYAAAAW7WCQAAACkElEQVR4Xu3YPWtTYRjG8fs5iZrBDro7+LpqG2nX6tiXuKjgVFycTMVv0G+gPQXn6hpw8CS4xqmCSXAQRYROzoJUqEibW+wLlBAl55LTPsq/Y3qu0/P88h+SBuNHEgjSipEBJ0YAHHCigDijOOBEAXFGccCJAuKM4oATBcQZxQEnCogzigNOFBBnFAecKCDOKA44UUCcURxwooA4ozjgRAFxRnHAiQLijOKAEwXEGcUBJwqIM4oDThQQZxQHnCggzijuX4S7WquPu4dXv57d3Vq9ZnpHPMehz460uOqNB1PW99c7cBZe9rLlmUMXEP8gcMCJAuKM4v4nuCtzixdLiV9yS06V3D6WK8m7tcajTfGMhcyiKu7YVv/eVtmemoXrQ07bOF4pLcQCGA2cma3vYZ37fSKhNbbx9Wa7vfq9kIxy3DQmuIOP/cRDWAt9P2nBbx0sMHhY6DSXn+U4YyGXxga34f1kqtd6/GH/tNPTS+VvY1+eu9n83muNbpbeLkQjx02jgnPzu71sZXXw+au1+qx5aO5+ULY3vSydzHHGQi6NCm6zcvrE+8bSj8GTjs/VLychvN17fb2bpecL0chx03jggn3uvkjPDHv2idrDC8G3P+387g/X5Tj3X18aD5x5u5utXANuhPd01C/5FDeACdwIdQ27BDjgRAFxRnHAiQLijOJEuInZxWpIrLP7udayTpbWht1qcv7+2W1L9v97wjcH0TuK2ZF+c4hCQHwI4IATBcQZxQEnCogzigNOFBBnFAecKCDOKA44UUCcURxwooA4ozjgRAFxRnHAiQLijOKAEwXEGcUBJwqIM4oDThQQZxQHnCggzigOOFFAnFEccKKAOKM44EQBcUZxwIkC4uwnix4hami9HxEAAAAASUVORK5CYII=",
            x: 96.25539568345323,
            y: 100.99056603773586,
            height: 45,
            width: 38,
            transform: 'matrix(1,0,0,1,128,30) translate(101px, -1px)'
          },
        ],
        name: "label-two",
        user_id: 18,
        created_at:
          "2020-10-11",
        size: 1,
      },
      {
        id: "iEcPjG",
        name: "label-three",
        elems: [{
            id: 19,
            content: "",
            base64: "",
            x: 0,
            y: 0,
            height: 0,
            width: 0,
            transform: ''
          }],
        user_id: 10,
        created_at:
          "2020-10-11",
        size: 0,
      },
      {
        id: "EeDjCe",
        name: "label-four",
        elems: [{
            id: 19,
            content: "",
            base64: "",
            x: 0,
            y: 0,
            height: 0,
            width: 0,
            transform: ''
          }],
        user_id: 13,
        created_at:
          "2020-10-11",
        size: 0,
      },
      {
        id: "gbHCCm",
        name: "label-five",
        elems: [{
            id: 19,
            content: "",
            base64: "",
            x: 0,
            y: 0,
            height: 0,
            width: 0,
            transform: ''
          }],
        user_id: 10,
        created_at:
          "2020-10-11",
        size: 1,
      },
    ];
    // this.int = setInterval(() => {
    //   this.progres += 1;

    //   if (this.progres == 100) {
    //     clearInterval(this.int);
    //     this.ready = true;
    //   }
    // }, 5);
  },
};
</script>

<style lang="scss">
.btn-modal {
  margin-top: 24px;
}
.page {
  /* background-color: #FFF; */
  padding: 48px 0 32px;
  display: flex;
  flex-grow: 1;

  &.page-transparent {
    box-shadow: none;
    background-color: transparent;
  }
}
.page-block {
  width: 100%;
}
.page-inner {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 980px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
}
.el-select-dropdown.inn-select li.el-select-dropdown__item {
  min-height: 46px;
  padding: 11px 12px;
}

.compyny-seelct__info {
  font-size: 11px;
  color: #99a6b7;
  line-height: 7px;
}
.page-main {
  padding: 18px 24px;

  h1 {
    color: #14253f;
    line-height: 40px;
    margin: 0;
    font-weight: 700;
    font-size: 22px;
    display: flex;
    align-items: center;
  }
}
.company-select.company-selected {
  background-color: #f4f8ff;
  padding: 18px;
  border-radius: 4px;
  position: relative;
}
.company-select.company-selected a.close-button {
  height: 32px;
  width: 32px;
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  cursor: pointer;
}

a.close-button .close-icon {
  height: 24px;
  width: 24px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
}

a.close-button:hover svg {
  stroke: #0368fa;
}
.compyny-seelct__name {
  font-weight: 500;
  margin-bottom: 7px;
  line-height: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 270px;
  height: 1.2em;
  white-space: nowrap;
}

.company-select.company-selected .compyny-seelct__name {
  color: #0059fc;
}
.data-block {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: stretch;
}

.content-block {
  width: 100%;
}
.el-drawer.rtl.log-activity {
  width: 360px !important;
}

.el-drawer.rtl.log-activity section.el-drawer__body {
  overflow: scroll;
}
</style>
