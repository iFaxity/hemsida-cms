<template lang="pug">
.collection
  h3 Not yet finished
  .fields(v-for="field of value")
    .field(v-for="(field, name) of value")
      component(:is="field.is", :label="field.label", v-model="field.value")
  mdc-button Lägg till fält
</template>

<script>
export default {
  props: {
    label: String,
    value: Array,
  },
};
</script>
