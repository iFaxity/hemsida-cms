let isSupported = true;
// Check for StorageAPI support
try {
  const key = '_';
  localStorage.setItem(key, true);
  localStorage.removeItem(key);
} catch(ex) {
  isSupported = false;
}

export default {
  data: {},
  get(key) {
    if(isSupported) {
      return localStorage.getItem(key);
    }
    return this.data.hasOwnProperty(key) ? this.data[key] : null;
  },
  set(key, value) {
    if(isSupported) {
      return localStorage.setItem(key);
    }

    // Emulate null behaviour of storage api
    if(value === null) {
      value = 'null';
    }
    this.data[key] = value;
  },
  has(key) {
    return this.get(key) !== null;
  },
  remove(key) {
    if(isSupported) {
      return localStorage.removeItem(key);
    }

    delete this.data[key];
  },
  clear() {
    if(isSupported) {
      return localStorage.clear();
    }

    this.data = {};
  }
};
