<template lang="pug">
.edit-page-fields
  h2 Click a field to edit its properties
    mdc-list
      mdc-list-item(v-for="field of fields", :text="field.label", @click="addField(field)")
        mdc-list-item-graphic(slot="graphic", :icon="field.icon")
        .slug {{ field.slug }}

  article
    mdc-list(two-line)
      mdc-list-item(v-for="field of fields", :text="field.name", :secondary="field.id")
        mdc-list-item-graphic(slot="graphic", :icon="field.icon")
        .slug {{ field.slug }}

  //mdc-dialog(ref="dialog")
</template>

<script>
const FIELDS = [
  {
    label: 'Kort Text',
    component: 'Textfield',
    icon: 'short_text',
  },
  {
    label: 'Lång Text',
    component: 'Textarea',
    icon: 'notes',
  },
  {
    label: 'WYSIWYG',
    component: 'Froala',
    icon: 'art_track',
  },
  {
    label: 'HTML',
    component: 'Textarea',
    icon: 'code',
  },
  {
    label: 'Media (bild/video)',
    component: 'Media',
    icon: 'image',
  },
  {
    label: 'Nummer',
    component: 'Number',
    icon: 'money',
  },
  {
    label: 'Boolesk',
    component: 'Boolean',
    icon: 'check_box',
  },
  {
    label: 'Kollektion',
    component: 'Collection',
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

  async beforeRouteEnter() {
    try {
      const { fields } = await this.$api(`/page/${page}`);
      this.fields = fields;
    } catch(ex) {
      this.$snackbar.show(ex.message);
    }
  },
  beforeRouteLeave() {
    const answer = confirm('Är du säker på att du vill lämna sidan?');
    answer ? next() : next(false);
  },

  methods: {
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
