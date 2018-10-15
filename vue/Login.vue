<template lang="pug">
.login
  h1 CMS Login
  .login__content
    form.login__form
      mdc-textfield(v-model="username", label="Username")
      mdc-textfield(v-model="password", label="Password", type="password")
      mdc-button(raised, @click="onSubmit") Logga in

  //ui-grid.middle.aligned(align="center")
    ui-column
      ui-header(level="1" color="teal") Logga in på CMS
      ui-segment(stack)
        ui-form(size="large" @submit="onSubmit")
          ui-field
            ui-input(icon="left" name="username" placeholder="Användarnamn" required)
              ui-icon(icon="user")
          ui-field
            ui-input(icon="left" type="password" name="password" placeholder="Lösenord" required)
              ui-icon(icon="lock")
          ui-button(size="big" color="teal" fluid) Logga in
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const { username, password } = this;
      const redirect = this.$route.query.redirect || "/dashboard";

      debugger;
      this.$auth.login(username, password)
        .then(() => this.$router.push(redirect))
        .catch(ex => alert(ex.message));
    }
  }
};
</script>