const riot = require("riot");

// Main tags
require("./modules/cms.tag");
// Semantic UI tags
require("./modules/ui");

if(!window.riot) {
  window.riot = riot;
}