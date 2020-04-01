<template>
  <div class="form">
    <h3 class="title is-6">Informations obligatoires</h3>
    <div class="columns">
      <div class="column is-4">
        <input class="input is-large" type="text" name="name" placeholder="Nom" :value="identity.lastName" @input="addLastName">
      </div>
      <div class="column is-8">
        <input class="input is-large" type="text" name="name" placeholder="Prénoms" :value="identity.firstName" @input="addFirstName">
      </div>
    </div>
    <div class="columns">
      <div class="column is-4">
        <div class="field">
          <div class="control">
            <client-only placeholder="Chargement du calendrier ...">
              <date-picker input-class="input is-large" :value="parseISODate(identity.birthday)" @input="addBirthday" :format="datePickerFormat" placeholder="Date de naissance" default-panel="year"/>
            </client-only>
          </div>
        </div>
      </div>
      <div class="column is-8">
        <div class="field">
          <div class="control">
            <GeoInput :input="addBirthPlace" :value="identity.birthPlace" type="city" placeholder="Lieu de naissance" />
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-8 is-offset-4">
        <div class="field">
          <!-- <label class="label">Nationalité</label> -->
          <div class="control">
            <GeoInput :input="addNationality" :value="identity.nationality" type="country" placeholder="Nationalité" />
          </div>
        </div>
      </div>
    </div>
    <h3 class="title is-6">Informations optionnelles</h3>
    <div class="columns">
      <div class="column is-4">
        <div class="select is-large" style="width: 100%;">
          <select style="padding-right: 0; width: 100%;" @change="addGender" :value="identity.gender">
            <option :value="null">Genre</option>
            <option value="m">Masculin</option>
            <option value="f">Féminin</option>
          </select>
        </div>
      </div>
      <div class="column is-8">
        <input class="input is-large" type="text" name="name" placeholder="Nom d'usage">
      </div>
    </div>
    <SaveButton store="identity" to="/mon-compte/situation-professionnelle" />
  </div>
</template>

<script>
  import { parseISODate, formatISODate } from 'avril/js/utils/time';
  import {formatDate} from 'avril/js/utils/time.js';
  import GeoInput from 'avril/js/components/GeoInput.vue';
  import withDatePickerMixin from 'avril/js/mixins/withDatePicker.js';
  import SaveButton from '~/components/SaveButton.vue';

  export default {
    mixins: [
      withDatePickerMixin,
    ],
    computed: {
      identity() {
        return this.$store.state.identity;
      },
    },
    components: {
      GeoInput,
      SaveButton,
    },
    methods: {
      parseISODate,
      formatDate,
      addFirstName: function(e) {
        this.$store.commit('identity/updateState', {firstName: e.target.value})
      },
      addLastName: function(e) {
        this.$store.commit('identity/updateState', {lastName: e.target.value})
      },
      addBirthPlace: function({country_code, ...result}) {
        this.$store.commit('identity/updateState', {birthPlace: result})
      },
      addBirthday: function(date) {
        this.$store.commit('identity/updateState', {birthday: formatISODate(date)});
      },
      addNationality: function(value) {
        this.$store.commit('identity/updateState', {nationality: value});
      },
      addGender: function(e) {
        this.$store.commit('identity/updateState', {gender: e.target.value});
      },
    },
  }
</script>