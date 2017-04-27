const fs = require("fs");
const path = require("path");

const PAGES_DIR = path.join(__dirname, "../pages");
const FILES = {};

function readFile(file) {
  return new Promise((resolve, reject) => {
    //(err, data) => err ? reject(err) : resolve(data));
    fs.readFile(file, "utf-8", (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
function writeFile(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => err ? reject(err) : resolve());
  });
}
function removeFile(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(file, err => err ? reject(err) : resolve());
  });
}

// TODO: rewrite so no initial files can be read only added. aka no read on get
const Cache = {
  /**
   * Checks if cache has a file within its cache
   * @param {String} file 
   */
  has(file) {
    return FILES.hasOwnProperty(file);
  },

  /**
   * Gets a cached file
   * @param {String} file 
   */
  get(file) {
    return new Promise((resolve, reject) => {
      // Check if cache has a valid file
      if (this.has(file)) {
        resolve(FILES[file]);
      } else {
        reject(new Error("That file does not exist."));
      }
    });
  },
  /**
   * Sets new data to a cached file
   * @param {String} file
   * @param {String} data
   */
  set(file, data) {
    // Check if cache has a valid file
    if(this.has(file)) {
      return Promise.resolve();
    }

    return writeFile(path.join(PAGES_DIR, file)).then(() => {
      FILES[file] = data;
    });
  },
  /**
   * Removes a file from cache
   * @param {String} file 
   */
  remove(file) {
    // Check if cache has a valid file
    if(!this.has(file)) {
      return Promise.resolve();
    }

    return removeFile(path.join(PAGES_DIR, file)).then(() => {
      delete FILES[file];
    });
  }
};

// Read all the files from the pages directory
fs.readdir(PAGES_DIR, (err, files) => {
  if (err) {
    throw new Error("Error initializing cache! Message: " + err.message);
  } else {
    files.forEach(file => {
      readFile(path.join(PAGES_DIR, file)).then(data => FILES[file] = data);
    });
  }
});

module.exports = Cache;