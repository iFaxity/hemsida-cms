import "./storage"; // StorageAPI shim

const TOKEN_KEY = "auth_token";
const PAYLOAD_KEY = "auth_payload";
const EXPIRES_KEY = "auth_expires";

/**
 * Simplified fetch wrapper
 * @param {String} path 
 * @param {Object} body 
 */
function request(path, body) {
  if(!body) {
    throw new Error("Auth requester needs a body!");
  }

  return fetch(path, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      const err = new Error("Ett fel uppstod under autensitets förfrågan!")
      return Promise.reject(err);
    }
  });
}

export const Auth = {
  path: "/cms/auth",
  get token() {
    return localStorage.getItem(TOKEN_KEY);
  },
  get expires() {
    return localStorage.getItem(EXPIRES_KEY);
  },
  get payload() {
    return localStorage.getItem(PAYLOAD_KEY);
  },
  get isLoggedIn() {
    const { token, expires } = this;
    // Check if token is still valid
    return !!token && expires >= Date.now();
  },

  /**
   * Renews the token
   */
  renewToken() {
    const { token, path } = this;
    if(!token) {
      throw new Error("Can't renew a nonexistent token!");
    }

    return request(`${path}/renewToken`, { token })
      .then(({token, expires}) => {
        // Renew the token
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(EXPIRES_KEY, expires);
      });
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
  login(username, password) {
    const { path } = this;
    const body = { username, password };

    return request(`${path}/login`, body)
      .then(({ token, expires, payload }) => {
        // Set access token
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(EXPIRES_KEY, expires);
        localStorage.setItem(PAYLOAD_KEY, payload);
      });
  },
  /**
   * Destroys the session
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(PAYLOAD_KEY);

    /*
    const { path, token } = this;

    // No need to make the request if not logged in
    if(!this.isLoggedIn) {
      const err = new Error("Verifieringsfel");
      return Promise.reject(err);
    }

    const destroy = (...args) => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(EXPIRES_KEY);
      localStorage.removeItem(PAYLOAD_KEY);
    };
    return request(`${path}/logout`, { token })
      .then(destroy).catch(destroy);*/
  }
};

function install(Vue, router, path = "/cms/auth") {
  if (install.installed) return;
  install.installed = true

  Auth.path = path;

  // Vue-router add meta authentication
  router.beforeEach((to, from, next) => {
    let route;

    if (!Auth.isLoggedIn && to.matched.some(record => record.meta.requiresAuth)) {
      route = { path: "/login" };

      // Redirect if path isnt dashboard
      if(to.fullPath !== "/dashboard") {
        route.query = { redirect: to.fullPath };
      }
    }

    next(route);
  });

  // Define auth object to vue prototype
  Object.defineProperty(Vue.prototype, "$auth", { value: Auth, writable: false });
}

export default { install };