<template>
  <div>
    <MeetingSelector v-if="!application.meeting" :application="application" :meetings="meetings" />
    <header class="application-header">
      <ApplicationTag :application="application" />
      <h1 class="title is-2">{{certificationName}}</h1>
      <div class="label-avril">Équivalence {{levelLabel}}</div>
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
              title="Synthèse VAE"
              button="Voir les étapes"
              href="/synthese-vae"
              target="_blank"
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
            >
              <p v-if="bookletStatus">{{bookletStatus}}</p>
            </LockableCard>
            <LockableCard
              :is-locked="!isResumesUnlocked"
              :is-filled="hasResumes"
              title="Mes justificatifs"
              button="Voir la liste"
              :to="`${applicationPath}/mes-justificatifs`"
            >
              <div class="content">
                <ul>
                  <li v-for="resume in application.resumes" :key="resume.id">{{resume.filename}}</li>
                </ul>
              </div>
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
              <p class="has-text-weight-bold">{{delegateName}}</p>
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
  import { queryApiWithContext } from 'avril/js/utils/api';
  import { parseAndFormat } from 'avril/js/utils/time';

  import NextStep from '~/components/application/NextStep.vue';
  import MeetingSelector from '~/components/application/MeetingSelector.vue';
  import Address from '~/components/Address.vue';
  import LockableCard from '~/components/LockableCard.vue';
  import ApplicationTag from '~/components/ApplicationTag.vue';

  import {hasDelegate, hasBookletFinished, hasResumes, bookletPath, path} from '~/utils/application';
  import {name, levelToLevelLabel} from '~/utils/certification';


  export default {
    components: {
      ApplicationTag,
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
      hasResumes: function() {
        return hasResumes(this.application);
      },
      isSynthesisUnlocked: function() {
        return this.isIdentityFilled && this.hasDelegate;
      },
      hasBookletFinished: function() {
        return hasBookletFinished(this.application)
      },
      bookletStatus: function() {
        if (get(this.application, 'booklet_1.completedAt'))
          return `Complétée le ${parseAndFormat(this.application.booklet_1.completedAt)}.`;
        if (get(this.application, 'booklet_1.insertedAt'))
          return `Démarrée le ${parseAndFormat(this.application.booklet_1.insertedAt)}.`;
      },
      isResumesUnlocked: function() {
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
        const meetings = delegate_id ? await queryApiWithContext(context)({
          name: 'meetings',
          type: 'meetingList',
          params: {
            delegate_id,
          },
        }) : [];

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
        type: Object,
        isRequired: true,
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~avril/scss/variables';

  .candidature-detail {
    background: $white;
    border-radius: $radius;
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
