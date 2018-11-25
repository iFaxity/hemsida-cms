<template lang="pug">
.cms-pages
  h1 Sidor
  mdc-list(two-line)
    mdc-list-item(v-for="page of pages", @click="editPage(page.slug)", :text="page.title", :secondary="page.published ? 'Publicerad' : 'Inte publicerad'")
  mdc-button(@click="createDialog") Ny sida

  mdc-dialog#create-page(ref="dialog", header="Skapa en ny sida", :valid="dialogValid", @accept="createPage")
    p
      | Sökvägen måste minst vara 3 tecken långt, vara unikt och tillåtna tecken är "A-Za-z-/".
      | Sidonamnet måste vara minst 10 tecken långt men är behöver inte vara unikt.
    mdc-textfield(label="Slug (sökväg)", v-model="dialog.slug")
    mdc-textfield(label="Sidonamn", v-model="dialog.label")
</template>

<script>
export default {
  name: 'CmsPages',
  data() {
    return {
      pages: [],
      dialog: {
        slug: '',
        label: '',
      }
    };
  },
  computed: {
    dialogValid() {
      const { dialog } = this;
      // Check if page already exists
      if(dialog.label.length > 10 && dialog.slug.length > 3) {
        return !this.pages.some(page => page.slug == dialog.slug);
      }
      return false;
    }
  },

  async created() {
    const token = this.$auth.token;

    // Call api function to get current pages
    try {
      this.pages = await this.$api.get('/page');
    } catch(ex) {
      this.$snackbar.show(ex.message);
    }
  },

  methods: {
    createDialog() {
      this.$refs.dialog.open();
    },
    async createPage() {
      const { dialog } = this;

      try {
        await this.$api.put(`/page/${dialog.slug}`, {
          data: { label: dialog.label },
        });

        dialog.slug = '';
        dialog.label = '';
        this.$snackbar.show('Sidan skapades');
      } catch (ex) {
        this.$snackbar.show(ex.message);
      }
    },
    editPage(slug) {
      this.$router.push(`/pages/${slug}`);
    }
  },
};
</script>
