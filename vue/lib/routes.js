/* Lazy load the routes */
const Dashboard = () => import('../components/Dashboard.vue');
const EditFields = () => import('../components/EditFields.vue');
const EditPage = () => import('../components/EditPage.vue');
const Layout = () => import('../components/Layout.vue');
const Login = () => import('../components/Login.vue');
const Pages = () => import('../components/Pages.vue');

import { Auth } from './auth';

export default [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: Login,
    meta: {
      title: 'Logga in'
    },
    beforeEnter(to, from, next) {
      if (Auth.isLoggedIn) {
        const { redirect } = to.query;
        const path = redirect || (from.path == '/' ? '/dashboard' : from.path);
        next(path);
      }
    }
  },
  {
    path: '/logout',
    beforeEnter(to, from, next) {
      Auth.logout();
      next('/login');
    }
  },
  {
    path: '/dashboard',
    component: Layout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        component: Dashboard,
        meta: {
          title: 'Dashboard',
        }
      },
      {
        path: '/pages',
        component: Pages,
        meta: {
          title: 'Pages',
        }
      },
      {
        path: '/edit/page/:page',
        component: EditPage,
        meta: {
          title: 'Edit Page'
        }
      },
      {
        path: '/edit/fields/:field',
        component: EditFields,
        meta: {
          title: 'Edit Fields'
        }
      }
    ]
  }
];
