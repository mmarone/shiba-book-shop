import Vue from "vue";
import VueRouter from "vue-router";
import Shop from "../views/Shop.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Shop",
    component: Shop
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
