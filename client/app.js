const riot = require("riot");
//const UI_TAGS = ["button", "grid", "icon", "item", "menu", "segment"];

// Main components
require("./modules/cms.tag");

const isStr = str => typeof str === "string";

// Get all the UI components
/*UI_TAGS.forEach(name => {
  require(`./modules/ui/${name}.tag`);
});*/
require(`./modules/ui/*.tag`, { mode: "expand" });

if(!window.riot) {
  window.riot = riot;
}