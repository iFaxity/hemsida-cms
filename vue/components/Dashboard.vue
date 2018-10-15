<template lang='pug'>
.dashboard
  h2 kek
  mdc-button(raised, @click='logout') Logout

</template>

<!--<template lang='pug'>
.dashboard
  ui-grid(stackable container)
    // List of pages
    ui-column(width='10')
      ui-segment(align='center' attach='top' inverted color='teal')
        ui-header(level='2')
          ui-icon(icon='server')
          | Sidor    
      ui-segment.pages(attach :loading='fetching')
        ui-list(relaxed divided)
          .item(v-for='page in pages')
            .right.floated.content
              ui-icon(icon='remove' @click='removePage($event, page)')
            ui-icon(icon='linkify')
            .content
              router-link(:to=`'edit' + page`) {{page}}
      ui-button(as='div' size='big' primary attach='bottom' @click='showModal = true')
        ui-icon(icon='add')
        | Lägg till sida 

    // Right menu
    ui-column(width='5' float='right')
      // User settings segment
      ui-segment(align='center' attach='top' inverted color='teal')
        ui-header(level='3' icon)
          ui-icon(icon='settings')
          | Inställningar

      ui-segment(attach)
        ui-header(level='3') Byta lösenord 
        ui-form(@submit='changePassword')
          ui-field
            ui-input(icon='left' type='password' name='password' required placeholder='Lösenord')
              ui-icon(icon='lock')
          ui-field
            ui-input(icon='left' type='password' name='verify' required placeholder='Verifiera lösenord')
              ui-icon(icon='lock') 
          ui-button(positive fluid) Byt lösenord

      ui-button(as='a' size='large' negative fluid attach='bottom' @click='logout')
        ui-icon(icon='sign out')
        | Logga ut

  ui-modal(v-model='showModal' basic size='tiny' dismiss @action='addPage')
    .header Lägg till sida
    .content
      p Skriv sökvägen till sidan du vill lägga till. Sidan måste vara unik!
      ui-input(v-model='newPage' placeholder='/about' size='large' label='Page path')
    .actions
      ui-button.cancel(basic inverted color='red')
        ui-icon(icon='remove')
        | Avbryt
      ui-button.ok(inverted color='green')
        ui-icon(icon='checkmark')
        | Lägg till sida
</template>-->

<script>
export default {
  name: 'Dashboard',
  data() {
    return { pages: [], showModal: false, newPage: '', fetching: false };
  },
  async created() {
    const token = this.$auth.token;
    this.fetching = true;
    // Call api function to get current pages
    try {
      this.pages = await this.$api('/pages', { body: { token } });
      this.fetching = false;
    } catch(ex) {
      this.$snackbar.show('Fetch unsuccessful!', ex.message);
    }
  },
  methods: {
    addPage(e, action) {
      let page = this.newPage;
      if(page && action === 'approve') {
        if(page[0] !== '/') {
          page = `/${page}`;
        }

        // Prevent duplicates
        if(!this.pages.includes(page)) {
          this.$router.push(`edit${page}`);
        } else {
          this.$snackbar.show('En sida med det namn finns redan!')
        }

        this.newPage = '';
      }

      this.showModal = false;
    },
    async removePage(e, page) {
      e.stopPropagation();
      const index = this.pages.indexOf(page);
      const token = this.$auth.token;

      // Call api function to remove the page
      try {
        await this.$api(`/pages${page}`, { method: 'delete', body: { token } });
        this.$snackbar.show(`Sidan '${page}' har tagits bort.`);
        this.pages.splice(index, 1);
      } catch(ex) {
        this.$snackbar.show('Fetch unsuccessful!');
        console.error(ex);
      }
    },
    logout(e) {
      this.$auth.logout();
      this.$router.push('/login');
    },
    changePassword(e) {
      e.preventDefault();
      const { password, verify } = e.target.elements;
      const { value } = password;

      if(value === verify.value) {
        try {
          await this.$auth.changePassword(value);
          this.$snackbar.show('Lösenordet har ändrats');
        } catch(ex) {
          this.$snackbar.show(ex.header);
          console.error(e);
        }
      } else {
        this.$snackbar.show('Båda fälten måste vara likadana');
      }
    }
  }
};
</script>
