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
        <div class="column">
          <!-- identité -->
          <Identite/>
          <!-- synthèse -->
          <Synthese/>
        </div>
        <div class="column">
          <!-- recevabilité -->
          <Recevabilite/>
          <!-- justificatifs -->
          <Justificatifs/>
        </div>
        <div class="column">
          <!-- certificateur -->
          <Certificateur/>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
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
  }
}
</script>
<style scoped>
.candidature-detail {
  background: #fff;
  border-radius: 6px;
  padding: 2rem
}
</style>
