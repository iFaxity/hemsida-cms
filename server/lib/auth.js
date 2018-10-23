const path = require('path');
const { fs, crypto } = require('mz');
const { color, COLORS } = require('./colors');

const AUTH_FILE = path.join(__dirname, './config/users.json');
const TOKEN_EXPIRE = 7*24*60*60*1000; // 7 days / 1 week

async function createToken(user) {
  // Generates a token used for identification
  const buffer = await crypto.randomBytes(32);
  const auth = {
    token: buffer.toString('base64'),
    expires: Date.now() + TOKEN_EXPIRE
  };

  if(user) {
    user.token = auth.token;
    user.expires = auth.expires;
  }
  return auth;
};
async function saveAuth() {
  // Saves user changes to file
  const data = JSON.stringify(Auth.users, null, '\t');
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

// TODO: Create multiple token system. Only recreate token if expired.
const Auth = {
  /**
   * Users store
   */
  users: {},

  /**
   * Checks if a specific user exists
   * @param {String} username
   */
  hasUser(username) {
    return this.users.hasOwnProperty(username);
  },
  /**
   * Finds a user from a token
   * @param {Object} users
   * @param {String} token
   */
  findUser(token) {
    const { users } = this;
    let user;

    const match = Object.keys(users).some(name => {
      user = users[name];
      return user && user.token === token;
    });
    return match ? user : null;
  },

  /**
   * 
   * @param {*} token - Access token
   * @param {String} role - Role to check 
   */
  hasRole(token, role) {
    const user = this.findUser(token);

    try {
      const [ roleKey, roleAccess ] = role.split('.');

      // Check if we have access to the 
      return user.payload.roles.some(userRole => {
        const [ key, access ] = userRole.split('.');
        return roleKey == key && (access == 'all' || access == roleAccess);
      });
    } catch(ex) {
      return false;
    }
  },


  /**
   * Creates a new user
   * @param {String} username
   * @param {String} password
   */
  async createUser(username, password, payload) {
    // Creates a new user but does not log the user in
    if (this.hasUser(username)) {
      throw new Error('User already exists!');
    } else {
      // Hash the password
      const sha256 = crypto.createHash('sha256');
      this.users[username] = {
        token: null,
        expires: null,
        password: sha256.update(password, 'utf-8').digest('hex'),
        payload
      };

      // Save changes to file
      await saveAuth();
    }
  },
  /**
   * Changes the password for a user with the specified token
   * @param {String} token 
   * @param {String} newPassword 
   */
  async changePassword(token, newPassword) {
    const user = this.findUser(token);
    if (user) {
      // Hash the password
      const sha256 = crypto.createHash('sha256');
      user.password = sha256.update(password, 'utf-8').digest('hex');
      await saveAuth();
      return;
    }

    throw new Error('Password change failed. No user matches that token!');
  },
  /**
   * Renews a session by creating another token
   * @param {String} token 
   */
  async renewToken(token) {
    const user = this.findUser(token);

    if (user) {
      const auth = await createToken(user);
      await saveAuth();

      return auth;
    }
    throw new Error('Token renewal failed. No user matches that token!');
  },

  /**
   * Authorizes a login token & checks its still valid
   * @param {String} token 
   */
  auth(token) {
    // TODO: Token expiration after 24 hours
    if (typeof token === 'string') {
      const user = this.findUser(token);
      return user && user.expires > Date.now();
    } else {
      throw new Error('Token needs to be a string.');
    }
  },
  /**
   * Invalidates a users token
   * @param {String} token 
   */
  async logout(token) {
    if(typeof token !== 'string') {
      throw new Error('Token needs to be a string!');
    }
    const user = this.findUser(token);

    // 'Nullify' the token & expiration on logout
    if (user) {
      user.token = null;
      user.expires = null;
      await saveAuth();
      return true;
    }

    return false;
  },
  /**
   * Generates a token for a user & returns the  auth token
   * @param {String} username 
   * @param {String} password 
   */
  async login(username, password) {
    // Used to generate a token for a user
    if (!this.hasUser(username)) {
      throw new Error('Invalid credentials!');
    } else {
      // Check if the passwords match
      const user = this.users[username];
      const sha256 = crypto.createHash('sha256');
      const hash = sha256.update(password, 'utf-8').digest('hex');

      if(user.password === hash) {
        const { token, expires, payload } = user;
        // Recreate token only if its invalid
        if(expires < Date.now()) {
          await createToken(user);
          await saveAuth();
        }

        return { token, expires, payload };
      }
      
      throw new Error('Invalid credentials!');
    }
  },

  /**
   * Authenticates before continuing the route
   * @param {String} role - Role required to run this route
   */
  middleware(role) {
    return (ctx, next) => {
      const hasBody = ctx.method == 'POST' || ctx.method == 'PUT';
      const { token } = hasBody ? ctx.request.body : ctx.request.query;
  
      try {
        if(!token) {
          throw new Error('Ingen åtkomsstoken skickad.')
        } else if(!Auth.auth(token)) {
          throw new Error('Åtkomsttoken ogiltig.');
        } else if(role && !this.hasRole(token, role)) {
          throw new Error('Åtkomst nekad till resursen');
        }

        next();
      } catch(ex) {
        ctx.status = 403;
        ctx.body = JSON.stringify({ message: ex.message });
      }
    }
  }
};

loadAuth();
module.exports = Auth;
