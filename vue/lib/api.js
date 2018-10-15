// Set API fetch shorthand
function param(params) {
  // Only an object or array is allowed
  if ((!params && typeof params !== 'object') && !Array.isArray(params))  {
    throw new TypeError('Parameter \'params\' is not an object or an array');
  }

  // Remove all null and undefined values and encode the key's and values
  const arr = Object.keys(params).filter((key) => params[key] !== undefined).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  });

  // Join with & sign
  return arr.length > 0 ? arr.join('&') : null;
}

async function request(root, path, { method, body }) {
  method = method.toLowerCase();
  const opts = {
    method: method || 'get',
    headers: {
      'Accept': 'application/json'
    }
  };

  if (method === 'post' || method == 'put') {
    if (typeof body === 'object' || Array.isArray(body)) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
  } else if(body) {
    const query = param(body);
    path = `${path}?${query}`;
  }

  const res = await fetch(root + path, opts);
  if (!res.ok) {
    throw 'Verifieringsfel';
  }
  return res.json();
}

export default {
  installed: false,
  install(Vue, root = '') {
    if(!this.installed) {
      this.installed = true;
      
      Object.defineProperty(Vue.prototype, '$api', {
        writable: false,
        value: request.bind(this, root)
      });
    }
  }
}
