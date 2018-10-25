/* Lazy load the routes */
const Dashboard = () => import('./components/Dashboard.vue');
const EditFields = () => import('./components/EditFields.vue');
const EditPage = () => import('./components/EditPage.vue');
const Layout = () => import('./components/Layout.vue');
const Login = () => import('./components/Login.vue');
const Pages = () => import('./components/Pages.vue');
const Media = () => import('./components/Media.vue');
const Settings = () => import('./components/Settings.vue');
const Accounts = () => import('./components/Accounts.vue');
import NotFound from './components/NotFound.vue';

import { Auth } from './lib/auth';

export default [
  {
    path: '/login', component: Login,
    meta: { title: 'Logga in' },
    beforeEnter(to, from, next) {
      let path;
      if (Auth.isLoggedIn) {
        path = to.query.redirect || (from.path || '/');
      }
      next(path);
    },
  },
  {
    path: '/logout',
    meta: { auth: true },
    beforeEnter(to, from, next) {
      Auth.logout();
      next('/login');
    },
  },
  {
    path: '/', component: Layout,
    children: [
      {
        path: '', component: Dashboard,
        meta: { title: 'Instrumentpanel', auth: true },
      },
      {
        path: 'pages', component: Pages,
        meta: { title: 'Sidor', auth: true },
      },
      {
        path: 'pages/:page', component: EditPage,
        meta: { title: 'Redigera sida', auth: 'pages' },
      },
      {
        path: 'pages/:page/fields', component: EditFields,
        meta: { title: 'Redigera fält', auth: 'pages' },
      },
      {
        path: 'media', component: Media,
        meta: { title: 'Media', auth: 'media' },
      },
      {
        path: 'settings', component: Settings,
        meta: { title: 'Inställningar', auth: 'settings' },
      },
      {
        path: 'accounts', component: Accounts,
        meta: { title: 'Konton', auth: 'accounts' },
      },
      { path: '*', component: NotFound },
    ]
  },
  { path: '/*', component: NotFound },
];
