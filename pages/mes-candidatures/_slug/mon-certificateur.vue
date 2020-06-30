<template>
  <div class="candidature-detail">
    <h1 class="title is-1 is-spaced">Mon certificateur</h1>
    <p class="subtitle" v-if="application.delegate">Remplacer {{application.delegate.name}}</p>
    <div class="field">
      <div class="control">
        <GeoInput :input="selectDelegateCity" :credentials="credentials" type="city" placeholder="A côté de quelle ville voulez-vous rechercher ?" countries="fr" />
      </div>
    </div>
    <div v-if="error" class="has-text-danger">
      <p class="field">{{error}}</p>
      <nuxt-link :to="applicationPath" class="button is-rounded is-danger">Retour</nuxt-link>
    </div>
    <p v-else-if="isSearching">Recherche en cours ...</p>
    <div v-else-if="delegates" >
      <ul v-if="delegates.length" v-for="delegateChunk in chunk(delegates, 4)" class="columns is-multiline">
        <li v-for="delegate in delegateChunk" class="column is-4 has-equal-height">
          <DelegateCard :delegate="delegate" :onClick="selectDelegate" />
        </li>
      </ul>
      <p v-else>Aucun certificateur n'a été trouvé. :(</p>
    </div>
  </div>
</template>

<script>
  import GeoInput from 'avril/js/components/GeoInput.vue';
  import { chunk } from 'avril/js/utils/array';
  import {queryApi, mutateApi} from 'avril/js/utils/api';
  import DelegateCard from '~/components/DelegateCard.vue';
  import {path} from '~/utils/application';

  export default {
    computed: {
      applicationPath() {
        return path(this.application);
      },
    },
    components: {
      DelegateCard,
      GeoInput,
    },
    data: function(){
      return {
        credentials: process.env.algoliaCredentials,
        error: null,
        delegates: null,
        isSearching: false,
      }
    },
    props: {
      application: {
        type: Object
      }
    },
    methods: {
      chunk,
      selectDelegateCity: async function({lat, lng, postalCode}) {
        try {
          this.isSearching = true;
          const result = await queryApi({
            name: 'delegatesSearch',
            type: 'delegate',
            params: {
              applicationId: this.application.id,
              geo: {
                lat,
                lng,
              },
              postalCode,
            }
          })
          this.isSearching = false;
          this.delegates = result;
        } catch(err) {
          this.isSearching = false;
          this.error = 'Une erreur est survenue, merci de réessayer plus tard.';
        }
      },
      selectDelegate: async function(delegate) {
        try {
          const application = await mutateApi({
            name: 'attachDelegate',
            type: 'application',
            params: {
              input: {
                applicationId: this.application.id,
                delegateId: delegate.id,
              }
            },
          })
          this.$store.dispatch('applications/updateAndInform', {
            ...application,
            savedMessage: 'Certificateur enregistré.'
          });
          this.$router.push({
            path: path(this.application)
          });
        } catch(err) {
          this.error = 'Une erreur est survenue, nous ne sommes pas parvenu à sélectionner ce certificateur. Merci de réessayer plus tard.';
        }
      }
    }
  }
</script>
