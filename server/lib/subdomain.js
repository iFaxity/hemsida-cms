const SUBDOMAINS = {};

function subdomain(req, res, next) {
  const {subdomains} = req;
  let router = null;

  if (subdomains.length > 0) {
    // TODO: support * wildcard on domains?
    const domain = subdomains.reverse().join(".");
    
    if (SUBDOMAINS[domain]) {
      router = SUBDOMAINS[domain];
    }
  } else if (SUBDOMAINS.base) {
    router = SUBDOMAINS.base;
  }

  if(router) {
    return router(req, res, next);
  } else {
    next();
  }
}

subdomain.add = function(domain, route) {
  if(domain && typeof domain === "object") {
    // Multiple domains
    Object.keys(domain).forEach(key => subdomain.add(key, domain[key]));
  } else {
    // Single domain
    if (typeof domain !== "string") {
      throw new Error("Subdomain.add takes a string as first parameter");
    }
    if (typeof route !== "function") {
      throw new Error("Subdomain.add takes a function as second parameter.");
    }
    if (SUBDOMAINS[domain]) {
      throw new Error("Duplicate subdomain! domain: " + domain);
    }

    SUBDOMAINS[domain] = route;
  }
};

module.exports = subdomain;
