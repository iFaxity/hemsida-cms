<template lang="pug">
mdc-app
  mdc-toolbar(slot="toolbar")
    mdc-toolbar-row
      mdc-toolbar-icon(icon="download")

  mdc-drawer(slot="drawer", type="permanent")
    mdc-drawer-item(text="hello")

  main
    mdc-snackbar(ref="snackbar")
    router-view.app
</template>

<script>
export default {
  created() {
    this.$snackbar.$on(this.$refs.snackbar.show);
  },
  beforeDestroy() {
    this.$snackbar.$off(this.$refs.snackbar.show);
  }
};
</script>