<template>
  <div class="form">
    <div class="form-fields">
      <div class="field">
        <label class="label">L'adresse de votre lieu de résidence</label>
        <div class="control">
          <GeoInput :input="addAddress" :value="profile.address" placeholder="Exemple : 44 rue de dupont, 13000 Marseille" />
        </div>
      </div>
      <div class="field">
        <SaveButton store="profile" to="/mon-compte/me-joindre" />
      </div>
    </div>
  </div>
</template>

<script>
  import GeoInput from 'avril/js/components/GeoInput.vue';
  import SaveButton from '~/components/SaveButton.vue';

  export default {
    components: {
      GeoInput,
      SaveButton
    },
    computed: {
      profile() {
        return this.$store.state.profile
      },
    },
    methods: {
      addAddress: function(value){
        this.$store.commit('profile/updateState', {address: value})
      },
    },
  }
</script>