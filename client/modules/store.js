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
      this.subscriptions = {};
      this.nextID = 1;
      this.isDispatching = false;
      //TODO: Support pending and handeled stuff
    }

    /**
     * @param {Function} fn - Function to subscribe with
     * @returns {String} ID of this subscription
     */
    subscribe(fn) {
      if (typeof fn !== "function") {
        throw new TypeError("Subscribe takes a function as a parameter!");
      }
      const ID = this.nextID++;
      this.subscriptions[ID] = fn;

      return "ID_" + ID;
    }
    /**
     * 
     */
    unsubscribe(id) {
      let res = false;
      if (this.subscriptions[id]) {
        res = true;
        delete this.subscriptions[id];
      }

      return res;
    }
    dispatch(state) {
      if (this.isDispatching) {
        throw new Error("Store is already dispatching!");
      }
      try {
        this.isDispatching = true;
        Object.keys(this.subscriptions).forEach(id => this.subscriptions[id](state));
      } finally {
        this.isDispatching = false;
      }
    }
  }

  // Export to window
  if(window && !window.Store) {
    window.Store = Store;
  }
  return Store;
});
