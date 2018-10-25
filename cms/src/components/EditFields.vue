<template lang="pug">
.edit-page-fields
  h2 Click a field to edit its properties
  aside
    mdc-list(two-line)
      mdc-list-item(v-for="field of fieldTypes", :text="field.label", @click="addField(field)")
        mdc-list-item-graphic(slot="graphic", :icon="field.icon")
  article
    .edit-field


  mdc-dialog(id="edit-field", ref="editDialog")
    mdc-textfield(v-model="activeField.label", label="Fältnamn")
    mdc-textfield(v-model="activeField.type", label="Fälttyp")
</template>

<script>
const FIELDS = [
  {
    label: 'Kort Text',
    name: 'paragraph',
    icon: 'short_text',
  },
  {
    label: 'Lång Text',
    name: 'text',
    icon: 'notes',
  },
  {
    label: 'WYSIWYG',
    name: 'wysiwyg',
    icon: 'art_track',
  },
  {
    label: 'HTML',
    name: 'html',
    icon: 'code',
  },
  {
    label: 'Media (bild/video)',
    name: 'media',
    icon: 'image',
  },
  {
    label: 'Nummer',
    name: 'number',
    icon: 'money',
  },
  {
    label: 'Boolesk',
    name: 'boolean',
    icon: 'check_box',
  },
  {
    label: 'Kollektion',
    name: 'collection',
    icon: 'list',
  },
];

export default {
  name: 'CmsEditFields',
  components: {},

  data() {
    return {
      fields: [],
      activeField: {}
    };
  },
  computed: {
    fieldTypes() {
      return FIELDS;
    }
  },

  async created() {
    try {
      const { page } = this.$route.params;
      const { fields } = await this.$api(`/page/${page}`);
      this.fields = fields;
    } catch(ex) {
      this.$snackbar.show(ex.message);
    }
  },

  methods: {
    editField(field) {

    },
    addField(field) {
      if(field) {
        this.activeField = {};
        this.$refs.dialog.show();
      } else {
        this.$snackbar.show('Finns inget sådant fält!');
      }
    },
  },
};
</script>
