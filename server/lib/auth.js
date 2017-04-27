const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const SALT_ROUNDS = 10;
const AUTH_FILE = path.join(__dirname, "../users.json");

const generateToken = () => {
  // Generates a token used for identification
  return new Promise((resolve, reject) => {
    // Create token
    crypto.randomBytes(32, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        const token = buf.toString("base64");
        resolve(token);
      }
    });
  });
};
const saveChanges = () => {
  // Saves user changes to file
  const data = JSON.stringify(Auth.users, null, "\t");
  fs.writeFile(AUTH_FILE, data, err => {
    if(err) {
      console.error(err);
    }
  });
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
   * Creates a new user
   * @param {String} username
   * @param {String} password
   */
  createUser(username, password) {
    // Creates a new user but does not log the user in
    return new Promise((resolve, reject) => {
      if (this.hasUser(username)) {
        reject(new Error("User already exists!"));
      } else {
        const user = {};
        this.users[username] = user;

        // Hash the password
        bcrypt.hash(password, SALT_ROUNDS).then(hash => {
          user.password = hash;
          user.token = null;
          // Save changes to file
          saveChanges();
          resolve();
        }, reject);
      }
    });
  },
  /**
   * Authorizes a login token
   * @param {String} token 
   */
  auth(token) {
    // Check if a users token is still valid
    return new Promise((resolve, reject) => {
      // TODO: Token expiration 24 hours after last access
      if(typeof token !== "string") {
        reject(new Error("Token needs to be a string."));
      } else {
        const hasToken = Object.keys(this.users).find(user => this.users[user].token === token);

        if (hasToken) {
          resolve();
        } else {
          reject(new Error("Token does not exist"));
        }
      }
    });
  },

  /**
   * Invalidates a users token
   * @param {String} token 
   */
  logout(token) {
    // Used to invalidate a token which refers to a user
    if(typeof token !== "string") {
      return false;
    } else {
      const keys = Object.keys(this.users);
      const found = keys.some(key => {
        const user = this.users[key];
        const match = user.token === token;

        if (match) {
          // Nullify the token on logout
          user.token = null;
          saveChanges();
        }
        return match;
      });

      return found;
    }
  },
  /**
   * Generates a token for a user
   * @param {String} username 
   * @param {String} password 
   */
  login(username, password) {
    // Used to generate a token for a user
    return new Promise((resolve, reject) => {
      if (!this.hasUser(username)) {
        reject(new Error("Invalid credentials!"));
      } else {
        const user = this.users[username];

        // Check if the passwords match
        bcrypt.compare(password, user.password).then(res => {
          if (res) {
            generateToken().then(token => {
              user.token = token;
              resolve(user.token);
              saveChanges();
            }, reject);
          } else {
            reject(new Error("Invalid credentials!"));
          }
        }, reject);
      }
    });
  }
};

// Read data
fs.readFile(AUTH_FILE, "utf-8", (err, data) => {
  if(err) {
    console.error(err);
  } else {
    Auth.users = JSON.parse(data);
    console.log("Successfully loaded authentication system!");
  }
});

module.exports = Auth;