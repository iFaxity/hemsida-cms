class TokenError extends Error {
  constructor(message) {
    super(message);

    if(Error.captureStackTrace) {
      Error.captureStackTrace(this, TokenError);
    }
  }
}

class TokenExpiredError extends TokenError {
  constructor(message, expiredAt) {
    super(message);
    this.expiredAt = expiredAt;
  }
}

class TokenNotBeforeError extends TokenError {
  constructor(message, date) {
    super(message);
    this.date = date;
  }
}


module.exports = {
  TokenError,
  TokenExpiredError,
  TokenNotBeforeError,
};
