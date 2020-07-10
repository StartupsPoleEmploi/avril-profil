<template>
  <div>
    <MeetingSelector v-if="!application.meeting && meetings.length" :application="application" :meetings="meetings" />
    <header class="application-header">
      <ApplicationTag :application="application" />
      <h1 class="title is-2">{{certificationName}}</h1>
      <div class="label-avril">Équivalence {{certificationLevel}}</div>
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
              <div v-if="bookletCompletedAt">
                <p>
                  Complétée le {{parseAndFormat(bookletCompletedAt)}} :
                  <a :href="cerfaPath" class="button is-rounded is-text" style="vertical-align: baseline;" target="_blank">Voir le CERFA</a>
                </p>
              </div>
              <p v-else-if="bookletInsertedAt">Démarée le {{parseAndFormat(bookletInsertedAt)}}.</p>
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
              <p slot="help">
                <span v-if="hasDelegate">Pour débloquer les justificatifs, vous devez remplir votre <a :href="bookletPath">recevabilité</a>.</span>
                <span v-else>Pour débloquer votre synthèse, vous devez choisir votre <nuxt-link :to="`${applicationPath}/mon-certificateur`">certificateur</nuxt-link>.</span>
              </p>
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
              <p v-if="delegateEmail"><a :href="`mailto:${delegateEmail}`">{{delegateEmail}}</a></p>
              <p v-if="delegatePhone"><a :href="`tel:${delegatePhone}`">{{delegatePhone}}</a></p>
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

  import {
    hasDelegate,
    hasBookletFinished,
    hasResumes,
    bookletPath,
    avrilPath,
    path,
    delegateName,
    delegateAddress,
    delegatePhone,
    delegateEmail,
    certificationName,
    certificationLevel,
    currentApplication,
  } from '~/utils/application';

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
      bookletInsertedAt: function() {
        return get(this.application, 'booklet_1.insertedAt');
      },
      bookletCompletedAt: function() {
        return get(this.application, 'booklet_1.completedAt');
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
        return delegateName(this.application);
      },
      delegateAddress: function() {
        return delegateAddress(this.application);
      },
      delegatePhone: function() {
        return delegatePhone(this.application);
      },
      delegateEmail: function() {
        return delegateEmail(this.application);
      },
      bookletPath: function() {
        return bookletPath(this.application);
      },
      cerfaPath: function() {
        return avrilPath(this.application, '/cerfa');
      },
      certificationName: function() {
        return certificationName(this.application);
      },
      certificationLevel: function() {
        return certificationLevel(this.application);
      }
    },
    data: function() {
      return {
        meetings: [],
      }
    },
    methods: {
      parseAndFormat,
    },
    // asyncData: async function(context) {
    //   const {store, params} = context;
    //   const application = currentApplication(store.state.applications, params.slug);
    //   const delegate_id = get(application, 'delegate.id');
    //   if (!delegate_id) return {meetings: []};
    //   return {meetings: []}
    //   try {
    //     const meetings = await queryApiWithContext(context)({
    //       name: 'meetings',
    //       type: 'meetingList',
    //       params: {
    //         delegate_id,
    //       },
    //     });

    //     return {
    //       meetings,
    //     }
    //   } catch(err) {
    //     console.error('Could not fetch meetings', err)
    //     return {
    //       meetings: []
    //     }
    //   }
    // },
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
