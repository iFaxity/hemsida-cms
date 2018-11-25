<template lang="pug">
mdc-textfield(type="number", :label="label", v-model="model")
</template>

<script>
export default {
  props: {
    label: String,
    value: [Number, String],
  },
  computed: {
    model: {
      get() {
        return '' + this.value;
      },
      set(value) {
        this.$emit('input', +value);
      }
    }
  },
};
</script>
