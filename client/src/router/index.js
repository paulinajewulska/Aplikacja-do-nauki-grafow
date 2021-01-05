import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/Home")
  },
  {
    path: "/:category",
    component: () => import("@/views/Category")
  },
  // TODO: add 404 page
  {
    path: "/:category/:lesson",
    component: () => import("@/views/Lesson")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
