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

  if(!res.ok) {
    throw 'Ett fel uppstod under autensitets förfrågan!';
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
    return Storage.get(PAYLOAD_KEY);
  },
  get isLoggedIn() {
    const { token, expires } = this;
    // Check if token is still valid
    return !!token && expires >= Date.now();
  },

  /**
   * Renews the token
   */
  async renewToken() {
    const { token, path } = this;
    if(!token) {
      throw new Error('Can\'t renew a nonexistent token!');
    }

    // Renew the token
    const { token, expires } = await request(`${path}/renewToken`, { token });
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
    const body = { username, password };

    // Set access token
    const { token, expires, payload } = await request(`${path}/login`, body);
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

function install(Vue, router, path = '/cms/auth') {
  if (install.installed) return;
  install.installed = true

  Auth.path = path;

  // Vue-router add meta authentication
  router.beforeEach((to, from, next) => {
    let route;

    if (!Auth.isLoggedIn && to.matched.some(record => record.meta.requiresAuth)) {
      route = { path: '/login' };

      // Redirect if path isnt dashboard
      if(to.fullPath !== '/dashboard') {
        route.query = { redirect: to.fullPath };
      }
    }

    next(route);
  });

  // Define auth object to vue prototype
  Object.defineProperty(Vue.prototype, '$auth', { value: Auth, writable: false });
}

export default { install };
