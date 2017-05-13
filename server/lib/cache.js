const fs = require("fs");
const path = require("path");

const PAGES_FILE = path.join(__dirname, "../pages.json");
const PAGES = {};

function saveFile() {
  const data = JSON.stringify(PAGES);
  fs.writeFile(PAGES_FILE, data, err => {
    if(err) {
      throw new Error("Error saving cache! Message: " + err.message);
    }
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
   * Gets a cached file or gets all files no file is specified.
   * @param {String} [file] - File to get
   */
  get(file) {
    let res = null;
    if(!file) {
      res = FILES;
    } else if (this.has(file)) {
      res = FILES[file];
    }

    return res;
  },
  /**
   * Sets new data to a cached file
   * @param {String} file
   * @param {String} data
   */
  set(file, data) {
    FILES[file] = data;
  },
  /**
   * Removes a file from cache
   * @param {String} file 
   */
  remove(file) {
    // Check if cache has a valid file
    if(this.has(file)) {
      delete FILES[file];
      return true;
    }
    return false;
  }
};

// Read the pages file
fs.readFile(PAGES_FILE, (err, data) => {
  if (err) {
    throw new Error("Error loading cache! Message: " + err.message);
  } else {
    PAGES = JSON.parse(data);
  }
});

module.exports = Cache;