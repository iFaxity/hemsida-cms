<template lang="pug">
.edit-page
  h2 Editing page: {{ slug }}

  mdc-textfield(v-model="label", label="Sidonamn")
  .controls
    mdc-form-field(label="Publicerad")
      mdc-checkbox(v-model="published")
    mdc-button(@click="save") Spara ändringar

  .fields
    .field(v-for="(field, name) of fields")
      span.slug Fältnamn: {{ name }}
      component(:is="field.is", :label="field.label", v-model="field.value")
</template>

<script>
import EditTextfield from './edit/Textfield.vue';
import EditTextarea from './edit/Textarea.vue';
import EditFroala from './edit/Froala.vue';
import EditMedia from './edit/Media.vue';
import EditNumber from './edit/Number.vue';
import EditBoolean from './edit/Boolean.vue';
import EditCollection from './edit/Collection.vue';

const FIELDS = {
  paragraph: 'textfield',
  text: 'textarea',
  wysiwyg: 'froala',
  html: 'textarea',
  media: 'media',
  number: 'number',
  boolean: 'boolean',
  collection: 'collection'
};

export default {
  name: 'CmsEditPage',
  components: {
    EditTextfield,
    EditTextarea,
    EditFroala,
    EditMedia,
    EditNumber,
    EditBoolean,
    EditCollection,
  },
  props: {},

  data() {
    return {
      label: '',
      published: false,
      fields: {},
    };
  },
  computed: {
    slug() {
      return this.$route.params.page;
    },
  },

  async created() {
    const token = this.$auth.token;

    // Call api function to get current pages
    try {
      const page = await this.$api(`/page/${this.slug}`);
      // Add is prop to field
      Object.keys(page.fields).forEach(key => {
        const field = page.fields[key];
        field.is = `edit-${FIELDS[field.type]}`;
      });

      this.fields = page.fields;
      this.published = page.published;
      this.label = page.label;
    } catch(ex) {
      this.$snackbar.show(ex.message);
    }
  },
  methods: {
    async save() {
      const token = this.$auth.token;

      // Call api function to save changes
      try {
        const fields = Object.keys(this.fields).reduce((fields, key) => {
          const { is, ...newField} = this.fields[key];
          fields[key] = newField;
          return fields;
        }, {});

        const page = await this.$api(`/page/${this.slug}`, {
          method: 'post',
          body: {
            data: {
              fields,
              published: this.published,
              label: this.label,
            }
          },
        });

        this.$snackbar.show('Ändringarna sparades');
      } catch(ex) {
        this.$snackbar.show(ex.message);
      }
    }
  },
};
</script>
