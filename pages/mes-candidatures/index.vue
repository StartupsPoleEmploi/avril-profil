<template>
  <div>
    <!-- <BackButton label="Mon espace" to="/" /> -->
    <h1 class="title is-1 is-spaced">Mes candidatures</h1>
    <!-- <Message v-if="!hasIdentity" type="success" size="large">
      <h3 class="title is-4">Renseigner votre identité est obligatoire pour toutes vos candidatures</h3>
      <nuxt-link to="/mon-compte" class="button is-success is-inverted is-rounded">Renseigner mon identité</nuxt-link>
    </Message> -->
    <div v-if="!firstApplication">
      <p class="subtitle">Vous n'avez pas encore démarré de candidatures.</p>
      <a href="/" class="button is-rounded is-primary is-large">Chercher mon futur diplôme en VAE</a>
    </div>
    <ApplicationCard v-else :application="firstApplication" />
    <div class="columns is-multiline" v-if="otherApplications.length">
      <div class="column" v-for="application in otherApplications">
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
        return this.$store.state.applications;
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