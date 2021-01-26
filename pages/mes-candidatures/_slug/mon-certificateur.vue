<template>
  <div class="candidature-detail">
    <h1 class="title is-1 is-spaced">Mon certificateur</h1>
    <p class="subtitle" v-if="application.delegate">Remplacer {{application.delegate.name}}</p>
    <div class="field">
      <div class="control">
        <BanGeoInput :input="selectDelegateCityAndSearch" type="city" placeholder="A côté de quelle ville voulez-vous rechercher ?" disable-manual-input />
      </div>
    </div>
    <h3 class="title is-3 has-text-centered" v-if="isSearching">Recherche en cours ...</h3>
    <div v-if="delegates && !isSearching">
      <div v-if="delegates.length">
        <div class="results content" v-if="isExpandedSearch">
          <p>
            <button class="button is-text is-rounded" @click="toggleExpandRadiusAndSearch">
              <span class="icon"><ArrowLeft /></span>
              Annuler la recherche étendue
            </button>
          </p>
        </div>
        <ul v-for="delegateChunk in chunk(delegates, 3)" class="columns">
          <li v-for="delegate in delegateChunk" class="column is-4 has-equal-height">
            <DelegateCard :delegate="delegate" :onClick="selectDelegate" />
          </li>
        </ul>
      </div>
      <div class="section content has-text-centered" v-else>
        <p class="is-size-5">Aucun certificateur n'a été trouvé<span v-if="searchCriteria.radius"> dans un rayon de {{searchCriteria.radius/1000}}km autour de {{geoInputResult.city}}</span> pour le diplôme {{certificationName}}. 😔</p>
        <div v-if="!isExpandedSearch && searchCriteria.expandable">
          <p><button class="button is-primary is-rounded is-medium" @click="toggleExpandRadiusAndSearch">Elargir le périmètre de recherche</button></p>
          <blockquote><strong>NB</strong> Avril vous donne un conseil : Il est d'usage de sélectionner le certificateur le plus proche de chez vous ou de votre lieu de travail</blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BanGeoInput from 'avril/js/components/BanGeoInput.vue';
  import { chunk } from 'avril/js/utils/array';
  import {queryApi, mutateApi} from 'avril/js/utils/api';
  import DelegateCard from '~/components/DelegateCard.vue';
  import {path, delegateCriteria, certificationName} from '~/utils/application';
  import ArrowLeft from 'avril/images/icons/arrow-left.svg';

  export default {
    computed: {
      applicationPath() {
        return path(this.application);
      },
      searchCriteria() {
        return delegateCriteria(this.application, this.isExpandedSearch)
      },
      certificationName() {
        return certificationName(this.application);
      }
    },
    components: {
      ArrowLeft,
      DelegateCard,
      BanGeoInput,
    },
    data: function(){
      return {
        credentials: process.env.algoliaCredentials,
        delegates: null,
        isSearching: false,
        isExpandedSearch: false,
        geoInputResult: null,
      }
    },
    props: {
      application: {
        type: Object
      }
    },
    methods: {
      chunk,
      toggleExpandRadiusAndSearch: function() {
        this.isExpandedSearch = !this.isExpandedSearch;
        this.searchDelegate();
      },
      selectDelegateCityAndSearch: function(result) {
        this.isExpandedSearch = false;
        this.geoInputResult = result;
        this.searchDelegate();
      },
      searchDelegate: async function() {
        try {
          const {lat, lng, administrative} = this.geoInputResult;
          this.isSearching = true;
          this.delegates = [];
          const result = await queryApi({
            name: 'delegatesSearch',
            type: 'delegate',
            params: {
              applicationId: this.application.id,
              geo: {
                lat,
                lng,
              },
              radius: this.searchCriteria.radius,
              administrative: this.searchCriteria.administrativeFilter ? administrative : null,
            }
          })
          this.delegates = result;
        } catch(err) {
          this.$store.commit('setApiErrorFeedback', {err, message: 'La recherche de certificateur n\'a pas fonctionné'});
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

  .candidature-detail .results .button span.icon {
    margin: 0;
  }
</style>