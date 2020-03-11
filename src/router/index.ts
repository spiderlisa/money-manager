import Vue from "vue";
import VueRouter from "vue-router";
import MainArea from "@/components/MainArea.vue";
import Journal from "@/components/pages/Journal.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "base",
    redirect: "/home",
    component: MainArea,
    children: [
      {
        path: "/home",
        name: "journal",
        component: Journal
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
