import axios from "axios";
import store from "../store/index";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
import Login from "../views/Login.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    meta: { forAll: true },
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/login",
    component: Login,
    meta: { forAll: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((v) => v.meta.forAll)) return next();

  axios
    .post("/api/auth/refresh")
    .then((result) => {
      if (result.data.role != "admin") {
        store.commit("logout");
        return next();
      }
      store.commit("login", result.data);
      return next();
    })
    .catch(() => {
      console.log("라우팅실패");
    });
});

export default router;
