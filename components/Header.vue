<template>
  <nav class="navbar is-fixed-top">
    <div class="navbar-brand">
      <AvrilLogo/>
      <div class="navbar-burger burger" @click="toggle = !toggle" :class="{ 'is-active': toggle }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': toggle }" @click="closeNavOnItem">

      <div class="navbar-end">

        <NavItem href="/vae">C'est quoi la VAE ?</NavItem>

        <div class="navbar-item has-dropdown is-hoverable is-mega">
          <div class="navbar-link" @click="isActive.navigation = !isActive.navigation">
            Navigation
          </div>
          <div class="navbar-dropdown is-mega-dropdown" :class="{ 'is-active': isActive.navigation }">
            <div class="container is-fluid">
              <div class="columns">
                <div class="column is-4 has-equal-height">
                  <article class="card">
                    <a class="card-content" href="/bien-choisir-son-diplome-vae">
                      <h3 class="title is-5">Bien choisir un diplôme</h3>
                      <p>Parce que le choix doit être une évidence, nous vous donnons des conseils pour un meilleur résultat</p>
                    </a>
                  </article>
                </div>
                <div class="column is-4 has-equal-height">
                  <article class="card">
                    <a class="card-content" href="/financement-vae">
                      <h3 class="title is-5">Financer ma VAE</h3>
                      <p>Parce que le choix doit être une évidence, nous vous donnons des conseils pour un meilleur résultat</p>
                    </a>
                  </article>
                </div>
                <div class="column is-4 has-equal-height">
                  <article class="card">
                    <a class="card-content" href="/">
                      <h3 class="title is-5">Bien choisir son accompagnateur</h3>
                      <p>Parce que le choix doit être une évidence, nous vous donnons des conseils pour un meilleur résultat</p>
                    </a>
                  </article>
                </div>
              </div>
            </div>
            <div class="container is-fluid">
              <div class="columns is-multiline">

                <div class="column">
                  <h3 class="title is-6 is-mega-menu-title">Notions essentielles</h3>
                  <div class="columns">
                    <div class="column">
                      <NavItem href="/vae">C'est quoi la VAE ?</NavItem>
                      <NavItem href="/bien-choisir-son-diplome-vae">Bien choisir son diplôme</NavItem>
                      <NavItem href="/financement-vae">Comment financer ma VAE ?</NavItem>
                    </div>
                    <div class="column">
                      <NavItem href="/certificateur-vae-definition">C'est quoi un certificateur ?</NavItem>
                      <NavItem href="/pourquoi-une-certification">Pourquoi une certification ?</NavItem>
                      <NavItem href="/point-relais-conseil-vae">Qui sont les points relais conseils ?</NavItem>
                    </div>
                  </div>
                </div>

                <div class="column">
                  <div class="columns">
                    <div class="column">
                      <h3 class="title is-6 is-mega-menu-title">Autres outils</h3>
                      <NavItem href="http://www.vae.gouv.fr">Portail de la VAE</NavItem>
                      <NavItem href="https://www.francevae.fr">France VAE</NavItem>
                      <NavItem href="https://www.defi-metiers.fr/dossiers/vae-mode-demploi">Défi métiers</NavItem>
                    </div>
                    <div class="column">
                      <h3 class="title is-6 is-mega-menu-title">Aides et support</h3>
                      <NavItem to="/">Crisp</NavItem>
                      <NavItem href="/contact">Nous contacter</NavItem>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <div class="navbar-link" @click="isActive.profile = !isActive.profile">
            <span class="tag is-danger is-rounded" v-if="unfinishedApplicationsLength">{{unfinishedApplicationsLength}}</span> {{username}}
          </div>
          <div class="navbar-dropdown is-right" :class="{ 'is-active': isActive.profile }">
            <NavItem to="/">Mon espace VAE</NavItem>
            <NavItem to="/mon-compte">Mon compte</NavItem>
            <NavItem to="/mes-candidatures">
              <span class="tag is-danger is-rounded" v-if="unfinishedApplicationsLength">{{unfinishedApplicationsLength}}</span>
              Mes candidatures
            </NavItem>
            <NavItem to="/mes-rendez-vous">Mes rendez-vous</NavItem>
            <hr class="navbar-divider">
            <NavItem href="/sessions">Déconnexion</NavItem>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import AvrilLogo from '~/components/navigation/AvrilLogo';
  import NavItem from '~/components/navigation/NavItem.vue'
  import RichNavItem from '~/components/navigation/RichNavItem.vue'
  // code example https://codepen.io/hunzaboy/pen/yoPKQW

  export default {
    components: {
      AvrilLogo,
      NavItem,
      RichNavItem,
    },
    computed: {
      username() {
        return this.$store.getters['identity/username'];
      },
      unfinishedApplicationsLength() {
        return this.$store.getters['applications/unfinishedApplications'].length;
      },
    },
    data(){
      return {
        toggle: false,
        isActive: {
          navigation: false,
          profile: false,
        }
      }
    },
    methods: {
      closeNavOnItem: function(e) {
        if (e.target.tagName === 'A') {
          this.toggle = false;
        }
      },
      toggleNav: function(e) {
        this.toggle = !this.toggle;
      }
    }
  }
</script>

<style lang="scss" scoped>

  @import '~avril/scss/variables';

  .navbar-dropdown{
    border: none;
    background: #fff;
    font-size: inherit;

    display: none;
    &.is-active {
      display: block;
    }
  }
  .navbar-burger:hover {
    background: transparent;
  }

  .navbar-brand {
    @include desktop {
      width: $dashboard-navigation-width;
    }
  }
  .navbar-item::v-deep {
    a {
      display: block !important;
      &.is-active {
        font-weight: bold;
      }
    }

    &.is-mega {
      position: static;

      .is-mega-menu-title {
        margin-bottom: 0;
        padding: .375rem 1rem;
      }
    }
    .navbar-link {
      .tag {
        margin-right: 10px
      }
      &:after {
        border-color: $primary;
      }
    }


  }

  .is-mega-dropdown {
    padding: 2rem 0;
    @include desktop {
      padding-left: $dashboard-navigation-width;
      width: 100%;
    }

    .container:not(:last-child) {
      padding-bottom: 2rem;
    }

    .card{
      background: #fff;
      display: flex;
      height: 100%;
    }

    @include tablet {
      .has-equal-height {
        min-height: 200px;
      }
    }
  }
</style>
