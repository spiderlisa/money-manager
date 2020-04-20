import Vue from "vue";
import VueRouter from "vue-router";
import MainArea from "@/components/MainArea.vue";
import Journal from "@/components/pages/Journal.vue";
import Login from "@/components/pages/Login.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
    component: MainArea,
    children: [
      {
        path: "/login",
        component: Login,
        title: "Login"
      },
      {
        path: "/home",
        component: Journal,
        title: "Home"
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

let entryUrl: string | null = null;
router.beforeEach((to, from, next) => {
  // add title
  document.title = "Money Manager | " + to.meta.title;

  store
    .dispatch("checkAuth")
    .then((isAuthed: boolean) => {
      // going to normal page
      if (to.path !== "/login") {
        // authed
        if (isAuthed) {
          if (entryUrl) {
            const url = entryUrl;
            entryUrl = null;
            return next(url);
          } else {
            return next();
          }
        }
        // not authed
        else {
          return next("/login");
        }
      }
      // going to login page
      else {
        // authed
        if (isAuthed) {
          if (entryUrl) {
            const url = entryUrl;
            entryUrl = null;
            return next(url);
          } else {
            return next("/home");
          }
        }
        // not authed
        else {
          return next();
        }
      }
    })
    .catch(err => {
      //console.error(err)
    });
});

export default router;
