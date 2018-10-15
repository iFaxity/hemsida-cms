<template lang="pug">
  mdc-checkbox(v-model="model")
</template>

<script>
export default {
  name: 'FieldBoolean',
  model: { event: 'changed', prop: 'checked' },
  props: {
    id: String, // lower & snake-cased name
    name: String,
    checked: Boolean
  },

  computed: {}
};
</script>
