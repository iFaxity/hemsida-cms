<template lang="pug">
.field
  header
    i.material-icons.icon {{ icon }}
    //mdc-textfield(label="Fältnamn", v-model="field.name")
    input(type="text", v-model="field.label")
    i.material-icons.caret(@click="openField") {{ caret }}
    i.material-icons.remove(@click="remove") close

  .content(:class="contentCssClasses")
    //mdc-textfield(label="Fältetikett", v-model="field.label")
    // Type selector
    mdc-select(label="Fälttyp", v-model="field.type")
      mdc-select-item(disabled, label="", value="")
      mdc-select-item(v-for="item of types", v-bind="item")

    cms-fields(v-if="isCollection", :id="id")
</template>

<style lang="scss">
.field {
  margin: 1em 0;

  & .mdc-select__native-control {
    padding-bottom: 0;
  }

  & > header {
    display: inline-block;
    padding: 5px 2em 0;
    background: #2196f3;
    color: white;
    box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.2);

    & .icon {
      margin-right: 1em;
      cursor: default;
    }
    & .caret {
      cursor: pointer;
    }
    & .remove {
      margin-left: 1em;
      cursor: pointer;
      font-size: 24px;
      transition: color 100ms ease;

      &:hover {
        color: #e53935;
      }
    }

    & input {
      height: 30px;
      margin-bottom: 5px;
      color: white;
      background: none;
      border: none;
      outline: none;
      font-size: 1.4em;
      line-height: 1.4em;
      transition: color 200ms ease;
      border-bottom: 1px solid transparent;
      width: 200px;

      &:focus {
        border-color: white;
      }
    }
  }

  & > .content {
    display: block;
    margin-left: 1em;
    //transition: all 100ms ease-in-out;

    &.hidden {
      display: none;
      /*visibility: hidden;
      max-height: 0;
      opacity: 0;
      transform: translate(0, -10px);*/
    }

    & > .fields {
      padding-left: 1em;
    }
  }
}
</style>

<script>
import Field from '../../lib/field';
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
  name: 'CmsField',
  components: {
    CmsFields: () => import('./Fields.vue'),
  },
  props: {
    id: String,
    open: String,
  },

  data: () => ({
    field: {},
  }),

  computed: {
    isNested() {
      return this.id.includes(':');
    },
    types() {
      return this.isNested ? FIELDS.slice(0, -1) : FIELDS;
    },
    icon() {
      return FIELD_ICONS[this.field.type];
    },
    isCollection() {
      return this.field.type == 'collection';
    },
    isOpen() {
      return this.open == this.id;
    },
    contentCssClasses() {
      return !this.isOpen && 'hidden';
    },
    caret() {
      return 'keyboard_arrow_' + (this.isOpen ? 'up' : 'down');
    },
  },

  created() {
    const field = Field.read(this.id);
    this.field = field;
  },

  methods: {
    update(name, value) {
      this.field[name] = value;
    },
    remove() {
      this.$emit('remove', this.field);
    },
    openField() {
      this.$emit('update:open', this.isOpen ? '' : this.id);
    },
  },
};
</script>
