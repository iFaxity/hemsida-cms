import Storage from './storage';

const TOKEN_KEY = 'auth_token';
const PAYLOAD_KEY = 'auth_payload';
const EXPIRES_KEY = 'auth_expires';

/**
 * Simplified fetch wrapper
 * @param {String} path 
 * @param {Object} body 
 */
async function request(path, body) {
  if(!body) {
    throw new Error('Auth requester needs a body!');
  }

  const res = await fetch(path, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  });

  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.message || 'Generellt autensiterigs fel!');
  }

  return res.json();
}

export const Auth = {
  path: '/cms/auth',
  get token() {
    return Storage.get(TOKEN_KEY);
  },
  get expires() {
    return Storage.get(EXPIRES_KEY);
  },
  get payload() {
    return Storage.get(PAYLOAD_KEY, true);
  },
  get isLoggedIn() {
    const { token, expires } = this;
    // Check if token is still valid
    return !!token && expires >= Date.now();
  },

  /**
   * 
   * @param {*} role - Role key.access string
   */
  hasRole(role) {
    const [ roleKey, roleAccess ] = role.split('.');
    if(!this.isLoggedIn) return false;
  
    // Check if we have access to the 
    return this.payload.roles.some(userRole => {
      const [ key, access ] = userRole.split('.');
      return roleKey == key && (access == 'all' || access == roleAccess);
    });
  },

  /**
   * Renews the token
   */
  async renewToken() {
    if(!this.token) {
      throw new Error('Can\'t renew a nonexistent token!');
    }

    // Renew the token
    const { token, expires } = await request(`${this.path}/renewToken`, { token });
    Storage.set(TOKEN_KEY, token);
    Storage.set(EXPIRES_KEY, expires);
  },
  /**
   * Changes the users password
   * @param {String} newPassword 
   */
  changePassword(newPassword) {
    const { path, token } = this;

    // Changing the password also renews the token
    return request(`${path}/changePassword`, { token, newPassword });
  },
  /**
   * Logins the user and sets the session
   * @param {String} username 
   * @param {String} password 
   */
  async login(username, password) {
    const { path } = this;

    // Set access token
    const { token, expires, payload } = await request(`${path}/login`, { username, password });
    Storage.set(TOKEN_KEY, token);
    Storage.set(EXPIRES_KEY, expires);
    Storage.set(PAYLOAD_KEY, payload);
  },
  /**
   * Destroys the session
   */
  logout() {
    Storage.clear();
    /*Storage.remove(TOKEN_KEY);
    Storage.remove(EXPIRES_KEY);
    Storage.remove(PAYLOAD_KEY);*/
  }
};

export default {
  // Vue plugin
  installed: false,
  install(Vue, path = '/cms/auth') {
    if (this.installed) return;
    this.installed = true
    Auth.path = path;
  
    // Define auth object to vue prototype
    Object.defineProperty(Vue.prototype, '$auth', {
      writable: false,
      value: Auth,
    });
  },

  // Vue Router authentication middleware
  middleware(to, from, next) {
    if (!Auth.isLoggedIn && to.matched.some(record => record.meta.requiresAuth)) {
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
