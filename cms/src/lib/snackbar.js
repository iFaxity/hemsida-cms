const Snackbar =  {
  _listeners: [],
  $on(handler) {
    if (typeof handler != 'function') {
      throw 'listener has to be a function';
    }
    this._listeners.push(handler);
  },
  $off(handler) {
    const index = this._listeners.includes(handler);
    if(index >= 0) {
      this._listeners.splice(index, 1);
    }
  },
  show(...args) {
    this._listeners.forEach(listener => listener(...args));
  }
};

function install(Vue) {
  if (install.installed) return;
  install.installed = true;

  Object.defineProperty(Vue.prototype, '$snackbar', { value: Snackbar });
}

export default { install };
