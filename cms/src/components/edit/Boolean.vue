<template lang="pug">
mdc-form-field(:label="label")
  mdc-switch(v-model="model")
</template>

<script>
export default {
  model: {
    event: 'changed',
    prop: 'checked'
  },
  props: {
    label: String,
    checked: Boolean,
  },

  computed: {
    model: {
      get() {
        return this.checked;
      },
      set(checked) {
        this.$emit('changed', checked);
      }
    }
  }
};
</script>
