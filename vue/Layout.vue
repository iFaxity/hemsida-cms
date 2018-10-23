<template lang="pug">
#app.mdc-typography
  router-view.app-view
  mdc-snackbar(ref="snackbar", align-start)
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$snackbar.$on(this.$refs.snackbar.show);
  },
  beforeDestroy() {
    this.$snackbar.$off(this.$refs.snackbar.show);
  }
};
</script>


