<template lang="pug">
mdc-app
  mdc-drawer(slot="drawer")
    mdc-list-group-subheader(text="Generellt")
    mdc-drawer-item(text="Instrumentpanel", to="/", exact)
      mdc-list-item-graphic(slot="graphic", icon="dashboard")
    mdc-drawer-item(text="Sidor", to="/pages")
      mdc-list-item-graphic(slot="graphic", icon="insert_drive_file")
    mdc-drawer-item(text="Media", to="/media")
      mdc-list-item-graphic(slot="graphic", icon="perm_media")

    mdc-list-group-subheader(text="Konto")
    mdc-drawer-item(text="Inställningar", to="/settings")
      mdc-list-item-graphic(slot="graphic", icon="settings")
    mdc-drawer-item(v-if="accountsAccess", text="Konton", to="/accounts")
      mdc-list-item-graphic(slot="graphic", icon="supervisor_account")
    // Logout item
    mdc-drawer-item(text="Logga ut", to="/logout")
      mdc-list-item-graphic(slot="graphic", icon="settings_power")

  main
    router-view.app
</template>

<script>
export default {
  name: 'CmsLayout',
  computed: {
    accountsAccess() {
      return this.$auth.hasRole('accounts');
    }
  }
};
</script>
