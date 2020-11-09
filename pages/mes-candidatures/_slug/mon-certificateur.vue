<template>
  <div class="candidature-detail">
    <h1 class="title is-1 is-spaced">Mon certificateur</h1>
    <p class="subtitle" v-if="application.delegate">Remplacer {{application.delegate.name}}</p>
    <div class="field">
      <div class="control">
        <GeoInput :input="selectDelegateCity" :credentials="credentials" type="city" placeholder="A côté de quelle ville voulez-vous rechercher ?" countries="fr" />
      </div>
    </div>
    <p v-if="isSearching">Recherche en cours ...</p>
    <div v-else-if="delegates" >
      <ul v-if="delegates.length" v-for="delegateChunk in chunk(delegates, 3)" class="columns">
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
          this.delegates = result;
        } catch(err) {
          this.$store.commit('setApiErrorFeedback', {err, message: 'La recherche de certficateur n\'a pas fonctionné'});
        }
        this.isSearching = false;
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
          this.$store.dispatch('applications/updateAndInform', application);
          this.$store.commit('setFeedback', {
            message: 'Certificateur enregistré',
          });
          setTimeout(() => {
            this.$router.push({
              path: path(this.application)
            });
          }, 0)
        } catch(err) {
          this.$store.commit('setApiErrorFeedback', {err, message: 'Le certificateur n\'a pas pu être sélectionné'});
        }
      }
    }
  }
</script>


<style lang="scss">
  .column.has-equal-height {
    .card {
      height: 100%;
      justify-content: space-between;
      display: flex;
      flex-direction: column;
    }
  }
</style>