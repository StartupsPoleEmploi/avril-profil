<template>
  <div class="">
    <h3 class="title is-6">Situation Professionnelle</h3>
    <div class="columns">
      <div class="column is-4">
        <input class="input is-large" type="text" name="name" placeholder="Métier">
      </div>
      <div class="column is-8">
        <input class="input is-large" type="text" name="name" placeholder="Prénoms" :value="profile.firstNames">
      </div>
    </div>
    <button type="submit" class="button is-primary is-rounded is-medium">Enregistrer</button>
  </div>
</template>

<script>
  import {formatDate} from '~/utils/time.js';

  export default {
    computed: {
      profile() {
        return this.$store.state.profile
      },
    },
    methods: {
      formatDate,
    },
  }
</script>