import Dashboard from "../components/Dashboard.vue";
import Login from "../Login.vue";
import Editor from "../components/Editor.vue";
import DashboardLayout from "../components/Layout.vue";
import { Auth } from "./auth";

export default [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "Logga in"
    },
    beforeEnter(to, from, next) {
      let path;

      if (Auth.isLoggedIn) {
        const { redirect } = to.query;

        path = redirect || (from.path || from.path === "/" ? "/dashboard" : from.path);
      }
      next(path);
    }
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "/",
        component: Dashboard,
        meta: {
          title: "Dashboard",
        }
      },
      {
        path: "edit/:page*",
        component: Editor,
        meta: {
          title: "Editor"
        }
      }
    ]
  }
];