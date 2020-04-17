<template>
  <div>
    <MeetingSelector :application="application" :meetings="meetings" />
    <header class="candidature">
      <div class="level">

        <div class="level-left has-text-left">
          <div class="level-item">
            <div>
              <h1 class="title is-2">{{certificationName}}</h1>
              <div class="label-avril">Équivalence {{levelLabel}}</div>
            </div>
          </div>
        </div>

        <div class="level-right">
          <span class="tag is-info">à compléter</span>
        </div>
      </div>
    </header>
    <div class="candidature-detail">
      <NextStep :application="application" />

      <div class="candidature-composants">
        <div class="columns">
          <div class="column has-equal-height">
            <LockableCard
              :is-filled="isIdentityFilled"
              title="Mon identité"
              button="Renseigner mon identité"
              to="/mon-compte"
            >
              <p class="has-text-weight-bold">{{identity.firstName}} {{identity.lastName}}</p>
              <Address :address="identity.fullAddress" />
            </LockableCard>
            <LockableCard
              :is-locked="!isSynthesisUnlocked"
              title="Ma synthèse"
              button="Télécharger"
              href="/synthese-vae"
              hasMultipleLayer
            >
              <p slot="help">Pour débloquer votre synthèse, vous devez choisir votre <nuxt-link :to="`${applicationPath}/mon-certificateur`">certificateur</nuxt-link>.</p>
            </LockableCard>
          </div>
          <div class="column has-equal-height">
            <LockableCard
              :is-filled="hasBookletFinished"
              title="Ma recevabilité"
              button="Compléter ma recevabilité"
              :href="bookletPath"
              hasMultipleLayer
            />
            <LockableCard
              :is-locked="!isDocumentsUnlocked"
              title="Mes justificatifs"
              button="Voir la liste"
              :to="`${applicationPath}/mes-justificatifs`"
            >
              <p slot="help">Pour débloquer les justificatifs, vous devez remplir votre <a :href="bookletPath">recevabilité</a>.</p>
            </LockableCard>
          </div>
          <div class="column has-equal-height">
            <LockableCard
              :is-filled="hasDelegate"
              title="Mon certificateur"
              button="Trouver mon certificateur"
              :to="`${applicationPath}/mon-certificateur`"
            >
              <h3 class="title is-5" style="margin-bottom: 0.5rem;">{{delegateName}}</h3>
              <Address :address="delegateAddress" />
            </LockableCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import get from 'lodash.get';

  import NextStep from '~/components/application/NextStep.vue';
  import MeetingSelector from '~/components/application/MeetingSelector.vue';
  import Address from '~/components/Address.vue';
  import LockableCard from '~/components/LockableCard.vue';

  import {hasDelegate, hasBookletFinished, bookletPath, path} from '~/utils/application';
  import {name, levelToLevelLabel} from '~/utils/certification';

  import { queryApi, mutateApi } from '~/utils/api';

  export default {
    components: {
      Address,
      MeetingSelector,
      NextStep,
      LockableCard,
    },
    computed: {
      identity: function() {
        return this.$store.state.identity;
      },
      applicationPath: function() {
        return path(this.application);
      },
      isIdentityFilled: function() {
        return this.$store.getters['identity/isFilled'];
      },
      hasDelegate: function() {
        return hasDelegate(this.application);
      },
      isSynthesisUnlocked: function() {
        return this.isIdentityFilled && this.hasDelegate;
      },
      hasBookletFinished: function() {
        return hasBookletFinished(this.application)
      },
      isDocumentsUnlocked: function() {
        return this.isSynthesisUnlocked && this.hasBookletFinished;
      },
      delegateName: function() {
        return get(this.application, 'delegate.name');
      },
      delegateAddress: function() {
        return get(this.application, 'delegate.address', {});
      },
      bookletPath: function() {
        return bookletPath(this.application);
      },
      certificationName: function() {
        return name(this.application.certification);
      },
      levelLabel: function() {
        return levelToLevelLabel(this.application.certification.level);
      }
    },
    data: function() {
      return {
        meetings: [],
      }
    },
    asyncData: async function(context) {
      const {store, params} = context;
      const application = store.state.applications.find(a => a.certification.slug === params.slug);
      const delegate_id = get(application, 'delegate.id');
      try {
        const meetings = delegate_id ? await queryApi({
          name: 'meetings',
          params: {
            delegate_id,
          },
        }, context) : [];

        return {
          meetings,
        }
      } catch(err) {
        console.error('Could not fetch meetings', err)
        return {
          meetings: []
        }
      }
    },
    props: {
      application: {
        type: Object
      }
    },
  }
</script>

<style scoped lang="scss">
  @import '~/assets/scss/variables';
  // @import '~bulma/sass/utilities/all';

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

  .candidature {
    margin-bottom: 2rem
  }
  .level-item {
    justify-content: flex-start
  }
</style>
