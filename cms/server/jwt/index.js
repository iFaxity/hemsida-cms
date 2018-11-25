
/*
 * Code heavily based on jsonwebtoken package on npm
 * https://github.com/auth0/node-jsonwebtoken
*/
const { TokenError, TokenExpiredError, TokenNotBeforeError } = require('./error');

module.exports = {
  sign: require('./sign'),
  verify: require('./verify'),
  decode: require('./decode'),
  TokenError,
  TokenExpiredError,
  TokenNotBeforeError,
};
