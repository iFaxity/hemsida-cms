const { URLSearchParams } = require('url');
const http = require('http');
const Buffer = require('buffer');

module.exports = function request(url, { method, body } = {}) {
  method = method ? method.toUpperCase() : 'GET';
  const opts = {
    method,
    headers: {},
  };

  if (method == 'POST' || method == 'PUT') {
    if (typeof body === 'object' || Array.isArray(body)) {
      body = JSON.stringify(body);
      opts.headers['Content-Type'] = 'application/json';
      opts.headers['Content-Length'] = Buffer.byteLength(body);
    } else {
      body = null;
    }
  } else if (body) {
    const params = new URLSearchParams(body);
    url += '?' + params.toString();
    // Unset the body
    body = null;
  }

  return new Promise((resolve, reject) => {
    const req = http.request(url, opts, res => {
      res.setEncoding('utf-8');

      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', _ => {
        try {
          const json = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: json,
          });
        } catch (ex) {
          reject(ex);
        }
      });
    });

    req.on('error', err => reject(err));
    if (body) {
      req.write(body);
    }
    req.end();
  });
}
