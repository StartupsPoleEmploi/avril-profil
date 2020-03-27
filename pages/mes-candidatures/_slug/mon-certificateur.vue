<template>
  <div class="candidature-detail">
    <h1 class="title is-1">Mon certificateur</h1>

    <div class="field">
      <div class="control">
        <GeoInput :input="selectDelegateCity" type="city" placeholder="A côté de quelle ville voulez-vous rechercher ?" />
      </div>
    </div>
    <p v-if="isSearching">Recherche en cours ...</p>
    <div v-if="delegates.length" >
      <ul v-for="delegateChunk in chunk(delegates, 4)" class="columns">
        <li v-for="delegate in delegateChunk" class="column is-3 has-equal-height">
          <DelegateCard :delegate="delegate" :onClick="selectDelegate" />
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import GeoInput from 'avril/js/components/GeoInput.vue';
  import { chunk } from 'avril/js/utils/array';
  import DelegateCard from '~/components/DelegateCard.vue';
  import { apiPath } from '~/utils/api';

  console.log(chunk)

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
        const result = await fetch(apiPath('delegates', {
          slug: this.application.slug,
          postal_code: postalCode,
          lat,
          lng,
        }))
        this.isSearching = false;
        if (result.ok) {
          const json = await result.json();
          this.delegates = json.data.delegates;
        }
      },
      selectDelegate: async function(delegate) {
        const result = await fetch(apiPath('application', {
          slug: this.application.slug,
        }), {
          method: 'PUT',
          data: {
            delegate_id: delegate.id,
          }
        })
      }
    }
  }
</script>
