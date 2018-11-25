// Single source of truth using a seperate module
export default {
  fields: [],
  isValid: true,

  validate(name) {},
  read(name) {
    if (!name) return this.fields;

    const keys = Array.isArray(name) ? name : name.split(':');
    return keys.reduce((acc, key) => (acc.fields || acc)[key], this.fields);
  },
  load(fields) {
    // Adds the original name to seperate variable to track the field when saving
    const resolve = items => items.forEach(({ fields }) => {
      return fields && resolve(fields);
    }) || items;

    this.fields = resolve(fields);
  },
}
