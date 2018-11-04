<template lang="pug">
.fields
  cms-field(v-for="(field, i) of fields", v-bind="field", :nested="nested", @change="change(field, i)", @remove="remove(field, i)")
  mdc-button(icon="add", @click="add") Lägg till fält
</template>

<style lang="scss">
.fields {
  padding-left: 2em;
  padding: 1em;
  border: 1px solid black;

  & > .fields {
    padding-bottom: 1em;
  }
}
</style>

<script>
import CmsField from './Field.vue';
import Field from '../lib/field';

export default {
  name: 'EditFields',
  components: { CmsField },
  model: {
    prop: 'fields',
    event: 'change',
  },

  props: {
    fields: Array,
    nested: Boolean,
  },
  data: () => ({
    valid: true,
  }),

  methods: {
    add() {
      const fields = Array.from(this.fields);
      fields.push({
        name: 'nytt_fält',
        label: 'Nytt fält',
        type: 'paragraph',
      });

      this.$emit('change', fields);
    },
    update(field, index) {
      const fields = Array.from(this.fields);
      fields[index] = field;

      this.$emit('change', fields);
    },
    remove(field, index) {
      const fields = Array.from(this.fields);
      fields.splice(index, 1);

      this.$emit('change', fields);
    },
  },
};
</script>
