<template>
  <div>
    <BackButton label="Mon espace" to="/" />
    <div class="identite">
      <div class="columns">
        <div class="column is-8">
          <h1 class="title h1 is-spaced">Mes rendez-vous</h1>
          <p class="subtitle">
            Participez à une réunion d'information sur la VAE.
          </p>

          <div class="contents">
            <p>Vous ne vous êtes inscrit à aucune réunion d'information pour le moment.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BackButton from '~/components/BackButton.vue'

  export default {
    computed: {
    },
    components: {
      BackButton,
    },
  }
</script>
