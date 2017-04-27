(function(global, factory) {
  // Module exporting
  if (typeof define === "function" && define.amd) {
    define(["dom"], factory);
  } else {
    const exports = factory();
    if (typeof module !== "undefined" && module.exports) {
      module.exports = exports;
    }
  }
})(this, function(DOM) {
  class Store {
    constructor() {
      this.state = {
        action: null
      };
      this.subscriptions = [];
    }

    subscribe(fn) {
      if(typeof fn !== "function") {
        throw new TypeError("Parameter error in subscribe½");
      }
      this.subscriptions.push(fn);
    }
    dispatch(state) {
      this.subscriptions.forEach(fn => fn(state));
    }
    connect() {

    }
  }

  // Export to window
  if(window && !window.Store) {
    window.Store = Store;
  }
  return Store;
});
