// Constantes used by the tags
const WIDTH = [
  "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "fourteen", "fifteen", "sixteen"
];
const SIZES = ["mini", "small", "medium", "big", "large", "massive"];
const ATTACH = ["top", "bottom", "left", "right"];
const COLORS = [
  "red", "orange", "yellow", "olive", "green", "teal", "blue",
  "violet", "purple", "pink", "brown", "grey", "black"
];

const isStr = str => typeof str === "string";

module.exports = {
  WIDTH, SIZES, ATTACH, COLORS,

  // Filters the classes. Only keeps values that are strings.
  classify: (...args) => args.filter(isStr).join(" "),
  oneOf(value, ...args) {
    const index = args.indexOf(value);
    return index >= 0 && args[index];
  },

  // If value is a string then return value and key
  useKey: (value, key) => isStr(value) && key,
  // If value is a string then return value and key
  useValueAndKey: (value, key) => isStr(value) && `${value} ${key}`,
  // Returns key only if value is empty string. Else returns value and key
  useKeyOrValueAndKey(value, key) {
    return isStr(value) && (value === "" ? key : `${value} ${key}`);
  },

  // Converts a width number into its corresponding class
  useWidth(value, key = "", allowEqual = false) {
    let res;

    if(value === "equal" && allowEqual) {
      res = "equal width";
    } else if (value) {
      // Coerce value into a number
      const index = value - 1;

      if(index >= 0 && index < WIDTH.length) {
        const width = WIDTH[index];
        // Don't use key in name if no key is defined
        res = key ? `${width} ${key}` : width;
      }
    }
    return res;
  }
};

