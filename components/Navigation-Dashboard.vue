<template>
  <aside class="dashboard-navigation">

    <header class="dashboard-navigation-header">
      <div class="dashboard-navigation-tools-label">
        <AvrilLogo/>
      </div>
    </header>

    <aside class="menu">
      <ul class="menu-list">
        <li><a>Dashboard</a></li>
        <li><a>Customers</a></li>
      </ul>
    </aside>

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
