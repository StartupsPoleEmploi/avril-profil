<template>
  <aside class="dashboard-navigation">

    <header class="dashboard-navigation-header">
      <a href="/"><AvrilLogo/></a>
    </header>

    <aside class="menu">
      <ul class="menu-list">
        <li>
          <nuxt-link to="/me">
            Mon compte
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/mes-candidatures">
            Mes candidatures
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/mes-rendez-vous">
            Mes rendez-vous
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

<style scoped lang="scss">
@import '~avril/scss/mixins';
@import '~avril/scss/variables';
.menu {
  margin-top: 3rem;
  &-list {
    padding-left: 1rem;
    line-height: 2.25;
    a.is-active, a.is-active-parent {
      font-weight: 600;
      background: palette(default, background);
      color: palette(default, text);
    }
  }
}
.dashboard-navigation-header {
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
