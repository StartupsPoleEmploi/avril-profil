<template>
  <div class="form">
    <div class="form-fields">
      <div class="field">
        <div class="control">
          <GeoInput :input="addFullAddress" :value="identity.fullAddress" placeholder="Exemple : 44 rue de dupont, 13000 Marseille" />
        </div>
      </div>
      <div class="field">
        <IdentitySaveButtons to="/mon-compte/me-joindre" />
      </div>
    </div>
  </div>
</template>

<script>
  import GeoInput from 'avril/js/components/GeoInput.vue';
  import IdentitySaveButtons from '~/components/IdentitySaveButtons.vue';

  export default {
    components: {
      GeoInput,
      IdentitySaveButtons
    },
    computed: {
      identity() {
        return this.$store.state.identity
      },
    },
    methods: {
      addFullAddress: function(value){
        this.$store.commit('identity/updateState', {fullAddress: value})
      },
    },
  }
</script>