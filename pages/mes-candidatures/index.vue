<template>
  <div>
    <h1 class="title is-1 is-spaced">Mes candidatures</h1>
    <div class="notification is-warning" v-if="applications.length >= 3">
      <p>
        Attention, vous avez initié ou transmis {{applications.length}} candidatures. La loi autorise la poursuite de 3 démarches VAE maximum par an, et ce sur des certifications différentes.
      </p>
    </div>
    <div v-if="!firstApplication">
      <p class="subtitle">Vous n'avez pas encore démarré de candidatures.</p>
      <a href="/" class="button is-rounded is-primary is-large">Chercher mon futur diplôme en VAE</a>
    </div>
    <ApplicationCard v-else :application="firstApplication" />
    <div class="columns is-multiline" v-if="otherApplications.length">
      <div class="column is-6 is-4-fullhd" v-for="application in otherApplications">
        <ApplicationCard size="small" :application="application" />
      </div>
    </div>
  </div>
</template>

<script>
  import {first} from 'avril/js/utils/array';
  import ApplicationCard from '~/components/ApplicationCard.vue'
  import BackButton from '~/components/BackButton.vue';
  import Message from '~/components/Message.vue'

  export default {
    computed: {
      hasIdentity() {
        return this.$store.getters['identity/isFilled'];
      },
      applications() {
        return this.$store.state.applications.applications;
      },
      firstApplication() {
        return first(this.applications);
      },
      otherApplications() {
        return this.applications.filter((a, i) => i);
      },
    },
    components: {
      ApplicationCard,
      BackButton,
      Message,
    },
  }
</script>