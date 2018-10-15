const {fs} = require("mz");
const path = require("path");

const PAGES_FILE = path.join(__dirname, "./config/pages.json");
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
    return PAGES.hasOwnProperty(file);
  },

  /**
   * Gets a cached file or gets all files no file is specified.
   * @param {String} [file] - File to get
   */
  get(file) {
    let res = null;
    if(!file) {
      res = Object.keys(PAGES).sort();
    } else if (this.has(file)) {
      res = PAGES[file];
    }

    return res;
  },
  /**
   * Sets new data to a cached file
   * @param {String} file
   * @param {String} data
   */
  set(file, data) {
    PAGES[file] = data;
  },
  /**
   * Removes a file from cache
   * @param {String} file 
   */
  remove(file) {
    // Check if cache has a valid file
    if(this.has(file)) {
      delete PAGES[file];
      return true;
    }
    return false;
  }
};

function renderData(data) {
  if(typeof data === "string") {
    return data;
  } else {
    const { tag, props, children } = data;
    const el = `<${tag}`;

    // give the element props
    if(props && props.length) {
      el += Object.keys(props).map(key => renderData(props[key])).join("");
    }

    el += ">";
    // Render child tags
    if (children && children.length) {
      el += children.map(renderData).join("");
    }

    el += `</${tag}>`;
    return el;
  }  
}

async function readCache() {
  try {
    const data = await fs.readFile(PAGES_FILE);
    Object.assign(PAGES, JSON.parse(data));
    console.log("Cache system successfully loaded!");
  } catch (ex) {
    throw new Error("Error loading cache! Message: " + ex.message);
  }
}

// Read the pages file
readCache();
module.exports = Cache;