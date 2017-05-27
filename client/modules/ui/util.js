module.exports = {
  WIDTH: [
    "one", "two", "three", "four", "five", "six", "seven", "eight",
    "nine", "ten", "eleven", "twelve", "fourteen", "fifteen", "sixteen"
  ],
  SIZES: ["mini", "small", "large", "massive"],
  ATTACH: ["top","bottom","left","right"],
};
const isStr = str => typeof str === "string";
exports.classify = (obj, type) => {
  const classes = ["ui"];
  Object.keys(obj).forEach(name => {
    const value = obj[name];
    if (value || value === "")
      classes.push(name);
  });

  if (type) {
    classes.push(type);
  }
  return classes.join(" ");
};

// Filter the classes
exports.classes = (...args) => args.filter(arg => arg != false).join(" ");

exports.oneOf = (value, ...args) => args.include(value);
exports.enumOf = (value, enums) => enums.include(value);

// If value is a string then return value and key
exports.useKey = (value, key) => isStr(value) && key;
// If value is a string then return value and key
exports.useValueAndKey = (value, key) => isStr(value) && `${value} ${key}`;
// Returns key only if value is empty string. Else returns value and key
exports.useKeyOrValueAndKey = (value, key) => isStr(value) && (value === "" ? key : `${value} ${key}`);

// Converts a width number into text
exports.useWidth = (value, key = "", equal = false) => {
  
};