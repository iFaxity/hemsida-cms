/* Lazy load the routes */
const Dashboard = () => import('./components/Dashboard.vue');
const EditFields = () => import('./components/EditFields.vue');
const EditPage = () => import('./components/EditPage.vue');
const Layout = () => import('./components/Layout.vue');
const Login = () => import('./components/Login.vue');
const Pages = () => import('./components/Pages.vue');
const NotFound = () => import('./components/NotFound.vue');

import { Auth } from './lib/auth';

export default [
  {
    path: '/login', component: Login,
    meta: { title: 'Logga in' },
    beforeEnter(to, from, next) {
      if (Auth.isLoggedIn) {
        const { redirect } = to.query;
        const path = redirect || (from.path || '/');
        next(path);
      }
      next();
    }
  },
  {
    path: '/logout',
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      Auth.logout();
      next('/login');
    }
  },
  {
    path: '/', component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '', component: Dashboard,
        meta: { title: 'Dashboard' }
      },
      {
        path: 'pages', component: Pages,
        meta: { title: 'Pages' }
      },
      {
        path: 'edit/page/:page', component: EditPage,
        meta: { title: 'Edit Page' }
      },
      {
        path: 'edit/fields/:page', component: EditFields,
        meta: { title: 'Edit Fields' }
      },
      { path: '*', component: NotFound },
    ]
  },
  { path: '/*', component: NotFound },
];
