<template>
  <aside class="dashboard-navigation">

    <header class="dashboard-navigation-header">
      <div class="dashboard-navigation-tools-label">
        <a href="/"><AvrilLogo/></a>
      </div>
    </header>

    <aside class="menu">
      <ul class="menu-list">
        <li>
          <nuxt-link to="/">
            Accueil
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/profil">
            {{profile.firstNames}} {{profile.lastName}}
          </nuxt-link>
        </li>
        <li v-for="application in applications">
          <nuxt-link :to="`/candidatures/${application.id}`">
            {{application.certificationLabel}}
          </nuxt-link>
        </li>
      </ul>
    </aside>

  </aside>
</template>
<script>
import AvrilLogo from '~/assets/images/avril-logo.svg';

export default {
  components: {
    AvrilLogo,
  },
  computed: {
    applications() {
      console.log(this.$store.state.applications)
      return this.$store.state.applications
    },
    profile() {
      return this.$store.state.profile
    },
  },
}
</script>

<style scoped>
.dashboard-navigation-header {
  padding-left: 1rem;
  padding-top: 1rem
}
</style>
