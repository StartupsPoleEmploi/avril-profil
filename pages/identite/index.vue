<template>
  <div class="">
    <h3 class="title is-6">Informations obligatoires</h3>
    <div class="columns">
      <div class="column is-4">
        <input class="input is-large" type="text" name="name" placeholder="Nom" :value="profile.lastName">
      </div>
      <div class="column is-8">
        <input class="input is-large" type="text" name="name" placeholder="Prénoms" :value="profile.firstNames">
      </div>
    </div>
    <div class="columns">
      <div class="column is-4">
        <input class="input is-large" type="text" name="name" placeholder="Date de naissance" :value="profile.birthPlace.city">
      </div>
      <div class="column is-8">
        <input class="input is-large" type="text" name="name" placeholder="Lieu de Naissance">
      </div>
    </div>
    <h3 class="title is-6">Informations optionnelles</h3>
    <div class="columns">
      <div class="column is-4">
        <input class="input is-large" type="text" name="name" placeholder="Genre">
      </div>
      <div class="column is-8">
        <input class="input is-large" type="text" name="name" placeholder="Nom d'usage">
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