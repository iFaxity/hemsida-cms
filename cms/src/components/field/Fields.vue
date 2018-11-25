<template lang="pug">
.fields
  cms-field(v-for="id of fieldIds", :id="id", :open.sync="opened", @remove="remove")
  mdc-button(icon="add", :disabled="isInvalid", @click="add") Lägg till fält
</template>

<script>
import CmsField from './Field.vue';
import Field from '../../lib/field';

export default {
  name: 'CmsFields',
  components: { CmsField },

  props: {
    id: String,
  },
  data: () => ({
    fields: [],
    opened: '',
  }),
  computed: {
    fieldIds() {
      return this.fields.map((field, index) => {
        const prefix = this.id ? `${this.id}:` : '';
        return prefix + index;
      });
    },
    isInvalid() {
      return this.fields.some(field => {
        return field.name == 'nytt_fält' || field !== this.fields.find(x => x.name === field.name);
      });
    },
  },

  created() {
    const field = Field.read(this.id);
    if (this.id) {
      this.fields = (field.fields = []);
    } else {
      this.fields = field;
    }
  },

  methods: {
    add() {
      this.fields.push({
        name: 'nytt_fält',
        label: 'Nytt fält',
        type: 'paragraph',
      });
      
      // Focus the added element
      this.$nextTick(() => {
        const input = this.$el.querySelector('.field:last-of-type input');
        input.focus();
      });
    },
    remove(field) {
      const index = this.fields.findIndex(x => x === field);
      this.fields.splice(index, 1);
    }
  },
};
</script>
