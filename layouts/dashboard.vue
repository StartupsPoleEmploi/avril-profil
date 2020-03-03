<template>
  <div id="profil-avril">
    <NavigationDashboard />
    <Header />
    <nuxt />
  </div>
</template>
<script>
import NavigationDashboard from '~/components/Navigation-Dashboard.vue'
import Header from '~/components/Header.vue'

export default {
  components: {
    NavigationDashboard,
    Header,
  }
}
</script>
