const path = require('path');
const { fs, crypto } = require('mz');
const { color, COLORS } = require('../../lib/colors');
const jwt = require('./jwt');

const { JWT_SECRET, JWT_ISSUER, JWT_EXPIRES_IN, JWT_MAX_AGE } = require('../../bin/env');
const AUTH_FILE = path.join(__dirname, '../../lib/config/users.json');

// Helper functions
async function saveAuth() {
  // Saves user changes to file
  const data = JSON.stringify(Auth.users, null, 2);
  await fs.writeFile(AUTH_FILE, data);
};
async function loadAuth() {
  // Read data
  try {
    const data = await fs.readFile(AUTH_FILE, 'utf-8');
    Auth.users = JSON.parse(data);
    console.log(color(COLORS.blue, 'Successfully loaded authentication system'));
  } catch (ex) {
    console.log(color(COLORS.red, `Error loading authentication system: ${ex.message}`))
  }
}
function tokenExpired(token) {
  const payload = jwt.decode(token);
  const now = Math.floor(Date.now() / 1000);

  // Expiry claim
  return typeof payload.exp == 'number' && now >= payload.exp;
}

const Auth = {
  /**
   * Users store
   */
  users: {},

  /**
   * Checks if a specific user exists
   * @param {String} name
   */
  hasUser(name) {
    return this.users.hasOwnProperty(name);
  },
  /**
   * Finds a user from a token
   * @param {Object} users
   * @param {String} token
   */
  findUser(name) {
    if (this.hasUser(name)) {
      return this.users[name];
    }
    return null;
  },
  /**
   * Checks if the user has access to a certain resource role
   * @param {*} token - Access token
   * @param {String} role - Role to check 
   */
  hasRole(name, role) {
    const user = this.findUser(name);

    try {
      const [ roleKey, roleAccess ] = role.split('.');

      // Check if we have access to the
      return user.roles.some(userRole => {
        const [ key, access ] = userRole.split('.');
        return roleKey == key && (access == 'all' || access == roleAccess);
      });
    } catch(ex) {
      return false;
    }
  },

  /**
   * Authorizes a login token & checks its still valid
   * @param {String} token - JWT Token to authenticate
   * @param {Object} [opts] - Optional options to pass to jwt.verify
   * @returns {Object} - Returns the token payload
   */
  verify(token, opts = {}) {
    opts.issuer = JWT_ISSUER;
    return jwt.verify(token, JWT_SECRET, opts);
  },
  /**
   * Logins the user and creates a new token
   * @param {String} name 
   * @param {String} password 
   */
  async login(name, password) {
    // Used to generate a token for a user
    if (!this.hasUser(name)) {
      throw new Error('Invalid credentials!');
    } else {
      // Check if the passwords match
      const user = this.users[name];
      const sha256 = crypto.createHash('sha256');
      const hash = sha256.update(password, 'utf-8').digest('hex');

      if(user.password === hash) {
        // Create a JWT Token
        return this.createToken(user.payload);
      }
      
      throw new Error('Invalid credentials!');
    }
  },
  /**
   * Creates a new JWT token
   */
  createToken(payload) {
      // Create a JWT Token
    return jwt.sign(payload, JWT_SECRET, {
      issuer: JWT_ISSUER,
      expiresIn: JWT_EXPIRES_IN,
    });
  },


  /**
   * Creates a new user
   * @param {String} name
   * @param {String} password
   * @param {Object} data
   */
  async createUser(username, password, data) {
    // Creates a new user but does not log the user in
    if (this.hasUser(name)) {
      throw new Error('User already exists!');
    }
    // Hash the password
    const sha256 = crypto.createHash('sha256');
    this.users[name] = {
      password: sha256.update(password, 'utf-8').digest('hex'),
      roles: data.roles,
      payload: {
        username: username,
        name: data.name,
      },
    };

    // Save changes to file
    await saveAuth();
  },
  /**
   * Changes the password for a user with the specified token
   * @param {String} token 
   * @param {String} newPassword 
   */
  async changePassword(username, newPassword) {
    const user = this.findUser(username);

    if (!user) {
      throw new Error('Password change failed. No user matches that token!');
    }

    // Hash the password
    const sha256 = crypto.createHash('sha256');
    user.password = sha256.update(newPassword, 'utf-8').digest('hex');
    await saveAuth();
  },

  /**
   * Authenticates before continuing the route
   * @param {String} role - Role required to run this route
   */
  middleware(role) {
    return async (ctx, next) => {
      // Always allow localhost (only in production pls)
      /*process.env.NODE_ENV == 'production' &&*/
      if (ctx.hostname == 'localhost') {
        return await next();
      }

      try {
        // Verify Authorization header
        const auth = ctx.headers.authorization || '';
        const [ type, token ] = auth.split(' ');

        if (type != 'Bearer' || !token) {
          throw new Error('Auktoriseringsheadern är inte rätt formaterad');
        }

        // Verify the JWT Token (ignore exp but tokens max age within JWT_MAX_AGE)
        const payload = await Auth.verify(token, {
          ignoreExpire: true,
          maxAge: JWT_MAX_AGE,
        });

        // Validate the role and refresh token if needed
        if(role && !this.hasRole(payload.user, role)) {
          ctx.throw(403, 'Åtkomst nekad till resursen');
        }

        // Bind to context
        ctx.jwt = payload;
        await next();

        const expired = tokenExpired(token);
        if (expired && typeof ctx.body == 'object') {
          ctx.body.token = await Auth.createToken(ctx.jwt);
        }
      } catch (ex) {
        if (ex.status) {
          throw ex;
        }
        // Default throw with 401 as status code
        ctx.throw(401, ex.message);
      }
    }
  }
};

loadAuth();
module.exports = Auth;
