<template>
  <div class="candidature-detail">

    <!-- prochaine étape -->
    <NextStep :application="application" />

    <div class="candidature-composants">

      <div class="columns">
        <div class="column has-equal-height">

          <!-- identité -->
          <Identite :is-filled="profile.birthdate" />
          <!-- Pour indiquer que l'identité est remplie -->
          <!-- <Identite v-bind:is-filled="true"/> -->

          <!-- synthèse -->
          <Synthese/>
          <!-- Pour indiquer que la synthèse est disponible -->
          <!-- <Synthese v-bind:is-locked="false"/> -->

        </div>
        <div class="column has-equal-height">
          <!-- recevabilité -->
          <Recevabilite :application="application"/>
          <!-- <Recevabilite v-bind:is-filled="true"/> -->
          <!-- justificatifs -->
          <Justificatifs/>
          <!-- <Justificatifs v-bind:is-locked="false"/> -->
        </div>
        <div class="column has-equal-height">
          <!-- certificateur -->
          <Certificateur :is-filled="delegate"/>
          <!-- <Certificateur v-bind:is-filled="true"/> -->
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
    },
    computed: {
      profile: function() {
        return this.$store.state.profile
      },
      delegate: function() {
        console.log(this.application)
      },
    },
    props: {
      application: {
        type: Object
      }
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
  @media screen and (max-width: 1288px){
    .columns {
      display: block;
    }
    .has-equal-height {
      min-height: auto;
    }
  }
</style>
