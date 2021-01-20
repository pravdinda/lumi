

import Vue from "vue";
import App from "./App";

import icons from "./icons";
import router from "./router";

import ElementUI from "element-ui";
// import lang from "element-ui/lib/locale/lang/ru-RU";
// import locale from "element-ui/lib/locale";
import "./assets/css/theme.css";

import "./assets/css/normalize.scss";

import "./assets/css/main.scss";

const moment = require('moment')
//require('moment/locale/ru')

Vue.use(require('vue-moment'), {
    moment
})

import VueMask from "v-mask";
Vue.use(VueMask);

import accounting from "accounting";

import VueKonva from 'vue-konva'
Vue.use(VueKonva)

Vue.filter("money", (value) => {
  return accounting.formatMoney(parseFloat(value), {
    symbol: "₽",
    format: "%v %s",
    decimal: ".",
    thousand: " ",
    precision: 2
  });
});

//locale.use(lang);
Vue.use(ElementUI);
/* eslint-disable no-new */


export const vm = new Vue({
  router,
  el: "#app",
  components: { App },
  data: {
    icons,
    app: ""
  },
  render: (h) => h(App)
});
