<template>
  <div class="container">
    <div class="avril-container">
      <CandidatureHeader/>
      <CandidatureDetail/>
    </div>
  </div>
</template>

<script>
  import {
    apiPath,
    fetchOrRedirectToSignIn,
  } from '../../utils/url';

  export default {
    async asyncData ({ req, route, params, error }) {
      return await fetchOrRedirectToSignIn(apiPath('application', params), req)
    }
  }
</script>