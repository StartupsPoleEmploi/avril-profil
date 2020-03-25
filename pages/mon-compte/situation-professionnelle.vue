<template>
  <div class="form">
    <div class="form-fields fields">
      <div class="field">
        <h3 class="title is-6">Je suis reconnu travailleur handicapé :</h3>
        <RadioList
          :value="profile.isHandicapped"
          :click="addIsHandicapped"
          boolean
          inline
        />
      </div>
      <div class="field">
        <h3 class="title is-6">Je suis actuellement en :</h3>
        <RadioList
          key="statusQuestion"
          :value="profile.currentSituationStatus"
          :options="status"
          :click="addCurrentSituationStatus"
        />
      </div>

      <div class="field" v-if="isWorking">
        <h3 class="title is-6">Avec quel statut ?</h3>
        <RadioList
          key="workingSubQuestion"
          :value="profile.currentSituationEmploymentType"
          :options="employmentType"
          :click="addCurrentSituationEmploymentType"
        />
      </div>
      <div class="field" v-if="isJobSeeking">
        <h3 class="title is-6">Je suis inscrit à Pôle emploi :</h3>
        <RadioList
          key="jobseekingSubQuestion"
          :value="profile.currentSituationRegisterToPoleEmploi"
          :click="addCurrentSituationRegisterToPoleEmploi"
          boolean
          inline
        />
      </div>
      <div v-if="isJobSeeking && currentSituationRegisterToPoleEmploi">
        <div class="field">
          <h3 class="title is-6">Depuis le :</h3>
          <div class="control">
            <client-only placeholder="Chargement du calendrier ...">
              <date-picker :value="profile.currentSituationRegisterToPoleEmploiSince" @input="addCurrentSituationRegisterToPoleEmploiSince" :format="datePickerFormat" :placeholder="defaultPlaceholder" />
            </client-only>
          </div>
        </div>
        <div class="field">
          <h3 class="title is-6">Je suis indemnisé :</h3>
          <RadioList
            key="poleEmploiSubQuestion"
            :value="profile.currentSituationCompensationType"
            :click="addCurrentSituationCompensationType"
            :options="compensationType"
          />
        </div>
      </div>
      <div class="form-field-action field">
        <div class="control">
          <button type="submit" class="button is-primary is-rounded is-medium">Enregistrer</button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import get from 'lodash.get';
  import RadioList from 'avril/js/components/RadioList.vue';

  import possibleAnswers from '~/contents/data/currentSituation';

  export default {
    components: {
      RadioList,
    },
    computed: {
      profile() {
        return this.$store.state.profile
      },
      currentSituationStatus() {
        return get(this.$store.state.profile, 'currentSituation.status');
      },
      isWorking() {
        return this.currentSituationStatus === 'working'
      },
      isJobSeeking() {
        return this.currentSituationStatus === 'jobseeking'
      },
    },
    data() {
      // const {
      //   status,
      //   employmentType,
      //   compensationType,
      // } = possibleAnswers;
      // console.log(possibleAnswers)
      // return {
      //   status,
      //   employmentType,
      //   compensationType,
      // }


      return possibleAnswers;
    },
    methods: {
      addIsHandicapped: function(value){},
      addCurrentSituationStatus: function(value){},
      addCurrentSituationEmploymentType: function(value){},
      addCurrentSituationRegisterToPoleEmploi: function(value){},
      addCurrentSituationCompensationType: function(value){},
    },
  }
</script>