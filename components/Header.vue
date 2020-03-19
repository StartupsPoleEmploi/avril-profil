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
        <div class="navbar-item">
          <a href="#">C'est quoi la VAE ?</a>
        </div>
        <div class="navbar-item has-dropdown is-hoverable is-mega">
          <div class="navbar-link">
            Navigation
          </div>
          <div id="blogDropdown" class="navbar-dropdown">
            <div class="container is-fluid">
              <div class="columns">
                <div class="column">
                  <h1 class="title is-6 is-mega-menu-title">Sub Menu Title</h1>
                  <a class="navbar-item" href="/2017/08/03/list-of-tags/">
                    <div class="navbar-content">
                      <p>
                        <small class="has-text-info">03 Aug 2017</small>
                      </p>
                      <p>New feature: list of tags</p>
                    </div>
                  </a>
                  <a class="navbar-item" href="/2017/08/03/list-of-tags/">
                    <div class="navbar-content">
                      <p>
                        <small class="has-text-info">03 Aug 2017</small>
                      </p>
                      <p>New feature: list of tags</p>
                    </div>
                  </a>
                  <a class="navbar-item" href="/2017/08/03/list-of-tags/">
                    <div class="navbar-content">
                      <p>
                        <small class="has-text-info">03 Aug 2017</small>
                      </p>
                      <p>New feature: list of tags</p>
                    </div>
                  </a>
                </div>
                <div class="column">
                  <h1 class="title is-6 is-mega-menu-title">Sub Menu Title</h1>
                  <a class="navbar-item" href="/2017/08/03/list-of-tags/">
                    <div class="navbar-content">
                      <p>
                        <small class="has-text-info">03 Aug 2017</small>
                      </p>
                      <p>New feature: list of tags</p>
                    </div>
                  </a>
                  <a class="navbar-item " href="/documentation/overview/start/">
                    Overview
                  </a>
                  <a class="navbar-item " href="http://bulma.io/documentation/modifiers/syntax/">
                    Modifiers
                  </a>
                  <a class="navbar-item " href="http://bulma.io/documentation/columns/basics/">
                    Columns
                  </a>
                </div>
                <div class="column">
                  <h1 class="title is-6 is-mega-menu-title">Sub Menu Title</h1>
                  <a class="navbar-item" href="/2017/08/03/list-of-tags/">
                    <div class="navbar-content">
                      <p>
                        <small class="has-text-info">03 Aug 2017</small>
                      </p>
                      <p>New feature: list of tags</p>
                    </div>
                  </a>
                  <a class="navbar-item" href="/2017/08/03/list-of-tags/">
                    <div class="navbar-content">
                      <p>
                        <small class="has-text-info">03 Aug 2017</small>
                      </p>
                      <p>New feature: list of tags</p>
                    </div>
                  </a>
                  <a class="navbar-item" href="/2017/08/03/list-of-tags/">
                    <div class="navbar-content">
                      <p>
                        <small class="has-text-info">03 Aug 2017</small>
                      </p>
                      <p>New feature: list of tags</p>
                    </div>
                  </a>

                </div>
                <div class="column">
                  <h1 class="title is-6 is-mega-menu-title">Sub Menu Title</h1>
                  <a class="navbar-item " href="/documentation/overview/start/">
                    Overview
                  </a>
                  <a class="navbar-item " href="http://bulma.io/documentation/modifiers/syntax/">
                    Modifiers
                  </a>
                  <a class="navbar-item " href="http://bulma.io/documentation/columns/basics/">
                    Columns
                  </a>
                  <a class="navbar-item " href="http://bulma.io/documentation/layout/container/">
                    Layout
                  </a>
                </div>
              </div>
            </div>

            <hr class="navbar-divider">
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
            </div>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link  is-active" href="/documentation/overview/start/">
            Marcel Delahouse
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item " href="/documentation/overview/start/">
              Mon profil
            </a>
            <a class="navbar-item " href="/documentation/overview/start/">
              Mes VAE
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item " href="http://bulma.io/documentation/modifiers/syntax/">
              Déconnexion
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// code example https://codepen.io/hunzaboy/pen/yoPKQW
export default {
  data(){
    return {
      toggle: true
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
#blogDropdown {
  min-width: calc(100% - 15rem);
  margin-left: 15rem;
}
.navbar{
  z-index: 90;
}
.navbar-brand {
  width: 15rem;
}
.navbar-item.is-mega {
  position: static;

  .is-mega-menu-title {
    margin-bottom: 0;
    padding: .375rem 1rem;
  }
}
</style>
