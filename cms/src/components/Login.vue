<template lang="pug">
.login
  h1 CMS Login
  .login__content
    form.login__form
      mdc-textfield(v-model="username", label="Användarnamn")
      mdc-textfield(v-model="password", label="Lösenord", type="password")
      mdc-button(raised, @click="login") Logga in
</template>

<script>
export default {
  name: 'CmsLogin',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login(e) {
      e.preventDefault();
      const { username, password } = this;
      const redirect = this.$route.query.redirect || '/';

      try {
        await this.$auth.login(username, password);
        this.$router.push(redirect);
      } catch(ex) {
        this.$snackbar.show(ex.message);
        console.error(ex);
      }
    }
  }
};
</script>
