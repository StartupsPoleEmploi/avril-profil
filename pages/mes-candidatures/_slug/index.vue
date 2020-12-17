<template>
  <div>
    <MeetingSelector :application="application" />
    <header class="application-header">
      <ApplicationTag :application="application" />
      <h1 class="title is-2">{{certificationName}}</h1>
      <div class="label-avril">Niveau {{certificationLevel}}</div>
    </header>
    <p v-if="!isCertificationActive" class="notification is-warning content">
      Le diplôme que vous avez sélectionné n'est plus actif. Nous vous invitons à
      <a :href="`/diplomes/${certificationId}`">sélectionner un nouveau diplôme similaire</a> ou
      <a href="/">effectuer une nouvelle recherche</a>
      pour démarrer une nouvelle candidature. Vous pouvez ensuite <a @click="deleteApplication">supprimer</a> celle-ci si vous le souhaitez.
    </p>
    <div class="candidature-detail">
      <NextStep v-if="isCertificationActive" :application="application" />

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
                  <a :href="cerfaPath" class="button is-rounded is-text" style="vertical-align: baseline;">Voir le CERFA</a>
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
              :is-read-only="isFilled"
              title="Mon certificateur"
              button="Trouver mon certificateur"
              :to="`${applicationPath}/mon-certificateur`"
            >
              <p class="has-text-weight-bold">{{delegateName}}</p>
              <Address :address="delegateAddress" />
              <p v-if="delegateEmail"><a :href="`mailto:${delegateEmail}`">{{delegateEmail}}</a></p>
              <p v-if="delegatePhone"><a :href="`tel:${delegatePhone}`">{{delegatePhone}}</a></p>
            </LockableCard>
            <LockableCard
              v-if="isAfpa"
              :is-locked="!isFilled"
              title="Ma réunion d'information"
              button="Voir les réunions VAE AFPA"
              target="_blank"
              analytics="reunion#afpa"
              href="https://www.afpa.fr/agenda?_rechercheevenementportlet_WAR_rechercheportlet_INSTANCE_4ONof6W5P5AJ_formDate=1599641591738&p_p_id=101_INSTANCE_agenda&_101_INSTANCE_agenda_afpa_ddm__22997__DateDebut_en_US=09%2F09%2F2020&_101_INSTANCE_agenda_afpa_ddm__22997__DateFin_en_US=&_101_INSTANCE_agenda_afpa_ddmStructureKey=EVENEMENT&_101_INSTANCE_agenda_categoryId=58334180&_101_INSTANCE_agenda_categoryId=&_rechercheevenementportlet_WAR_rechercheportlet_INSTANCE_4ONof6W5P5AJ_typeEvenement=58334180&_rechercheevenementportlet_WAR_rechercheportlet_INSTANCE_4ONof6W5P5AJ_region=&_rechercheevenementportlet_WAR_rechercheportlet_INSTANCE_4ONof6W5P5AJ_ville=&_rechercheevenementportlet_WAR_rechercheportlet_INSTANCE_4ONof6W5P5AJ_dateDebut=&_rechercheevenementportlet_WAR_rechercheportlet_INSTANCE_4ONof6W5P5AJ_dateFin="
            >
              <p slot="help">Pour voir les réunions d'information, vous devez transmettre votre candidature.</p>
            </LockableCard>
          </div>
        </div>
      </div>
      <div class="has-text-centered content" v-if="!application.submittedAt">
        <p><button class="button is-text is-small is-rounded" @click="toggleShowDelete">Cette candidature n'est plus d'actualité ?</button></p>
        <p><button v-if="showDelete" class="button is-rounded is-small is-danger" @click="deleteApplication">Supprimer ma candidature</button></p>
      </div>
    </div>
  </div>
</template>

<script>
  import get from 'lodash.get';
  import { parseAndFormat } from 'avril/js/utils/time';
  import { mutateApi } from 'avril/js/utils/api';

  import NextStep from '~/components/application/NextStep.vue';
  import MeetingSelector from '~/components/application/MeetingSelector.vue';
  import Address from '~/components/Address.vue';
  import Message from '~/components/Message.vue';
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
    certificationId,
    isCertificationActive,
    certificationLevel,
    currentApplication,
    isAfpa,
    isFilled,
  } from '~/utils/application';

  export default {
    components: {
      ApplicationTag,
      Address,
      MeetingSelector,
      NextStep,
      LockableCard,
      Message,
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
      isAfpa: function() {
        return isAfpa(this.application);
      },
      isFilled: function() {
        return isFilled(this.application);
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
      certificationId: function() {
        return certificationId(this.application);
      },
      certificationName: function() {
        return certificationName(this.application);
      },
      certificationLevel: function() {
        return certificationLevel(this.application);
      },
      isCertificationActive: function() {
        return isCertificationActive(this.application);
      }
    },
    data: function(){
      return {
        showDelete: false,
      }
    },
    methods: {
      parseAndFormat,
      toggleShowDelete: function() {
        this.showDelete = !this.showDelete;
      },
      deleteApplication: function() {
        if (window.confirm(`Confirmez-vous la suppression de votre candidature au ${this.certificationName} et toutes ses données associées ?`)) {
          this.$once('hook:destroyed', async () => {
            try {
              const remainingApplications = await mutateApi({
                name: 'deleteApplication',
                params: {
                  id: this.application.id,
                },
                type: 'application',
              });
              this.$store.commit('setFeedback', {
                message: `La candidature a bien été supprimée.`,
              });
              this.$store.commit('applications/updateStateFromServer', remainingApplications);
            } catch(err) {
              this.$store.commit('setApiErrorFeedback', {err, message: 'La candidature n\'a pas pu être supprimée'});
            }
          });
          this.$router.push({
            path: path()
          });
        }
      },
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
