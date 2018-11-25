<template lang="pug">
.edit-fields
  h2 Redigera fält
  mdc-button(icon="save", raised, :disabled="invalid", @click="save") {{ invalid ? 'Fälten är inte rätt inställda' : 'Spara' }}
  p
    i.material-icons info
    | Tänk på att alla fältnamn måste vara unika

  edit-fields(v-if="loaded")
</template>

<script>
import EditFields from './field/Fields.vue';
import Field from '../lib/field';

// Used to convert observable objects into normal
function resolve(fields) {
  return fields.map(field => {
    const data = {
      name: field.name,
      label: field.label,
      type: field.type,
    };

    if (field.fields) {
      data.fields = resolve(field.fields);
    }
    return data;
  });
}
function unique(fields) {
  return fields.every(field => {
    const isUnique = field == fields.find(x => x.name == field.name);
    return isUnique && (field.fields ? unique(field.fields) : true);
  });
}

export default {
  name: 'CmsPageFields',
  components: { EditFields },
  data: () => ({
    invalid: false,
    loaded: false,
  }),

  async created() {
    try {
      const { page } = this.$route.params;
      const fields = await this.$api.get(`/field/${page}`);

      Field.load(fields);
      this.loaded = true;
    } catch(ex) {
      this.$snackbar.show(ex.message);
    }
  },

  methods: {
    async save() {
      const fields = resolve(Field.read());
      const { page } = this.$route.params;

      // Only upload if all fields are unique
      if(unique(fields)) {
        await this.$api.post(`/field/${page}`, {
          data: { fields },
        });
        this.$snackbar.show('Dina ändringar sparades.');
      } else {
        this.$snackbar.show('Alla fältnamn måste vara unika.');
      }
    },
  },
};
</script>
