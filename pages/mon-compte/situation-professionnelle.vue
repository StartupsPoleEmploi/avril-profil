<template>
  <div class="form">
    <div class="form-fields fields">
      <div class="field">
        <h3 class="title is-6">
          Je suis reconnu travailleur handicapé :
          <span v-if="isMissingAndRequired('isHandicapped')" class="has-text-danger">(requis)</span>
        </h3>
        <RadioList
          :extraClass="isMissingAndRequired('isHandicapped') ? 'is-danger' : ''"
          :value="identity.isHandicapped"
          :click="addIsHandicapped"
          boolean
          inline
        />
      </div>
      <div class="field">
        <h3 class="title is-6">
          Je suis actuellement en :
          <span v-if="isMissingAndRequired('currentSituation.status')" class="has-text-danger">(requis)</span>
        </h3>
        <RadioList
          key="statusQuestion"
          :extraClass="isMissingAndRequired('currentSituation.status') ? 'is-danger' : ''"
          :value="currentSituation.status"
          :options="status"
          :click="addCurrentSituationStatus"
        />
      </div>

      <div class="field" v-if="isWorking">
        <h3 class="title is-6">
          Avec quel statut ?
          <span v-if="isMissingAndRequired('currentSituation.employmentType')" class="has-text-danger">(requis)</span>
        </h3>
        <RadioList
          key="workingSubQuestion"
          :extraClass="isMissingAndRequired('currentSituation.employmentType') ? 'is-danger' : ''"
          :value="currentSituation.employmentType"
          :options="employmentType"
          :click="addCurrentSituationEmploymentType"
        />
      </div>
      <div class="field" v-if="isJobSeeking">
        <h3 class="title is-6">
          Je suis inscrit à Pôle emploi :
          <span v-if="isMissingAndRequired('currentSituation.registerToPoleEmploi')" class="has-text-danger">(requis)</span>
        </h3>
        <RadioList
          key="jobseekingSubQuestion"
          :extraClass="isMissingAndRequired('currentSituation.registerToPoleEmploi') ? 'is-danger' : ''"
          :value="currentSituation.registerToPoleEmploi"
          :click="addCurrentSituationRegisterToPoleEmploi"
          boolean
          inline
        />
      </div>
      <div v-if="isJobSeeking && currentSituation.registerToPoleEmploi">
        <div class="field">
          <h3 class="title is-6">
            Depuis le :
            <span v-if="isMissingAndRequired('currentSituation.registerToPoleEmploiSince')" class="has-text-danger">(requis)</span>
          </h3>
          <div class="control">
            <DatePicker
              :class="`input is-large ${isMissingAndRequired('currentSituation.registerToPoleEmploiSince') ? 'is-danger' : ''}`"
              :value="parseISODate(currentSituation.registerToPoleEmploiSince)"
              @input="addCurrentSituationRegisterToPoleEmploiSince"
              placeholder="Date"
            />
          </div>
        </div>
        <div class="field">
          <h3 class="title is-6">
            Je suis indemnisé :
            <span v-if="isMissingAndRequired('currentSituation.compensationType')" class="has-text-danger">(requis)</span>
          </h3>
          <RadioList
            key="poleEmploiSubQuestion"
            :extraClass="isMissingAndRequired('currentSituation.compensationType') ? 'is-danger' : ''"
            :value="currentSituation.compensationType"
            :click="addCurrentSituationCompensationType"
            :options="compensationType"
          />
        </div>
      </div>
      <IdentitySaveButtons to="/mon-compte/lieu-de-residence" />
    </div>
  </div>
</template>

<script>
  import get from 'lodash.get';
  import {include} from 'avril/js/utils/array';
  import {isBlank} from 'avril/js/utils/boolean';
  import { parseISODate, formatISODate } from 'avril/js/utils/time';
  import RadioList from 'avril/js/components/RadioList.vue';

  import possibleAnswers from '~/contents/data/currentSituation';
  import IdentitySaveButtons from '~/components/IdentitySaveButtons.vue';
  import DatePicker from 'avril/js/components/DatePicker.vue';

  export default {
    components: {
      RadioList,
      IdentitySaveButtons,
      DatePicker,
    },
    computed: {
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
      isMissingAndRequired: function(field) {
        const missingFields = this.$store.getters['identity/missingFields'];
        return missingFields.includes(field);
      },
    },
  }
</script>