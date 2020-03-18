<template>
  <aside class="dashboard-navigation">

    <header class="dashboard-navigation-header">
      <a href="/"><AvrilLogo/></a>
    </header>

    <aside class="menu">
      <p class="menu-label">{{profile.firstNames}} {{profile.lastName}}</p>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/">
            Mon espace
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/identite">
            Mon identité
          </nuxt-link>
        </li>
      </ul>
      <p class="menu-label">Mes candidatures</p>
      <ul class="menu-list">
        <li v-for="application in applications">
          <nuxt-link :to="`/mes-candidatures/${application.slug}`">
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
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
