import { API } from './api';

const findFieldIndex = (fields, name) => fields.findIndex(field => field.name === name);
const findField = (fields, name) => fields.find(field => field.name === name);

function walkFields(fields, name) {
  const keys = Array.isArray(name) ? name : name.split('.');
  return keys.reduce((acc, key) => findField(acc.fields || acc, key), fields);
}

// Single source of truth using a seperate module
export default {
  fields: [],

  add(name, field) {
    let { fields } = this;
    if (name) {
      fields = findField(fields, name).fields;
    }
    fields.push(field);
  },
  remove(name) {
    const keys = name.split('.');
    const prop = keys.pop();

    const { fields } = walkFields(this.fields, keys);
    const index = findFieldIndex(fields, prop);
    fields.splice(index, 1);
  },
  update(name, data) {
    const keys = name.split('.');
    const prop = keys.pop();

    const { fields } = walkFields(this.fields, keys);
    const index = findFieldIndex(fields, prop);

    const field = Object.assign({}, fields[index], data);
    fields.splice(index, 1, field);
  },

  save(page) {
    return API.post(`/page/${page}`, {
      data: {
        fields: this.fields,
      }
    });
  },
  load(page) {
    const data = await API.get(`/page/${page}`);
    this.fields = data.fields;
  }
}
