<template lang="pug">
.field
  .meta
    i.material-icons {{ icon }}
    mdc-textfield(label="Fältnamn", :value="name", @input="change($event, 'name')")
    mdc-textfield(label="Fältetikett", :value="label", @input="change($event, 'label')")
    // Type selector
    mdc-select(label="Fälttyp", :selected="type", @change="change($event, 'type')")
      mdc-select-item(disabled, label="", value="")
      mdc-select-item(v-for="item of types", v-bind="item")

    edit-fields(v-if="isCollection", nested, :fields="fields", @change="update")

    mdc-button(@click="$emit('remove')", icon="close")
</template>

<style lang="scss">
.field {
  padding: 0.5em 0;

  & > .material-icons {
    min-width: 24px;
    margin-right: 1em;
  }
}
</style>

<script>
const FIELD_ICONS = {
  paragraph: 'short_text',
  text: 'notes',
  wysiwyg: 'art_track',
  html: 'code',
  media: 'image',
  number: 'money',
  boolean: 'check_box',
  collection: 'list',
};

const FIELDS = [
  { label: 'Kort Text', value: 'paragraph' },
  { label: 'Lång Text', value: 'text' },
  { label: 'WYSIWYG', value: 'wysiwyg' },
  { label: 'HTML', value: 'html' },
  { label: 'Media (bild/video)', value: 'media' },
  { label: 'Nummer', value: 'number' },
  { label: 'Boolesk', value: 'boolean' },
  { label: 'Kollektion', value: 'collection' },
];

export default {
  name: 'EditField',
  props: {
    type: String,
    name: String,
    label: String,
    nested: Boolean,
    field: Object,
  },

  computed: {
    types() {
      if(this.nested) {
        return FIELDS.slice(0, -1);
      }
      return FIELDS;
    },
    icon() {
      return FIELD_ICONS[this.type];
    },
    isCollection() {
      return this.type == 'collection';
    },
  },

  methods: {
    change(value, field) {
      const data = Object.assign({
        type: this.type,
        name: this.name,
        label: this.label,
        fields: this.fields,
      }, { [field]: value });

      this.$emit('change', field, value);
    },
    update(fields) {
      this.$emit('change', { fields: fields });
    },
    fieldsChange(fields) {
      
    }
  }
};
</script>
