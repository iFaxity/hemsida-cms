// Formats a js object to a query string
function param(params) {
  if(!params || !(typeof params == 'object' || Array.isArray(params))){
    throw new TypeError('Parameter \'params\' is not an object or an array');
  }

  return Object.entries(params)
  .filter(item => item[1] !== undefined)
  .map(item => `${item[0]}=${encodeURIComponent(item[1])}`)
  .join('&');
}
// Helper function for request method
function createRequestObject(path, { method, body } = {}) {
  const opts = {
    method: method || 'get',
    headers: new Headers(),
  };

  // Parse the body
  if (typeof body == 'object') {
    if (body instanceof FormData) {
      opts.body = body;
    } else if (opts.method != 'post' && opts.method != 'put') {
      path += '?' + param(body);
    } else if (typeof body == 'object' || Array.isArray(body)) {
      opts.body = JSON.stringify(body);
      opts.headers.append('content-type', 'application/json');
    }
  }

  return { url: path, opts };
}
// Decodes a base64 string with utf-8 encoding
function base64Decode(str) {
  const arr = atob(str).split('');

  return decodeURIComponent(arr.map(c => {
    const base = c.charCodeAt(0).toString(16);
    return '%' + ('00' + base).slice(-2);
  }).join(''));
}

export const Auth = {
  path: '/cms/auth',
  token: null,
  payload: null,
  hasRole() {
    return true;
  },

  /**
   * Sends a fetch request
   * @param {String} path -
   * @param {Object} options -
   */
  async request(path, options, auth = true) {
    const { url, opts } = createRequestObject(path, options);
    if (auth) {
      opts.headers.append('Authorization', `Bearer ${Auth.token}`);
    }
    
    // Get response
    const res = await fetch(url, opts);

    const type = res.headers.get('content-type');
    const isJSON = type.includes('application/json');
    const body = await (isJSON ? res.json() : res.text());

    // Check i request was OK 2xx
    if (!res.ok) {
      const msg = isJSON ? body.message : body;
      throw new Error(msg || 'Generellt autensiterings fel');
    }

    // Was token renewed?
    if (isJSON && body.token) {
      const base64 = base64Decode(body.token.split('.')[1]);

      this.token = body.token;
      this.payload = JSON.parse(base64);
    }

    return isJSON ? body.data : body;
  },

  /**
   * Changes the users password
   * @param {String} newPassword 
   */
  changePassword(newPassword) {
    // Changing the password also renews the token
    const body = { newPassword };
    return this.request(`${this.path}/changePassword`, { method: 'post', body });
  },

  /**
   * Logins the user and sets the session
   * @param {String} username 
   * @param {String} password 
   */
  async login(username, password) {
    // Set access token
    const body = { username, password };
    await this.request(`${this.path}/login`, { method: 'post', body }, false);
  },

  /**
   * Destroys the token
   */
  logout() {
    this.token = null;
    this.payload = null;
  },
};

export default {
  // Vue plugin
  installed: false,
  install(Vue, path = '/cms/auth') {
    if (this.installed) return;
    this.installed = true
    Auth.path = path;
  
    // Define auth object to vue prototype
    Object.defineProperty(Vue.prototype, '$auth', { value: Auth });
  },

  // Vue Router authentication middleware
  middleware(to, from, next) {
    const match = to.matched.find(record => record.meta.auth);
    if(!match) {
      return next();
    }

    if(match.meta.auth && !Auth.token) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath != '/' ? to.fullPath : undefined,
        }
      });
    } else {
      next();
    }
  }
};
