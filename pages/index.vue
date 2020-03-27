<template>
  <div>
    <h1 class="title is-1 is-spaced">Mon espace VAE</h1>
    <p class="subtitle">Pour le moment pas grand chose.</p>
    <nuxt-link to="/mes-candidatures" class="button is-primary is-rounded is-medium">Voir mes {{applications.length}} candidatures</nuxt-link>
  </div>
</template>

<script>
  export default {
    computed: {
      applications() {
        return this.$store.state.applications
      },
    },
    mounted() {
      if (this.applications.length === 1) {
        return this.$router.push({
            path: `/mes-candidatures/${this.applications[0].slug}`
        })
      }
    },
  }
</script>
