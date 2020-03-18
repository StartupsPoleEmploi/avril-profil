<template>
  <div class="form">
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
        <div class="field">
          <div class="control">
            <client-only placeholder="Chargement du calendrier ...">
              <date-picker input-class="input is-large" :value="profile.birthday" @input="addBirthday" :format="datePickerFormat" placeholder="Date de naissance" default-panel="year"/>
            </client-only>
          </div>
        </div>
      </div>
      <div class="column is-8">
        <div class="field">
          <div class="control">
            <GeoInput :input="addBirthPlace" :value="profile.birthPlace" type="city" placeholder="Lieu de naissance" />
          </div>
        </div>
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
  import {formatDate} from 'avril/js/utils/time.js';
  import GeoInput from 'avril/js/components/GeoInput.vue';
  import withDatePickerMixin from 'avril/js/mixins/withDatePicker.js';

  export default {
    mixins: [
      withDatePickerMixin,
    ],
    computed: {
      profile() {
        return this.$store.state.profile
      },
    },
    components: {
      GeoInput,
    },
    methods: {
      formatDate,
      addBirthPlace: function({country_code, ...result}) {
        // this.$store.commit('identity/addBirthPlace', result)
        // const nationalityFields = {
        //   country_code: (this.$store.state.identity.nationality.country_code || country_code).toUpperCase(),
        //   country: this.$store.state.identity.nationality.country || result.country,
        // };
        // this.$store.commit('identity/addNationality', nationalityFields);
      },
      addBirthday: function(date) {
        // this.$store.commit('identity/addBirthday', date);
      },
    },
  }
</script>