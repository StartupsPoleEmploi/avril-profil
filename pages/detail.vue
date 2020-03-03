<template>
  <div class="container">
    <div class="avril-container">
      <CandidatureHeader/>
      <CandidatureDetail/>
    </div>
  </div>
</template>

<script>
import CandidatureHeader from '~/components/candidature/Header.vue'
import CandidatureDetail from '~/components/candidature/Detail.vue'

export default {
  layout: 'dashboard',
  components: {
    CandidatureHeader,
    CandidatureDetail
  }
}
</script>

<style>

</style>
