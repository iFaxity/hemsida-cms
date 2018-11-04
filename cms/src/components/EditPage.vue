<template lang="pug">
.edit-page
  h2 Editing page: {{ slug }}

  .controls
    mdc-button(raised, icon="edit", @click="$router.push({ path: 'fields', append: true })")
    mdc-button(raised, icon="save", @click="save")
    mdc-form-field(label="Publicerad")
      mdc-checkbox(v-model="published")

  .seo-fields
    mdc-textfield(v-model="title", label="SEO Titel (max 55-60 bokstäver)")
    mdc-textfield(multiline, cols="100", rows="3", v-model="description", label="SEO Beskrivning (max 150-250 bokstäver)")

  .fields
    .field(v-for="(field, name) of fields")
      component(:is="field.is", :label="field.label", v-model="field.value")
</template>

<script>
import EditTextfield from './edit/Textfield.vue';
import EditTextarea from './edit/Textarea.vue';
import EditWYSIWYG from './edit/WYSIWYG.vue';
import EditMedia from './edit/Media.vue';
import EditNumber from './edit/Number.vue';
import EditBoolean from './edit/Boolean.vue';
import EditCollection from './edit/Collection.vue';
const FIELDS = {
  paragraph: 'textfield',
  text: 'textarea',
  wysiwyg: 'wysiwyg',
  html: 'textarea',
  media: 'media',
  number: 'number',
  boolean: 'boolean',
  collection: 'collection',
};

// TODO: move logic to Field component
export default {
  name: 'CmsPage',
  components: {
    EditTextfield,
    EditTextarea,
    EditWYSIWYG,
    EditMedia,
    EditNumber,
    EditBoolean,
    EditCollection,
  },

  data() {
    return {
      title: '',
      description: '',
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

      this.title = page.title;
      this.description = page.description;
      this.published = page.published;
      this.fields = page.fields;
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
          const { is, ...newField } = this.fields[key];
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
