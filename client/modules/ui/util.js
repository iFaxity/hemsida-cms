module.exports = {
  WIDTH: [
    "one", "two", "three", "four", "five", "six", "seven", "eight",
    "nine", "ten", "eleven", "twelve", "fourteen", "fifteen", "sixteen"
  ],
  SIZES: ["mini", "small", "large", "massive"],
  ATTACH: ["top","bottom","left","right"],

  isStr(str) {
    return typeof str === "string";
  },
  classify(obj, type) {
    const classes = ["ui"];
    Object.keys(obj).forEach(name => {
      const value = obj[name];
      if (value || value === "")
        classes.push(name);
    });

    if(type) {
      classes.push(type);
    }
    return classes.join(" ");
  }
};