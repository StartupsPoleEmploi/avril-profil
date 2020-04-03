<template>
  <aside class="dashboard-navigation">

    <header class="dashboard-navigation-header">
      <AvrilLogo/>
    </header>

    <aside class="menu">
      <ul class="menu-list">
        <li>
          <nuxt-link to="/mon-compte">
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
import AvrilLogo from '~/components/navigation/AvrilLogo';

export default {
  components: {
    AvrilLogo,
  },
}
</script>

<style scoped lang="scss">
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
}
</style>
