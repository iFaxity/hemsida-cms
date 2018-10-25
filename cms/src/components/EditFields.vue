<template lang="pug">
.edit-page-fields
  h3 Tryck på ett fält från menyn för att lägga till
  mdc-button(@click="save") Spara ändringar
  article
    aside
      mdc-list(two-line, dense)
        mdc-list-item(v-for="field of fieldTypes", :text="field.label", @click="addField(field)")
          mdc-list-item-graphic(slot="graphic", :icon="field.icon")
    
    .edit-fields
      h4 Fält
      p Tips: Tänk på att alla fältnamn måste vara unika
      .edit-field(v-for="(field, index) of fields")
        mdc-textfield(v-model="field.name", label="Fältnamn")
        mdc-textfield(v-model="field.label", label="Fältetikett")
        mdc-select(v-model="field.type", label="Fälttyp")
          mdc-select-item(v-for="ft of fieldTypes", :label="ft.label", :value="ft.type")
        mdc-button(@click="removeField(index)" icon="close")
</template>

<script>

const FIELDS = [
  {
    label: 'Kort Text',
    type: 'paragraph',
    icon: 'short_text',
  },
  {
    label: 'Lång Text',
    type: 'text',
    icon: 'notes',
  },
  {
    label: 'WYSIWYG',
    type: 'wysiwyg',
    icon: 'art_track',
  },
  {
    label: 'HTML',
    type: 'html',
    icon: 'code',
  },
  {
    label: 'Media (bild/video)',
    type: 'media',
    icon: 'image',
  },
  {
    label: 'Nummer',
    type: 'number',
    icon: 'money',
  },
  {
    label: 'Boolesk',
    type: 'boolean',
    icon: 'check_box',
  },
  {
    label: 'Kollektion',
    type: 'collection',
    icon: 'list',
  },
];

export default {
  name: 'CmsEditFields',
  components: {},
  data() {
    return {
      fields: [],
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
      this.fields = Object.keys(fields).map(name => {
        const field = fields[name];
        field.name = name;
        return field;
      });
    } catch(ex) {
      this.$snackbar.show(ex.message);
    }
  },

  methods: {
    addField(field) {
      if(field) {
        this.fields.push({
          label: 'Nytt fält',
          name: '',
          type: field.type,
        });
      } else {
        this.$snackbar.show('Vilket fält?');
      }
    },
    removeField(index) {
      this.fields.splice(index, 1);
    },

    save() {
      const { fields } = this;
      const unique = !fields.some((field, index) => {
        return index == fields.findIndex(x => x.name == field.name);
      });

      if(unique) {
        this.$snackbar.show('Alla fältnamn måste vara unika.');
      } else {
        this.$snackbar.show('Dina ändringar sparades.');
      }
    },
  },
};
</script>
