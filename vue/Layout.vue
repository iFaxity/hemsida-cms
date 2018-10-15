<template lang="pug">
#app.mdc-typography
  //toaster
  mdc-snackbar(ref="snackbar")
  router-view.app-view

</template>

<script>
export default {
  name: "App",
};
</script>