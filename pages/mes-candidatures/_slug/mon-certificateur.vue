<template>
  <div class="candidature-detail">
    <h1 class="title is-1 is-spaced">Mon certificateur</h1>
    <p class="subtitle" v-if="application.delegate">Remplacer {{application.delegate.name}}</p>
    <div class="field">
      <div class="control">
        <GeoInput :input="selectDelegateCity" type="city" placeholder="A côté de quelle ville voulez-vous rechercher ?" />
      </div>
    </div>
    <p v-if="isSearching">Recherche en cours ...</p>
    <div v-if="delegates.length" >
      <ul v-for="delegateChunk in chunk(delegates, 4)" class="columns">
        <li v-for="delegate in delegateChunk" class="column is-4 has-equal-height">
          <DelegateCard :delegate="delegate" :onClick="selectDelegate" />
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import GeoInput from 'avril/js/components/GeoInput.vue';
  import { chunk } from 'avril/js/utils/array';
  import {queryApi, mutateApi} from 'avril/js/utils/api';
  import DelegateCard from '~/components/DelegateCard.vue';
  import {name} from '~/utils/certification';
  import {path} from '~/utils/application';

  export default {
    computed: {},
    components: {
      DelegateCard,
      GeoInput,
    },
    data: function(){
      return {
        delegates: [],
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
      },
      selectDelegate: async function(delegate) {
        const result = await mutateApi({
          name: 'attachDelegate',
          type: 'application',
          params: {
            applicationId: this.application.id,
            delegateId: delegate.id,
          },
        })
        this.$store.dispatch('applications/updateAndInform', result);
        this.$router.push({
          path: path(this.application)
        });
      }
    }
  }
</script>
