import { Auth } from './auth';

function param(params) {
  if(!params || !(typeof params == 'object' || Array.isArray(params))){
    throw new TypeError('Parameter \'params\' is not an object or an array');
  }

  return Object.entries(params)
  .filter(item => item[1] !== undefined)
  .map(item => `${item[0]}=${encodeURIComponent(item[1])}`)
  .join('&');
}

export const API = {
  root: '',
  init(root = '') {
    this.root = root;
  },
  
  async request(path, { method, body } = {}) {
    // Add token to api request
    if(!Auth.isLoggedIn) await Auth.renewToken();
    body = body || {};
    method = method ? method.toLowerCase() : 'get';
    const headers = new Headers({
      'Accept': 'application/json'
    });
    
    // Parse the body
    body.token = Auth.token;
    if (method === 'post' || method == 'put') {
      if (typeof body === 'object' || Array.isArray(body)) {
        headers.append('Content-Type', 'application/json');
        body = JSON.stringify(body);
      }
    } else if (body) {
      path += '?' + param(body);
      body = undefined;
    }
    
    // Finally do the request
    const res = await fetch(this.root + path, { method, headers, body });
    const json = await res.json();
    if (!res.ok) {
      const message = json.message || `${res.status} ${res.statusText}`;
      throw new Error(message);
    }
    return json;
  },

  put(path, body) {
    return this.request(path, { method: 'put', body });
  },
  get(path, body) {
    return this.request(path, { body });
  },
  post(path, body) {
    return this.request(path, { method: 'post', body });
  },
  delete(path, body) {
    return this.request(path, { method: 'delete', body });
  },
};


export default {
  installed: false,
  install(Vue, root = '') {
    if (this.installed) return;
    this.installed = true;
    API.init(root);
    
    Object.defineProperty(Vue.prototype, '$api', {
      writable: false,
      value: API.request,
    });
  }
}
