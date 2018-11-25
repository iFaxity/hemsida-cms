import { Auth } from './auth';

export const API = {
  root: '',
  init(root = '') {
    this.root = root;
  },

  put(path, body) {
    return Auth.request(this.root + path, { method: 'put', body }, true);
  },
  get(path, body) {
    return Auth.request(this.root + path, { body }, true);
  },
  post(path, body) {
    return Auth.request(this.root + path, { method: 'post', body }, true);
  },
  delete(path, body) {
    return Auth.request(this.root + path, { method: 'delete', body }, true);
  },
};

export default {
  installed: false,
  install(Vue, root = '') {
    if (this.installed) return;
    this.installed = true;
    API.init(root);
    
    Object.defineProperty(Vue.prototype, '$api', { value: API });
  }
}
