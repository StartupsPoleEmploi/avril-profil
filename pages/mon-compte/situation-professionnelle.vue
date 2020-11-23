<template>
  <div class="form">
    <div class="form-fields fields">
      <div class="field">
        <h3 class="title is-6">Je suis actuellement en :</h3>
        <RadioList
          key="statusQuestion"
          :value="currentSituation.status"
          :options="status"
          :click="addCurrentSituationStatus"
        />
      </div>

      <div class="field" v-if="isWorking">
        <h3 class="title is-6">Avec quel statut ?</h3>
        <RadioList
          key="workingSubQuestion"
          :value="currentSituation.employmentType"
          :options="employmentType"
          :click="addCurrentSituationEmploymentType"
        />
      </div>
      <div class="field" v-if="isJobSeeking">
        <h3 class="title is-6">Je suis inscrit à Pôle emploi :</h3>
        <RadioList
          key="jobseekingSubQuestion"
          :value="currentSituation.registerToPoleEmploi"
          :click="addCurrentSituationRegisterToPoleEmploi"
          boolean
          inline
        />
      </div>
      <div v-if="isJobSeeking && currentSituation.registerToPoleEmploi">
        <div class="field">
          <h3 class="title is-6">Depuis le :</h3>
          <div class="control" v-if="isClient">
            <client-only placeholder="Chargement du calendrier ...">
              <date-picker input-class="input is-large" :value="parseISODate(currentSituation.registerToPoleEmploiSince)" @input="addCurrentSituationRegisterToPoleEmploiSince" :format="datePickerFormat" :placeholder="defaultPlaceholder" />
            </client-only>
          </div>
        </div>
        <div class="field">
          <h3 class="title is-6">Je suis indemnisé :</h3>
          <RadioList
            key="poleEmploiSubQuestion"
            :value="currentSituation.compensationType"
            :click="addCurrentSituationCompensationType"
            :options="compensationType"
          />
        </div>
      </div>
      <div class="field">
        <h3 class="title is-6">Je suis reconnu travailleur handicapé :</h3>
        <RadioList
          :value="identity.isHandicapped"
          :click="addIsHandicapped"
          boolean
          inline
        />
      </div>
      <IdentitySaveButtons to="/mon-compte/lieu-de-residence" />
    </div>
  </div>
</template>

<script>
  import get from 'lodash.get';
  import { parseISODate, formatISODate } from 'avril/js/utils/time';
  import RadioList from 'avril/js/components/RadioList.vue';
  import withDatePickerMixin from 'avril/js/mixins/withDatePicker.js';

  import possibleAnswers from '~/contents/data/currentSituation';
  import IdentitySaveButtons from '~/components/IdentitySaveButtons.vue';

  export default {
    mixins: [
      withDatePickerMixin,
    ],
    components: {
      RadioList,
      IdentitySaveButtons,
    },
    computed: {
      isClient() {
        return !!process.client;
      },
      identity() {
        return this.$store.state.identity
      },
      currentSituation() {
        return this.identity.currentSituation || {}
      },
      isWorking() {
        return this.currentSituation.status === 'working'
      },
      isJobSeeking() {
        return this.currentSituation.status === 'jobseeking'
      },
    },
    data() {
      return possibleAnswers;
    },
    methods: {
      parseISODate,
      addIsHandicapped: function(value){
        this.$store.commit('identity/updateState', {isHandicapped: value});
      },
      addCurrentSituationStatus: function(value){
        this.$store.commit('identity/updateStateDeep', {currentSituation: {status: value}});
      },
      addCurrentSituationEmploymentType: function(value){
        this.$store.commit('identity/updateStateDeep', {currentSituation: {employmentType: value}});
      },
      addCurrentSituationRegisterToPoleEmploi: function(value){
        this.$store.commit('identity/updateStateDeep', {currentSituation: {registerToPoleEmploi: value}});
      },
      addCurrentSituationRegisterToPoleEmploiSince: function(date){
        this.$store.commit('identity/updateStateDeep', {currentSituation: {registerToPoleEmploiSince: formatISODate(date)}});
      },
      addCurrentSituationCompensationType: function(value){
        this.$store.commit('identity/updateStateDeep', {currentSituation: {compensationType: value}});
      },
    },
  }
</script>

<style type="text/css">
  .mx-datepicker {
    width: 100%;
  }
</style>