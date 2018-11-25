<template lang="pug">
.edit-page
  h2 Editing page: {{ slug }}

  .controls
    mdc-button(raised, icon="edit", @click="$router.push({ path: 'fields', append: true })") Redigera fält
    mdc-button(raised, icon="save", @click="save") Spara

  .seo-fields
    mdc-form-field(label="Publicerad")
      mdc-switch(v-model="published")
    mdc-textfield(v-model="title", label="SEO Titel (max 55-60 bokstäver)")
    mdc-textfield(multiline, cols="100", rows="3", v-model="description", label="SEO Beskrivning (max 150-250 bokstäver)")

  .fields
    .field(v-for="(field, name) of fields")
      component(:is="field.is", :label="field.label", v-model="field.value")
</template>

<style lang="scss">
.edit-page {
  .seo-fields {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
  }

  .mdc-text-field:not(.mdc-text-field--textarea) {
    width: 500px;
  }

  .fields {
    display: flex;
    flex-direction: column;
  }

  .field {
    background: #f5f5f5;
    border-radius: 1em;
    padding: 1em;
    flex: 1;
    margin: 0.5em 0;

    & > label {
      display: block;
      font-size: 1.5em;
    }

    .slug {
      display: block;
      font-size: 1.3em;
      margin-bottom: 0.5em;
    }

    .mdc-text-field--textarea .mdc-floating-label {
      background: none;
    }
  }
}
</style>

<script>
import EditTextfield from './edit/Textfield.vue';
import EditTextarea from './edit/Textarea.vue';
import EditWysiwyg from './edit/WYSIWYG.vue';
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
    EditWysiwyg,
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
      const page = await this.$api.get(`/page/${this.slug}`);
      // Add is prop to field
      page.fields.forEach(field => {
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
        const fields = this.fields.map(field => ({
          name: field.name,
          value: field.value,
        }));

        const page = await this.$api.post(`/page/${this.slug}`, {
          data: {
            fields,
            published: this.published,
            label: this.label,
            title: this.title,
            description: this.description,
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
