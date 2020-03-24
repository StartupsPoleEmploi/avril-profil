<template>
  <nav class="navbar is-fixed-top">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://avril.vae">
        Avril logo
      </a>
      <div class="navbar-burger burger" @click="toggle = !toggle" :class="{ 'is-active': toggle }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': toggle }">

      <div class="navbar-end">

        <NavItem to="/">C'est quoi la VAE ?</NavItem>

        <div class="navbar-item has-dropdown is-hoverable is-mega">
          <div class="navbar-link" @click="isActive.navigation = !isActive.navigation">
            Navigation
          </div>
          <div id="blogDropdown" class="navbar-dropdown" :class="{ 'is-active': isActive.navigation }">
            <div class="container is-fluid">
              <div class="columns">

                <div class="column">

                  <h1 class="title is-6 is-mega-menu-title">Notions essentielles</h1>

                  <div class="columns">
                    <div class="column">
                      <NavItem to="/">C'est quoi la VAE ?</NavItem>
                      <NavItem to="/">Bien choisir son diplôme</NavItem>
                      <NavItem to="/">Comment financer ma VAE ?</NavItem>
                    </div>
                    <div class="column">
                      <NavItem to="/">C'est quoi un certificateur ?</NavItem>
                      <NavItem to="/">Pourquoi une certification ?</NavItem>
                      <NavItem to="/">Qui sont les points relais conseils ?</NavItem>
                    </div>
                  </div>

                </div>

                <div class="column">

                  <h1 class="title is-6 is-mega-menu-title">Autres outils</h1>
                  <NavItem to="/">Portail de la VAE</NavItem>
                  <NavItem to="/">France VAE</NavItem>
                  <NavItem to="/">Défi métiers</NavItem>

                </div>
                <div class="column">

                  <h1 class="title is-6 is-mega-menu-title">Aides et support</h1>
                  <NavItem to="/">Crisp</NavItem>
                  <NavItem to="/">Nous contacter</NavItem>

                </div>

              </div>
            </div>

            <!-- <hr class="navbar-divider">
            <div class="navbar-item">
              <div class="navbar-content">
                <div class="level is-mobile">
                  <div class="level-left">
                    <div class="level-item">
                      <strong>Stay up to date!</strong>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <a class="button bd-is-rss is-small" href="http://bulma.io/atom.xml">
                        <span class="icon is-small">
                          <i class="fa fa-rss"></i>
                        </span>
                        <span>Subscribe</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <div class="navbar-link" @click="isActive.profile = !isActive.profile">
            Marcel Delahouse
          </div>
          <div class="navbar-dropdown" :class="{ 'is-active': isActive.profile }">
            <NavItem to="/">Mon profil</NavItem>
            <NavItem to="/">Mes candidatures</NavItem>
            <hr class="navbar-divider">
            <NavItem to="/logout">Déconnexion</NavItem>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import NavItem from '~/components/navigation/NavItem.vue'
import RichNavItem from '~/components/navigation/RichNavItem.vue'
// code example https://codepen.io/hunzaboy/pen/yoPKQW

export default {
  components: {
    NavItem,
    RichNavItem
  },
  data(){
    return {
      toggle: false,
      isActive: {
        navigation: false,
        profile: false
      }
    }
  },
  mounted() {
  },
  methods: {
    toggleNav() {
      this.toggle ? this.toggle = false : this.toggle = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/all';
  @include mobile {
    .navbar-dropdown {
      display: none;
      &.is-active {
        display: block;
      }
    }
  }
  #blogDropdown {
    padding: 2rem 0;
    @include desktop {
      min-width: calc(100% - 15rem);
      margin-left: 15rem;
    }
  }
  .navbar{
    z-index: 90;
  }
  .navbar-brand {
    @include desktop {
      width: 15rem;
    }
  }
  .navbar-item.is-mega {
    position: static;

    .is-mega-menu-title {
      margin-bottom: 0;
      padding: .375rem 1rem;
    }
  }
</style>
