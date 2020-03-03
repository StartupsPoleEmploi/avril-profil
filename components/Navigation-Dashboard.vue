<template>
  <aside class="dashboard-navigation">

    <header class="dashboard-navigation-header">
      <div class="dashboard-navigation-tools-label">
        <AvrilLogo/>
      </div>
    </header>

    <div class="dashboard-navigation-container">
      <div class="menu is-menu-main">

        <ul class="menu-list">
          <li class="">
            <a title="Login">
              <span class="menu-item-label">Login</span>
            </a>
          </li>
          <li class="">
            <a title="Error v.1">
              <span class="menu-item-label">Error v.1</span>
            </a>
          </li>
          <li class="">
            <a title="Error v.2">
              <span class="menu-item-label">Error v.2</span>
            </a>
          </li>
        </ul>

      </div>
    </div>

    <div class="menu is-menu-bottom">
      <ul class="menu-list">
        <li class="">
          <a title="Log out" exact-active-class="is-active" class="has-icon is-state-info is-hoverable"><span class="icon"><i class="mdi mdi-logout default"></i></span>
            <span class="menu-item-label">Log out</span>
          </a>
        </li>
      </ul>
    </div>

  </aside>
</template>
<script>
import AvrilLogo from '~/assets/images/avril-logo.svg';

export default {
  components: {
    AvrilLogo,
  }
}
</script>

<style scoped>
.dashboard-navigation-header {
  padding-left: 1rem;
  padding-top: 1rem
}
</style>
