<template>
  <aside class="dashboard-navigation">
    <div class="menu">
      <p class="menu-label is-username">
        {{username}}
      </p>
      <p class="menu-label">
        Mon profil
      </p>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/mon-compte">
            Mon identité
          </nuxt-link>
        </li>
      </ul>
      <p class="menu-label">
        Mes VAE
      </p>
      <ul class="menu-list">
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

<script type="text/javascript">

  export default {
    computed: {
      username() {
        return this.$store.getters['identity/username'];
      },
    }
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
  background-color: $white;  @include touch {
    display: none;
  }

  .menu {
    margin-top: 7.25rem;

    .menu-label {
      padding-left: 1rem;
      &.is-username {
        font-weight: bold;
        margin-bottom: 3rem;
        font-size: 1rem;
        padding-right: 1rem;
      }
    }

    .menu-list {
      line-height: 2.25;
      li a {
        padding-left: 2rem;
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
