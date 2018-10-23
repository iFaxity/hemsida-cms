const fs = require('mz/fs');
const path = require('path');
const { color, COLORS } = require('./colors');

const PAGES_FILE = path.join(__dirname, './config/pages.json');
const PAGES = {};
const PAGE_PROPS = ['published', 'fields', 'label'];

async function savePages() {
  const data = JSON.stringify(PAGES, null, '  ');
  await fs.writeFile(PAGES_FILE, data);
}
async function readPages() {
  try {
    const data = await fs.readFile(PAGES_FILE);
    Object.assign(PAGES, JSON.parse(data));
    console.log(color(COLORS.blue, 'Page data system successfully loaded!'));
  } catch (ex) {
    console.log(color(COLORS.red, `Error loading page data: ${ex.message}`));
  }
}

// TODO: add mongodb connection instead fo json data
const Page = {
  /**
   * Checks if page exists
   * @param {String} slug - Page slug identifier
   * @param {Boolean} [published=false] - Only return true if page is published
   */
  has(slug, published = false) {
    const hasPage = PAGES.hasOwnProperty(slug);
    return hasPage && (published ? page.published : true);
  },

  /**
   * Gets page data
   * @param {String} [slug] - Page slug identifier
   * @param {Boolean} [published=false] - Only get page if its published
   */
  get(slug, published = false) {
    if(!slug) {
      return Object.keys(PAGES).map(name => {
        const { fields:_, ...page } = PAGES[name];
        page.slug = name;
        return page;
      });
    } else if (this.has(slug, published)) {
      return PAGES[slug];
    }

    return null;
  },
  
  /**
   * Sets data to a specific page
   * @param {String} slug - Page slug identifier
   * @param {String} data - Data to set
   */
  set(slug, data) {
    const pageData = PAGES[slug] = PAGES[slug] || {};
    // Only set known properties
    PAGE_PROPS.forEach(prop => pageData[prop] = data[prop]);
    savePages();
  },

  /**
   * Renames a slug
   * @param {String} srcSlug - Source slug from which to move from
   * @param {String} destSlug - Destination slug from which to move to
   */
  move(srcSlug, destSlug) {
    if(!this.has(oldSlug)) {
      throw new Error(`Error moving from '${srcSlug}' to '${destSlug}'. The source doesn't exist.`);
    } else if(this.has(newSlug)) {
      throw new Error(`Error moving from '${srcSlug}' to '${destSlug}'. The destination exists already.`);
    }

    PAGES[newSlug] = PAGES[oldSlug];
    delete PAGES[oldSlug];
    savePages();
  },

  /**
   * Removes a page completely
   * @param {String} slug - Page slug identifier
   */
  remove(slug) {
    // Check if cache has a valid file
    if(this.has(slug)) {
      delete PAGES[slug];
      savePages();
      return true;
    }
    return false;
  }
};

// Read the pages file
readPages();
module.exports = Page;
