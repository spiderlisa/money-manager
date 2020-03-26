import Vue from "vue";
import VueRouter from "vue-router";
import MainArea from "@/components/MainArea.vue";
import Journal from "@/components/pages/Journal.vue";
import Login from "@/components/pages/Login.vue";
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
    component: MainArea,
    children: [
      {
        path: "/login",
        component: Login
      },
      {
        path: "/home",
        component: Journal
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

let entryUrl: string | null = null;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.getters['token']) {
      if (entryUrl) {
        const url = entryUrl;
        entryUrl = null;
        return next(url);
      } else {
        return next();
      }
    } else {
      entryUrl = to.path;
      next('/login');
    }
  } else {
    if (store.getters['token']) {
      next('/');
    } else {
      next();
    }
  }
});

export default router;
