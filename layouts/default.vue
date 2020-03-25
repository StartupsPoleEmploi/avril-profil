<template>
  <div class="">
    <Header/>
    <div id="profil-avril">
      <NavigationDashboard />
      <div class="container avril-container">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import NavigationDashboard from '~/components/Navigation-Dashboard.vue'
import Header from '~/components/Header.vue'

export default {
  components: {
    NavigationDashboard,
    Header
  }
}
</script>
