<template lang="pug">
mdc-textfield(:label="label", v-model="model")
</template>

<script>
export default {
  props: {
    label: String,
    value: String,
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
};
</script>
