import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const useComponent = (component) => () =>
  import(`./components/pages/${component}.vue`);

export const routes = [
  {
    path: '/',
    name: 'home',
    redirect: "/tools/stickers"
  },
  {
    path: '/',
    name: 'home',
    redirect: "/tools/stickers"
  },
  {
    path: "/tools/stickers",
    name: 'stickers',
    component: useComponent("Stickers"),
    meta: {
      title: 'Label Generator'
    }
  },
  {
    path: "/tools/stickers/:sid",
    name: "sticker",
    component: useComponent("Stickers"),
    meta: {
      title: 'Label Generator',
    }
  },
];

export const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
  user: null,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});



export default router;
