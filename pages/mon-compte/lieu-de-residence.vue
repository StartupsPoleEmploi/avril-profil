<template>
  <div class="form">
    <div class="form-fields">
      <div class="field">
        <label class="label">L'adresse de votre lieu de résidence</label>
        <div class="control">
          <GeoInput :input="addAddress" :value="profile.address" placeholder="Exemple : 44 rue de dupont, 13000 Marseille" />
        </div>
      </div>

      <button type="submit" class="button is-primary is-rounded is-medium">Enregistrer</button>
    </div>
  </div>
</template>

<script>
  import GeoInput from 'avril/js/components/GeoInput.vue';

  export default {
    components: {
      GeoInput,
    },
    computed: {
      profile() {
        return this.$store.state.profile
      },
    },
    methods: {
      addAddress: function(){},
    },
  }
</script>