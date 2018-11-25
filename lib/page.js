const fs = require('mz/fs');
const path = require('path');
const { color, COLORS } = require('./colors');

const PAGES_FILE = path.join(__dirname, './config/pages.json');
const RESERVED_PAGES = [
  /^blog/,
];
const DEFAULT_VALUES = {
  paragraph: '',
  text: '',
  wysiwyg: '',
  html: '',
  media: '',
  number: 0,
  boolean: false,
  collection: [],
};

// Function for merging fields recursively
function setFields(fields, pageFields) {
  return fields.map(field => {
    const pageField = pageFields.find(x => x.name == field.name);
    if (!pageField) return field;

    // Map sub-fields
    if (field.type == 'collection' && pageField.fields) {
      field.fields = setFields(field.fields, pageField.fields);
    }

    // Keep unmodified props
    if (field.label) {
      field.name = field.label.toLowerCase().replace(/[^a-z0-9åäö]/g, '_');
    }
    return Object.assign({}, pageField, field);
  });
}

// TODO: add mongodb connection instead of json data
const Page = {
  pages: {},
  preview: {},
  

  /**
   * Checks if page exists
   * @param {String} slug - Page slug identifier
   * @param {Boolean} [published=false] - Only return true if page is published
   */
  has(slug, published = false) {
    if (this.pages.hasOwnProperty(slug)) {
      const page = this.pages[slug];
      return published ? page.published : true;
    }
    return false;
  },

  /**
   * Gets page data
   * @param {String} [slug] - Page slug identifier
   * @param {Boolean} [published=false] - Only get page if its published
   */
  get(slug, published = false) {
    if (!slug) {
      // Get page metadata only (no fields)
      return Object.keys(this.pages).map(slug => {
        const { fields: _, ...page } = this.pages[slug];
        return Object.assign(page, { slug });
      });
    } else if (this.has(slug, published)) {
      return this.pages[slug];
    }

    return null;
  },
  
  /**
   * Sets data to a specific page
   * @param {String} slug - Page slug identifier
   * @param {String} data - Data to set
   */
  set(slug, data) {
    if (RESERVED_PAGES.some(x => slug.match(x))) return false;

    const page = this.pages[slug] = this.pages[slug] || {};
    if (data.fields) {
      data.fields = setFields(data.fields, page.fields).map(field => {
        // Ensure fields has the correct values
        const { value, type } = field;
        const defValue = DEFAULT_VALUES[type];

        if (!value || typeof value != typeof defValue) {
          field.value = defValue;
        }
        return field;
      });
    }

    // Assign new page data
    Object.assign(page, data);
    this.writePages();
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

    this.pages[newSlug] = this.pages[oldSlug];
    delete this.pages[oldSlug];
    this.savePages();
  },

  /**
   * Removes a page completely
   * @param {String} slug - Page slug identifier
   */
  remove(slug) {
    // Check if cache has a valid file
    if (!this.has(slug)) return false;

    delete this.pages[slug];
    this.savePages();
    return true;
  },

  // Save and write pages data
  async writePages() {
    const data = JSON.stringify(this.pages, null, 2);
    await fs.writeFile(PAGES_FILE, data);
  },
  async readPages() {
    try {
      const data = await fs.readFile(PAGES_FILE);
      this.pages = JSON.parse(data);
      console.log(color(COLORS.blue, 'Page data system successfully loaded!'));
    } catch (ex) {
      console.log(color(COLORS.red, `Error loading page data: ${ex.message}`));
    }
  }
};

// Read the pages file
Page.readPages();
module.exports = Page;
