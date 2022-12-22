<template>
  <div>
    <BackButton label="Mes candidatures" to="/" />
    <div class="identite">
      <div class="columns">
        <div class="column is-12 is-11-desktop is-10-widescreen is-9-hd">
          <h1 class="title h1 is-spaced">Mon compte</h1>
          <p class="subtitle">
            Tous ces éléments sont indispensables pour votre candidature.
          </p>
          <div v-if="showWarning && missingFields.length > 0" class="notification is-warning content">
            <p>N'oubliez pas de remplir les champs suivant :</p>
            <ul>
              <li v-for="field in missingFields">{{translateField(field)}}</li>
            </ul>
          </div>
          <div class="tags">
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-compte">Profil</nuxt-link>
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-compte/situation-professionnelle">Situation professionnelle</nuxt-link>
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-compte/lieu-de-residence">Lieu de résidence</nuxt-link>
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-compte/me-joindre">Me joindre</nuxt-link>
          </div>
          <nuxt-child @showWarning="onShowWarning" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BackButton from '~/components/BackButton.vue'

  export default {
    components: {
      BackButton,
    },
    computed: {
      identity() {
        return this.$store.state.identity;
      },
      missingFields() {
        return this.$store.getters['identity/missingFields'];
      },
    },
    data() {
      return {
        showWarning: false,
      }
    },
    methods: {
      onShowWarning() {
        this.showWarning = true;
      },
      translateField(field) {
        switch(field) {
          case 'lastName':
            return 'Nom de famille';
          case 'firstName':
            return 'Prénom';
          case 'gender':
            return 'Genre';
          case 'mobilePhone':
            return 'Numéro de téléphone portable';
          case 'birthday':
            return 'Date de naissance';
          case 'isHandicapped':
            return 'Reconnu travailleur handicapé';
          case 'birthPlace.country':
            return 'Pays de naissance';
          case 'fullAddress.country':
            return 'Pays de résidence';
          case 'nationality.countryCode':
          case 'nationality.country':
            return 'Nationalité';
          case 'birthPlace.city':
            return 'Ville de naissance';
          case 'fullAddress.street':
            return 'Rue de résidence';
          case 'fullAddress.city':
            return 'Ville de résidence';
          case 'currentSituation.employmentType':
            return 'Situation d\'emploi';
          default:
            return field.split('.').join(' > ');
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .tags {
    margin-bottom: 2rem;
    .tag {
      text-transform: none;
      &.is-togglable {
        &:not(.is-active) {
          background: transparent;
          color: initial;
          &:hover {
            background: rgba(0, 0, 0, 0.05);
          }
        }
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
</style>