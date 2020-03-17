<template>
  <div class="candidature-detail">

    <!-- prochaine étape -->
    <NextStep
      next="Prochaine étape conseillée"
      time="20 à 30 minutes"
      title="Renseigner mon identité"
      paragraphe="Elle est obligatoire pour toute demande de recevabilité"
      illustration="man"
      button="Renseigner mon identité..."
    />

    <div class="candidature-composants">

      <div class="columns">
        <div class="column has-equal-height">

          <!-- identité -->
          <Identite/>
          <!-- Pour indiquer que l'identité est remplie -->
          <!-- <Identite v-bind:is-filled="true"/> -->

          <!-- synthèse -->
          <Synthese/>
          <!-- Pour indiquer que la synthèse est disponible -->
          <!-- <Synthese v-bind:is-locked="false"/> -->

        </div>
        <div class="column has-equal-height">
          <!-- recevabilité -->
          <Recevabilite/>
          <!-- <Recevabilite v-bind:is-filled="true"/> -->
          <!-- justificatifs -->
          <Justificatifs/>
          <!-- <Justificatifs v-bind:is-locked="false"/> -->
        </div>
        <div class="column has-equal-height">
          <!-- certificateur -->
          <Certificateur/>
          <!-- <Certificateur v-bind:is-filled="true"/> -->
        </div>
      </div>

    </div>

  </div>

</template>

<script>
  import {
    apiPath,
    fetchOrRedirectToSignIn,
  } from '../../utils/url';

  import NextStep from '~/components/candidature/NextStep.vue';
  import Identite from '~/components/candidature/Identite.vue';
  import Synthese from '~/components/candidature/Synthese.vue';
  import Recevabilite from '~/components/candidature/Recevabilite.vue';
  import Justificatifs from '~/components/candidature/Justificatifs.vue';
  import Certificateur from '~/components/candidature/Certificateur.vue';

  export default {
    components: {
      NextStep,
      Identite,
      Synthese,
      Recevabilite,
      Justificatifs,
      Certificateur,
    },
    props: {
      application: {}
    },
  }
</script>

<style scoped lang="scss">
  @import '~bulma/sass/utilities/all';

  .candidature-detail {
    background: #fff;
    border-radius: 6px;
    padding: .5rem;
    @include tablet {
      padding: 2rem;
    }
  }
</style>
