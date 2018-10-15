// Set API fetch shorthand
function param(params) {
  // Only an object or array is allowed
  if ((!params && typeof params !== "object") && !Array.isArray(params))  {
    throw new TypeError("Parameter 'params' is not an object or an array");
  }

  // Remove all null and undefined values and encode the key's and values
  const arr = Object.keys(params).filter((key) => params[key] !== undefined).map((key) => {
    return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
  });

  // Join with & sign
  return arr.length > 0 ? arr.join("&") : null;
}

function request(root, path, { method, body }) {
  const opts = {
    method: method || "GET",
    headers: {
      "Accept": "application/json"
    }
  };

  if (method === "POST") {
    if (typeof body === "object" || Array.isArray(body)) {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(body);
    }
  } else if(body) {
    const query = param(body);
    path = `${path}?${query}`;
  }


  return fetch(root + path, opts).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      const err = new Error("Verifieringsfel");
      return Promise.reject(err);
    }
  }); 
}

export default {
  installed: false,
  install(Vue, root = "") {
    if(!this.installed) {
      this.installed = true;
      
      Object.defineProperty(Vue.prototype, "$api", {
        writable: false,
        value: request.bind(this, root)
      });
    }
  }
}
