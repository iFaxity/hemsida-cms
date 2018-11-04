<template lang="pug">
.edit-fields
  h2 Redigera fält
  mdc-button(icon="save", raised, :disabled="fieldsInvalid", @click="save") {{ fieldsInvalid ? 'Fälten är inte rätt inställda' : 'Spara' }}
  p
    i.material-icons info
    | Tänk på att alla fältnamn måste vara unika

  edit-fields(v-model="fields")
  //article.fields
    .field(v-for="(f, index) of fields")
      .meta
        i.material-icons {{ getIcon(f) }}
        mdc-textfield(required, v-model="f.name", label="Fältnamn", @input="validateFields")
        mdc-textfield(required, v-model="f.label", label="Fältetikett")
        mdc-select(required, v-model="f.type", label="Fälttyp")
          mdc-select-item(disabled, label="Välj fälttyp", value="none")
          mdc-select-item(v-for="ft of fieldTypes", :label="ft.label", :value="ft.type")
        mdc-button(@click="removeField(index)" icon="close")
      
      .fields(v-if="f.type == 'collection'")
        mdc-button(icon="add", @click="createField(index)") Lägg till underfält


    mdc-button(icon="add", @click="createField()") Lägg till fält
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

import EditFields from './field/Fields.vue';
import Fields from '../lib/fields';

export default {
  name: 'CmsPageFields',
  components: { EditFields },
  data: () =>  ({
    fields: [],
    fieldsInvalid: false,
  }),
  // computed: {
  //   fieldTypes() {
  //     return FIELDS;
  //   }
  // },

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

    // createField(index) {
    //   let fields = this.fields;
    //   if(index > 0) {
    //     const field = this.fields[index];
    //     field.fields = [];
    //     fields = field.fields;
    //   }

    //   fields.push({
    //     label: 'Nytt fält',
    //     name: 'nytt_fält',
    //     type: 'none',
    //   });
    // },
    // getIcon(field) {
    //   const f = FIELDS.find(x => x.type == field.type);
    //   return f && f.icon;
    // },
    // validateFields() {
    //   const { fields } = this;
    //   console.log('Lel?');
    //   this.fieldsInvalid = !fields.every((field, index) => {
    //     const i = this.fields.findIndex(f => f.name == field.name);
    //     return index == i && field.name && field.label;
    //   });
    // },

    // addField(field) {
    //   if(field) {
    //     this.fields.push({
    //       label: 'Nytt fält',
    //       name: '',
    //       type: field.type,
    //     });
    //   } else {
    //     this.$snackbar.show('Vilket fält?');
    //   }
    // },
    // removeField(index) {
    //   const field = this.fields[index];
    //   if(confirm(`Vill du verkligen ta bort fältet '${field.name}'?`)) {
    //     this.fields.splice(index, 1);
    //   }
    // },
};
</script>
