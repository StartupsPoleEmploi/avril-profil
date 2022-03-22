<template>
  <div>
    <MeetingSelector v-if="hasDelegate && isCertificationActive" :application="application" />
    <header class="application-header">
      <ApplicationTag :application="application" />
      <h1 class="title is-2">{{certificationName}}</h1>
      <div class="label-avril">Niveau {{certificationLevel}}</div>
      -
      <a class="is-underlined" :href="`/diplomes/${certificationId}`">consulter la fiche du diplôme</a>
    </header>
    <p v-if="!isCertificationActive" class="notification is-warning content">
      Le diplôme que vous avez sélectionné n'est plus actif. Nous vous invitons à
      <a :href="`/diplomes/${certificationId}`">sélectionner un nouveau diplôme similaire</a> ou
      <a href="/">effectuer une nouvelle recherche</a>
      pour démarrer une nouvelle candidature. Vous pouvez ensuite <a @click="deleteApplication">supprimer</a> celle-ci si vous le souhaitez.
    </p>
    <p v-if="isDelegateInactive" class="notification is-warning content">
      Le certificateur que vous avez sélectionné n'est plus actif ou ne propose plus le diplôme pour lequel vous candidatez. Nous vous invitons à
      <nuxt-link :to="`${applicationPath}/mon-certificateur`">sélectionner un nouveau certificateur</nuxt-link> avant de pouvoir transmettre votre candidature.
    </p>
    <p v-if="isUniversity && hasDelegate" class="notification is-warning content">
      <strong>Conseil d'Avril :</strong> Vous avez sélectionné un diplôme universitaire. Ce diplôme peut présenter
      des « variantes » d'une Université à l'autre selon la discipline, la mention ou le parcours.
      Nous vous invitons donc, avant de confirmer votre candidature, à consulter sur
      <a v-if="delegateWebsite" :href="delegateWebsite" target="_blank">le site de l'Université</a>
      <span v-else>le site de l'Université</span>
      retenue le descriptif du diplôme sélectionné. Vous pourrez ainsi vérifier qu'il
      correspond bien à votre projet et aux compétences que vous avez acquises.
    </p>
    <p v-if="isCnam && hasDelegate" class="notification is-info content">
      Le CNAM vous invitera à créer un dossier sur leur plate-forme
      <a href="https://sdnf.cnam.fr/diva/" target="_blank">https://sdnf.cnam.fr/diva</a>.
      Le CNAM pourra aussi vous proposer un rdv pour confirmer que le diplôme retenu est celui
      qui vous correspond le mieux ou, le cas échéant, vous faire une proposition mieux ciblée au
      regard de votre projet et de votre profil.
    </p>

    <div class="candidature-detail">
      <Breadcrumb  v-if="isCertificationActive" :application="application" />
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
              :is-locked="!hasDelegate"
              :is-optional="!hasMandatoryBooklet"
              title="Ma recevabilité"
              :button="`${bookletInsertedAt ? 'Poursuivre' : 'Compléter'} ma recevabilité`"
              :href="bookletPath"
              hasMultipleLayer
            >
              <div v-if="bookletCompletedAt">
                <p>
                  Complétée le {{parseAndFormat(bookletCompletedAt)}} :
                  <a :href="cerfaPath" class="button is-rounded is-text" style="vertical-align: baseline;">Voir le CERFA</a>
                </p>
              </div>
              <div class="content" v-else>
                <p v-if="!hasMandatoryBooklet"><small>Cette étape est facultative car la plupart des certificateurs vous demanderont de remplir ce formulaire directement sur leur site web.</small></p>
                <p v-if="bookletInsertedAt">Démarée le {{parseAndFormat(bookletInsertedAt)}}.</p>
              </div>

              <p slot="help">
                Pour débloquer le formulaire de recevabilité, vous devez d'abord choisir votre <nuxt-link :to="`${applicationPath}/mon-certificateur`">certificateur</nuxt-link>.
              </p>

            </LockableCard>
            <LockableCard
              :is-locked="!isResumesUnlocked"
              :is-filled="hasResumes"
              title="Mes pièces jointes"
              :button="bookletCompletedAt ? 'Voir la liste des documents attendus' : 'Transmettre un document à votre certificateur'"
              :to="`${applicationPath}/mes-justificatifs`"
            >
              <div class="content" v-if="application.resumes.length">
                <ul>
                  <li v-for="resume in application.resumes" :key="resume.id">
                    <span v-if="resume.category" class="tag is-info">{{resumeCategory(resume.category)}}</span>
                    <span v-else class="tag is-warning">Type inconnu</span>
                    {{resume.name || resume.filename}}
                  </li>
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
              <br />
              <p v-if="delegateEmail">Email : <a :href="`mailto:${delegateEmail}`">{{delegateEmail}}</a></p>
              <p v-if="delegatePhone">Tél : <a :href="`tel:${delegatePhone}`">{{delegatePhone}}</a></p>
              <p v-if="delegateWebsite">Site internet : <a :href="delegateWebsite">{{delegateWebsite}}</a></p>
              <nuxt-link
                v-if="delegateInfos || certifierInfos"
                :to="`${applicationPath}/informations-specifiques`"
                class="button is-avril is-rounded is-small"
                style="margin-top: 1rem;"
              >
                En savoir plus
              </nuxt-link>
            </LockableCard>
            <LockableCard
              v-if="isAfpa"
              :is-locked="!isFilled"
              title="Ma réunion d'information"
              button="Voir les réunions VAE AFPA"
              target="_blank"
              href="https://www.afpa.fr/agenda?_rechercheevenementportlet_WAR_rechercheportlet_INSTANCE_4ONof6W5P5AJ_formDate=1599641591738&p_p_id=101_INSTANCE_agenda&_101_INSTANCE_agenda_afpa_ddm__22997__DateDebut_en_US=09%2F09%2F2020&_101_INSTANCE_agenda_afpa_ddm__22997__DateFin_en_US=&_101_INSTANCE_agenda_afpa_ddmStructureKey=EVENEMENT&_101_INSTANCE_agenda_categoryId=58334180&_101_INSTANCE_agenda_categoryId=&_rechercheevenementportlet_WAR_rechercheportlet_INSTANCE_4ONof6W5P5AJ_typeEvenement=58334180&_rechercheevenementportlet_WAR_rechercheportlet_INSTANCE_4ONof6W5P5AJ_region=&_rechercheevenementportlet_WAR_rechercheportlet_INSTANCE_4ONof6W5P5AJ_ville=&_rechercheevenementportlet_WAR_rechercheportlet_INSTANCE_4ONof6W5P5AJ_dateDebut=&_rechercheevenementportlet_WAR_rechercheportlet_INSTANCE_4ONof6W5P5AJ_dateFin="
            >
              <p slot="help">Pour voir les réunions d'information, vous devez transmettre votre candidature.</p>
            </LockableCard>
            <LockableCard
              v-if="meeting"
              title="Ma réunion d'information"
              button="Voir mes rendez-vous"
              to="/mes-rendez-vous"
              :is-filled="true"
            >
              <p>Vous êtes inscrit {{formatInterval(meeting.startDate, meeting.endDate)}} à <strong>{{meeting.place}}</strong>.</p>
              <p>Adresse : {{meeting.address}} {{meeting.postalCode}} {{meeting.city}}</p>
              <p slot="help">Pour voir les réunions d'information, vous devez transmettre votre candidature.</p>
            </LockableCard>
          </div>
        </div>
      </div>
      <div class="has-text-centered content" style="margin-top: 1rem;">
        <p><button class="button is-rounded is-small is-text" @click="deleteApplication">Supprimer ma candidature</button></p>
      </div>
    </div>
  </div>
</template>

<script>
  import get from 'lodash.get';
  import { parseAndFormat, formatInterval, parseISODate } from 'avril/js/utils/time';
  import {capitalize} from 'avril/js/utils/string';
  import { mutateApi } from 'avril/js/utils/api';

  import NextStep from '~/components/application/NextStep.vue';
  import Breadcrumb from '~/components/application/Breadcrumb.vue';
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
    delegateWebsite,
    delegateInfos,
    certifierInfos,
    certificationName,
    certificationId,
    isCertificationActive,
    isDelegateInactive,
    certificationLevel,
    currentApplication,
    isAfpa,
    isCnam,
    isFilled,
    isUniversity,
    meeting,
    resumeCategory,
    hasMandatoryBooklet,
  } from '~/utils/application';

  export default {
    components: {
      ApplicationTag,
      Address,
      Breadcrumb,
      MeetingSelector,
      NextStep,
      LockableCard,
      Message,
    },
    computed: {
      identity: function() {
        return this.$store.state.identity;
      },
      meeting: function() {
        return meeting(this.application);
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
      hasMandatoryBooklet: function() {
        return hasMandatoryBooklet(this.application);
      },
      hasResumes: function() {
        return hasResumes(this.application);
      },
      isAfpa: function() {
        return isAfpa(this.application);
      },
      isCnam: function() {
        return isCnam(this.application);
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
        return this.isSynthesisUnlocked;
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
      delegateWebsite: function() {
        return delegateWebsite(this.application);
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
      },
      isDelegateInactive: function() {
        return isDelegateInactive(this.application);
      },
      isUniversity: function() {
        return isUniversity(this.application);
      },
      delegateWebsite: function() {
        return delegateWebsite(this.application);
      },
      delegateInfos() {
        return delegateInfos(this.application);
      },
      certifierInfos() {
        return certifierInfos(this.application);
      },
    },
    methods: {
      capitalize,
      formatInterval: function(d1, d2) {
        if (!d1 || !d2) return;
        return formatInterval(parseISODate(d1), parseISODate(d2));
      },
      parseAndFormat,
      resumeCategory,
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
