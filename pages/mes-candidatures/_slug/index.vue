<template>
  <div class="candidature-detail">
    <NextStep :application="application" />

    <div class="candidature-composants">
      <div class="columns">
        <div class="column has-equal-height">
          <!-- <Identite :is-filled="isProfileFilled" /> -->
          <LockableCard
            :is-filled="isProfileFilled"
            title="Mon identité"
            button="Renseigner mon identité"
            to="/mon-compte"
          >
            <p class="has-text-weight-bold">{{profile.firstNames}} {{profile.lastName}}</p>
            <Address :address="profile.address" />
          </LockableCard>
          <!-- <Synthese :is-locked="!isSynthesisUnlocked" /> -->
          <LockableCard
            :is-locked="!isSynthesisUnlocked"
            title="Ma synthèse"
            button="Télécharger"
            href="/synthese-vae"
            hasMultipleLayer
          >
            <p slot="help">Pour débloquer votre synthèse, vous devez choisir votre <nuxt-link :to="`/candidatures/${application.slug}/mon-certificateur`">certificateur</nuxt-link>.</p>
          </LockableCard>
        </div>
        <div class="column has-equal-height">
          <!-- <Recevabilite :is-filled="hasBookletFinished" :application="application"/> -->
          <LockableCard
            :is-filled="hasBookletFinished"
            title="Ma recevabilité"
            button="Compléter ma recevabilité"
            :href="application.bookletPath"
            hasMultipleLayer
          />
          <!-- <Justificatifs :is-locked="!isDocumentsUnlocked"/> -->
          <LockableCard
            :is-locked="!isDocumentsUnlocked"
            title="Mes justificatifs"
            button="Voir la liste"
            :to="`/applications/${application.slug}/mes-justificatifs`"
          >
            <p slot="help">Pour débloquer les justificatifs, vous devez remplir votre <a :href="application.bookletPath">recevabilité</a>.</p>
          </LockableCard>
        </div>
        <div class="column has-equal-height">
          <!-- <Certificateur :is-filled="hasDelegate"/> -->
          <LockableCard
            :is-filled="hasDelegate"
            title="Mon certificateur"
            button="Trouver mon certificateur"
            :to="`/applications/${application.slug}/mon-certificateur`"
          >
            <h3 class="title is-5" style="margin-bottom: 0.5rem;">{{application.delegate.name}}</h3>
            <div class="label-avril" v-if="application.delegate.hasMeetings"><strong>Réunion d'information disponible</strong></div>
            <Address :address="delegateAddress" />
          </LockableCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import get from 'lodash.get';
  import NextStep from '~/components/candidature/NextStep.vue';
  import Identite from '~/components/candidature/Identite.vue';
  import Synthese from '~/components/candidature/Synthese.vue';
  import Recevabilite from '~/components/candidature/Recevabilite.vue';
  import Justificatifs from '~/components/candidature/Justificatifs.vue';
  import Certificateur from '~/components/candidature/Certificateur.vue';

  import Address from '~/components/Address.vue';
  import LockableCard from '~/components/LockableCard.vue';

  import {hasDelegate, hasBookletFinished} from '~/utils/application';

  export default {
    components: {
      Address,
      NextStep,
      Identite,
      Synthese,
      Recevabilite,
      Justificatifs,
      Certificateur,
      LockableCard,
    },
    computed: {
      profile: function() {
        return this.$store.state.profile;
      },
      isProfileFilled: function() {
        return this.$store.getters['profile/isFilled'];
      },
      hasDelegate: function() {
        return hasDelegate(this.application);
      },
      isSynthesisUnlocked: function() {
        return this.isProfileFilled && this.hasDelegate;
      },
      hasBookletFinished: function() {
        return hasBookletFinished(this.application)
      },
      isDocumentsUnlocked: function() {
        return this.isSynthesisUnlocked && this.hasBookletFinished;
      },
      delegateAddress: function() {
        return get(this.application, 'delegate.address', {});
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
