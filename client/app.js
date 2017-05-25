const riot = require("riot");

// Main components
require("./modules/cms.tag");

const isStr = str => typeof str === "string";

// Get all the UI components
require(`./client/modules/ui/*.tag`, { glob: true });

if(!window.riot) {
  window.riot = riot;
}