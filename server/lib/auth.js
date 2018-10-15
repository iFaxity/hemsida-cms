const path = require("path");
//const bcrypt = require("bcrypt");
const sha256 = require("crypto").createHash("sha256");
const { fs, crypto } = require("mz");

const SALT_ROUNDS = 10;
const AUTH_FILE = path.join(__dirname, "./config/users.json");
const TOKEN_EXPIRE = 24*60*60*1000; // 1 day/24 hours

async function createToken(user) {
  // Generates a token used for identification
  const buffer = await crypto.randomBytes(32);
  const auth = {
    token: buffer.toString("base64"),
    expires: Date.now() + TOKEN_EXPIRE
  };

  if(user) {
    user.token = auth.token;
    user.expires = auth.expires;
  }
  return auth;
};
async function saveChanges() {
  // Saves user changes to file
  const data = JSON.stringify(Auth.users, null, "\t");
  await fs.writeFile(AUTH_FILE, data);
};

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
    const {users} = this;
    let user;

    const match = Object.keys(users).some(name => {
      user = users[name];
      return user && user.token === token;
    });
    return match ? user : null;
  },

  /**
   * Creates a new user
   * @param {String} username
   * @param {String} password
   */
  async createUser(username, password, payload) {
    // Creates a new user but does not log the user in
    if (this.hasUser(username)) {
      throw new Error("User already exists!");
    } else {
      // Hash the password
      //const password = await bcrypt.hash(password, SALT_ROUNDS);
      const password = sha256.update(password, "utf-8").digest("hex");
      this.users[username] = { token: null, expires: null, password, payload };

      // Save changes to file
      await saveChanges();
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
      //user.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
      user.password = sha256.update(password, "utf-8").digest("hex");
      await saveChanges();
      return;
    }

    throw new Error("Password change failed. No user matches that token!");
  },
  /**
   * Renews a session by creating another token
   * @param {String} token 
   */
  async renewToken(token) {
    const user = this.findUser(token);

    if (user) {
      const auth = await createToken(user);
      await saveChanges();

      return auth;
    }
    throw new Error("Token renewal failed. No user matches that token!");
  },

  /**
   * Authorizes a login token & checks its still valid
   * @param {String} token 
   */
  auth(token) {
    // TODO: Token expiration after 24 hours
    if (typeof token === "string") {
      const user = this.findUser(token);
      return user && user.expires > Date.now();
    } else {
      throw new Error("Token needs to be a string.");
    }
  },
  /**
   * Invalidates a users token
   * @param {String} token 
   */
  async logout(token) {
    if(typeof token !== "string") {
      throw new Error("Token needs to be a string!");
    }
    const user = this.findUser(token);

    // "Nullify" the token & expiration on logout
    if (user) {
      user.token = null;
      user.expires = null;
      await saveChanges();
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
      throw new Error("Invalid credentials!");
    } else {
      // Check if the passwords match
      const user = this.users[username];
      //const match = await bcrypt.compare(password, user.password);
      const match = user.password === sha256.update(password, "utf-8").digest("hex");

      if(match) {
        const { token, expires } = await createToken(user);
        await saveChanges();

        return { token, expires, payload: user.payload };
      }
      
      throw new Error("Invalid credentials!");
    }
  },

  /**
   * Authenticates before continuing the route
   * @param {Object} ctx 
   * @param {Function} next
   */
  middleware(ctx, next) {
    let token;
    if (ctx.method === "POST") {
      token = ctx.request.body.token;
    } else {
      token = ctx.request.query.token;
    }
  
    if(token && this.auth(token)) {
      next();
    } else {
      ctx.status = 400;
      ctx.body = JSON.stringify({
        header: "Verifieringsfel",
        message: "Token not valid. Try logging in again!"
      });
    }
  }
};

// Read data
fs.readFile(AUTH_FILE, "utf-8").then(data => {
  Auth.users = JSON.parse(data);
  console.log("Successfully loaded authentication system!");
}).catch(err => {
  console.error(err);
});

module.exports = Auth;