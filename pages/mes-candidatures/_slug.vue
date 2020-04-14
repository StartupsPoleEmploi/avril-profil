<template>
  <div>
    <div v-if="isIndex">
      <BackButton v-if="applications.length > 1" label="Mes candidatures" :to="applicationsPath" />
    </div>
    <div v-else>
      <BackButton :label="`Ma candidature ${certificationName}`" :to="applicationPath" />
    </div>

    <Message v-if="meetings.length" type="is-success" :onRemove="validateMeeting">
      <div v-if="meetingSelect">
        <h3 class="title is-4">Où et quand souhaitez-vous venir vous informer sur la VAE ?</h3>
        <p>
          <div class="select is-large">
            <select v-model="meetingPlace">
              <option :value="null">Le lieu</option>
            </select>
          </div>
          <div class="select is-large">
            <select v-model="meetingDate">
              <option :value="null">La date</option>
            </select>
          </div>
        </p>
        <button class="button is-success is-inverted is-rounded" @click="validateMeeting">Valider le rendez-vous</button>
      </div>
      <div class="columns" v-else>
        <div class="column is-half">
          <h3 class="title is-4">Votre certificateur vous propose une réunion d'information</h3>
          <button @click="selectMeeting" class="button is-success is-inverted is-rounded">Choisir une date</button>
        </div>
        <div class="column is-half content">
          <p>La réunion vous permettra d'obtenir des informations précises, de rencontrer votre certificateur et de prendre connaissance de ses dispositions particulières.</p>
          <a @click="validateMeeting" >Je n'en ai pas besoin, je connais déjà la VAE</a>
        </div>
      </div>
    </Message>

    <nuxt-child :application="application"/>
  </div>
</template>

<script>
  import get from 'lodash.get';
  import BackButton from '~/components/BackButton.vue';
  import Message from '~/components/Message.vue';

  import {name, levelToLevelLabel} from '~/utils/certification';
  import {path} from '~/utils/application';
  import { queryApi, mutateApi } from '~/utils/api';

  export default {
    components: {
      BackButton,
      Message,
    },
    computed: {
      applicationPath() {
        return path(this.application);
      },
      applicationsPath() {
        return path();
      },
      certificationName: function() {
        return name(this.application, 'certification');
      },
      isIndex: function() {
        return this.$route.fullPath === this.applicationPath;
      }
    },
    data: function() {
      return {
        meetingSelect: false,
        meetingDate: null,
        meetingPlace: null,
      }
    },
    asyncData: async function(context) {
      const {store, params} = context;
      const applications = store.state.applications;
      const application = applications.find(a => a.certification.slug === params.slug);
      const delegate_id = get(application, 'delegate.id');

      const meetings = await queryApi({
        name: 'meetings',
        params: {
          delegate_id,
        },
        // static: true,
      }, context)
      return {
        applications,
        application,
        meetings,
      }
    },
    methods: {
      selectMeeting: function() {
        this.meetingSelect = true;
      },
      validateMeeting: function() {

      },
    },
  }
</script>


