import Vue from "vue";
import VueRouter from "vue-router";
import MainArea from "@/components/MainArea.vue";
import Login from "@/components/pages/Login.vue";
import MainView from "@/components/pages/MainView.vue";
import Journal from "@/components/pages/Journal.vue";
import UserProfile from "@/components/pages/UserProfile.vue";
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
        name: "Login"
      },
      {
        path: "/",
        component: MainView,
        children: [
          {
            path: "/home",
            component: Journal,
            name: "Home"
          },
          {
            path: "/profile",
            component: UserProfile,
            name: "Profile"
          }
        ]
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
  document.title = "Money Manager - " + to.name;

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
