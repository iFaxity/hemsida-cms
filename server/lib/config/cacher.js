const Vue = require("vue");

function dataToHtml(data) {
  const {tag, children, attrs} = data;
  const html = `<${tag}`;

  if(attrs) {
    Object.keys(attrs).forEach(key => {
      let value = attrs[key];
      html += ` ${key}=${value}`;
    });
  }
  html += ">";

  if(children && children.length > 0) {
    children.forEach(child => {
      html += dataToHtml(child);
    });
  }

  //return `<${tag}${attrs}>${children}</${tag}>`
  return html + `</${tag}>`;
}

export default (data) => {
  const cache = {};

  Object.keys(data).forEach(key => {
    const value = data[key];


  });
};