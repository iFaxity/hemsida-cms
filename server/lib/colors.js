const COLORS = {
  // Color effects
  reset: 0,
  bright: 1,
  dim: 2,
  underscore: 4,
  blink: 5,
  reverse: 7,
  hidden: 8,

  //Foreground colors
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,

  // Background colors
  bgblack: 40,
  bgred: 41,
  bggreen: 42,
  bgyellow: 43,
  bgblue: 44,
  bgmagenta: 45,
  bgcyan: 46,
  bgwhite: 47
};

function formatColor(str, start, end) {
  let value = `\x1b[${start}m${str}`;
  if(end) {
    value += "\x1b[${end}m";
  }
  return value;
}


function color(name, str) {
  if(!COLORS[name]) {
    throw new TypeError(`Color '${name}' does not exist!`);
  }
  return formatColor(str, COLORS[name], COLORS.reset);;
}

module.exports = color;