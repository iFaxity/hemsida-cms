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

async function request(root, path, { method, body } = {}) {
  body = body || {};
  method = method ? method.toLowerCase() : 'get';
  const headers = new Headers({
    'Accept': 'application/json'
  });

  // Add token to api request
  if(!Auth.isLoggedIn) {
    await Auth.renewToken();
  }

  body.token = Auth.token;
  if (method === 'post' || method == 'put') {
    if (typeof body === 'object' || Array.isArray(body)) {
      headers.append('Content-Type', 'application/json');
      body = JSON.stringify(body);
    }
  } else if(body) {
    const query = param(body);
    path = `${path}?${query}`;
    body = undefined; // unset body
  }

  const res = await fetch(root + path, { method, headers, body });
  const json = await res.json();
  // Only let 2xx requests be resolved
  if (!res.ok) {
    throw new Error(json.message || 'Generellt fel');
  }
  return json;
}

export default {
  installed: false,
  install(Vue, root = '') {
    if(!this.installed) {
      this.installed = true;
      
      Object.defineProperty(Vue.prototype, '$api', {
        writable: false,
        value: request.bind(this, root),
      });
    }
  }
}
