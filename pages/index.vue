<template>
  <div>
    <h1 class="title is-1 is-spaced">Mon espace VAE</h1>
    <p class="subtitle">Pour le moment pas grand chose.</p>
    <nuxt-link to="/mes-candidatures" class="button is-primary is-rounded is-medium">Voir mes {{applications.length}} candidatures</nuxt-link>
  </div>
</template>

<script>
  import {formatDate} from '~/utils/time.js';

  export default {
    // beforeCreate() {
    //   if (this.$store.state.applications.length == 1) {
    //     this.$router.push(`/candidatures/${this.$store.state.applications.first().id}`);
    //   }
    // },
    computed: {
      applications() {
        return this.$store.state.applications
      },
    },
    components: {
    },
    methods: {
      formatDate,
    },
  }
</script>
