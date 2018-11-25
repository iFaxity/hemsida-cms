/* Lang model
  {
    "en": {
      "key": "value ${variable}"
    },
    "sv": {
      "key": "value ${variable}"
    }
  }
*/

const REGEX = /\${(\w+)}/g;
function format(str, vars) {
  return str.replace(REGEX, (match, name) => {
    return vars.hasOwnProperty(name) ? vars[name] : '';
  })
}

const Lang = {
  langs: {},
  lang: '',

  setLanguage(lang) {
    if(this.langs.hasOwnProperty(lang)) {
      this.lang = lang;
      return true;
    }
    return false;
  },

  get(name, vars = {}) {
    const keys = name.split('.');
    const lang = this.langs[lang];

    // Get message from key name
    const str = keys.reduce((acc, key) => {
      return acc.hasOwnProperty(key) ? acc[key] : '';
    }, lang);

    return str && format(str, vars);
  },
};

export default {
  // Vue plugin
  installed: false,
  install(Vue, langs, lang) {
    if (this.installed) return;
    this.installed = true;

    Lang.langs = langs;
    Lang.setLanguage(lang || Object.values(langs)[0]);

    Object.defineProperty(Vue.prototype, '$l', {
      value: Lang.get,
    });
    Object.defineProperty(Vue.prototype, '$lang', {
      value: Lang,
    });
  },
};
