let isSupported = true;
// Check for StorageAPI support
try {
  const key = "_";
  localStorage.setItem(key, true);
  localStorage.removeItem(key);
} catch(ex) {
  isSupported = false;
}

if (!isSupported) {
  let data = {};
  const storage = {
    setItem(key, value) {
      data[key] = value;
    },
    getItem(key) {
      if (data.hasOwnProperty(key)) {
        return data[key];
      }
    },
    removeItem(key) {
      delete data[key];
    },
    clear() {
      data = {};
    }
  };

  try {
    window.localStorage = storage;
  } catch(ex) {
    alert("This webpage does not support incognito mode on your device! Please disable incognito mode!")
  }
}