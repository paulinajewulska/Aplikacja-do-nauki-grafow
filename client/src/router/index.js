import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/:category",
    component: () => import("@/views/Category")
  }
  // TODO: add 404 page
  // {
  //   path: "/:category/:lesson",
  //   component: () => import("@/views/Lesson.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
