//TODO: add vuex to avoid globals and ugly magic in plugins (toaster for example)
import Vue from 'vue';
//import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueMDC from 'vue-mdc-web';

import Auth from './lib/auth';
import Layout from './Layout.vue';
import routes from './routes';
import Snackbar from './lib/snackbar';
import API from './lib/api';
import './styles.scss';

const Router = new VueRouter({
  base: '/',
  mode: 'history',
  routes
});

Vue.use(VueRouter);
Vue.use(VueMDC);
Vue.use(Snackbar);

// Set API fetch shorthand
Vue.use(API, '/api');
Vue.use(Auth, '/auth');

// Title plugin
Router.beforeEach((to, from, next) => {
  const match = to.matched.find(record => record.meta.title);
  if(match && match.meta && match.meta.title) {
    document.title = `CMS | ${match.meta.title}`;
  }

  next();
});
Router.beforeEach(Auth.middleware);

// Create vue instance
new Vue({
  el: '#app',
  router: Router,
  render: h => h(Layout)
});
