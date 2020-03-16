<template>
  <div class="container">
    <div class="avril-container">
      <h1 class="title is-1 has-text-centered">Mes VAE</h1>
      <ul>
        <li v-for="application in applications" style="margin-bottom: 2rem;">
          <div class="notification is-primary content">
            <nuxt-link :to="`/candidatures/${application.id}`"><h3 class="title is-3">{{application.certificationLabel}}</h3></nuxt-link>
            <p>VAE démarrée le {{formatDate(application.createdAt)}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '~/utils/time.js';

  export default {
    beforeCreate() {
      if (this.$store.state.applications.length == 1) {
        this.$router.push(`/candidatures/${this.$store.state.applications.first().id}`);
      }
    },
    layout: 'dashboard',
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
