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

        <NavItem href="/vae">C'est quoi la VAE ?</NavItem>

        <div class="navbar-item has-dropdown is-hoverable is-mega">
          <div class="navbar-link" @click="isActive.navigation = !isActive.navigation">
            Navigation
          </div>
          <div id="blogDropdown" class="navbar-dropdown" :class="{ 'is-active': isActive.navigation }">
            <div class="container is-fluid">
              <div class="columns">
                <div class="column has-equal-height">
                  <article class="card">
                    <a class="card-content" href="/bien-choisir-son-diplome-vae">
                      <h3 class="title is-5">Bien choisir un diplôme</h3>
                      <p>Parce que le choix doit être une évidence, nous vous donnons des conseils pour un meilleur résultat</p>
                    </a>
                  </article>
                </div>
                <div class="column has-equal-height">
                  <article class="card">
                    <a class="card-content" to="/financement-vae">
                      <h3 class="title is-5">Financer ma VAE</h3>
                      <p>Parce que le choix doit être une évidence, nous vous donnons des conseils pour un meilleur résultat</p>
                    </a>
                  </article>
                </div>
                <div class="column has-equal-height">
                  <article class="card">
                    <a class="card-content" to="/">
                      <h3 class="title is-5">Bien choisir son accompagnateur</h3>
                      <p>Parce que le choix doit être une évidence, nous vous donnons des conseils pour un meilleur résultat</p>
                    </a>
                  </article>
                </div>
              </div>
            </div>
            <div class="container is-fluid">
              <div class="columns">

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
            <span class="tag is-danger is-rounded">1</span> {{username}}
          </div>
          <div class="navbar-dropdown" :class="{ 'is-active': isActive.profile }">
            <NavItem to="/mon-identite">Mon compte</NavItem>
            <NavItem to="/mes-candidatures"><span class="tag is-danger is-rounded">1</span> Mes candidatures</NavItem>
            <hr class="navbar-divider">
            <NavItem href="/sessions">Déconnexion</NavItem>
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
  computed: {
    username() {
      return this.$store.getters['profile/username']
    },
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
    &-link .tag{
      margin-right: 10px
    }
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
  #blogDropdown .card{
    background: #fff;
  }

  #blogDropdown .has-equal-height .card {
    @include tablet {
      display: flex;
      flex-direction: column;
      min-height: 200px;
    }
  }
  #blogDropdown > .container > .columns{
    padding-bottom: 2rem;
  }
  #blogDropdown .column {
    @include tablet {
      display: flex;
      flex-direction: column;
      min-height: auto;
    }
  }

  @media screen and (max-width: 1288px){
    #blogDropdown .columns {
      display: block;
    }
    #blogDropdown .has-equal-height .card {
      min-height: auto;
    }
  }
</style>
