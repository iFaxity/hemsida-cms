<template lang="pug">
.field(:class="cssClasses")
  header.field__header(@click="onClick") Fältnamn: {{ slug }}
  .field__content
    slot
</template>

<style lang="scss">
.field {
  &__header {
    background: var(--mdc-theme-primary, #2196f3);
    color: var(--mdc-theme-background, #fff);
  }

  &__content {
    transition: max-height .2s ease-in;
    max-height: 0;
    overflow: hidden;
  }

  &--open {
    .field__content {
      max-height: 100%;
    }
  }
}
</style>

<script>
export default {
  name: 'CmsEditField',
  props: {
    open: [Boolean, String],
    name: String,
  },
  computed: {
    cssClasses() {
      const open = this.open == true || this.open == this.name;
      return this.open && '.field--open';
    }
  },
  methods: {
    onClick() {
      this.$emit('open', this.name || true);
    }
  },
};
</script>
