<template>
  <aside class="dashboard-navigation">

    <header class="dashboard-navigation-header">
      <AvrilLogo/>
    </header>

    <div class="menu">
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
    </div>

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

aside.dashboard-navigation {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: $dashboard-navigation-width;
  background-color: $white;
  z-index: 100;
  @include touch {
    display: none;
  }

  .dashboard-navigation-header {
    text-align: center;
  }

  .menu {
    margin-top: 3rem;
    .menu-list {
      line-height: 2.25;
      li a {
        padding-left: 1rem;
        &.is-active, &.is-active-parent {
          font-weight: 600;
          background: palette(default, background);
          color: palette(default, text);
        }
      }
    }
  }
}


</style>
