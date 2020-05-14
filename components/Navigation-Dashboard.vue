<template>
  <aside class="dashboard-navigation">
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

<style scoped lang="scss">
@import '~avril/scss/variables';

aside.dashboard-navigation {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: $dashboard-navigation-width;
  background-color: $white;  @include touch {
    display: none;
  }

  .menu {
    margin-top: 7.25rem;
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
