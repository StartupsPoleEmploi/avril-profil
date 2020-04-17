<template>
  <div class="meeting-selector">
    <Message v-if="meetings.length" type="success" size="large" :onRemove="validateMeeting">
      <div v-if="meetingSelect">
        <h3 class="title is-4">Où et quand souhaitez-vous venir vous informer sur la VAE ?</h3>
        <div class="columns is-vcentered">
          <div class="column is-4">
            <div class="select is-large is-fullwidth">
              <select @change="filterMeetings">
                <option :value="null">Le lieu</option>
                <option v-for="m in meetings" :value="m.name">{{m.name}}</option>
              </select>
            </div>
          </div>
          <div class="column is-4">
            <div class="select is-large is-fullwidth">
              <select v-model="meetingId">
                <option :value="null">La date</option>
                <option v-for="m in filteredMeetings" :value="m.meetingId">{{formatInterval(m.startDate, m.endDate)}}</option>
              </select>
            </div>
          </div>
          <div class="column is-4">
            <button class="button is-success is-inverted is-rounded is-fullwidth" style="justify-content: center;" @click="validateMeeting" :disabled="!meetingId">Valider le rendez-vous</button>
          </div>
        </div>
        <p class="content" v-if="selectedMeeting">
          Vous souhaitez vous inscrire à la réunion d'information {{selectedMeeting.name}} :
          {{formatInterval(selectedMeeting.startDate, selectedMeeting.endDate)}} à {{selectedMeeting.address}} {{selectedMeeting.city}}.
        </p>
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
  </div>
</template>

<script type="text/javascript">
  import get from 'lodash.get';
  import { formatInterval, parseISODate } from 'avril/js/utils/time';
  import { queryApi, mutateApi } from '~/utils/api';
  import Message from '~/components/Message.vue';

  export default {
    components: {
      Message,
    },
    computed: {
      filteredMeetings: function() {
        return get(this.meetings.find(m => m.name === this.meetingName), 'meetings', null)
      },
      selectedMeeting: function() {
        return this.meetings.reduce((found, {name, meetings}) => {
          const justFound = meetings.find(_m => _m.meetingId === this.meetingId)
          return found || (justFound ? {name, ...justFound} : null)
        }, null);
      },
    },
    data: function() {
      return {
        meetingSelect: false,
        meetingId: null,
        meetingName: null,
      }
    },
    methods: {
      formatInterval: function(d1, d2) {
        if (!d1 || !d2) return;
        return formatInterval(parseISODate(d1), parseISODate(d2));
      },
      selectMeeting: function() {
        this.meetingSelect = true;
      },
      filterMeetings: function(e) {
        const value = e.target.value;
        if (value !== this.meetingName) {
          this.meetingName = value;
          this.meetingId = null;
        }
      },
      validateMeeting: async function() {
        const result = await mutateApi({
          name: 'registerMeeting',
          params: {
            applicationId: this.application.id,
            meetingId: this.meetingId,
          },
          type: 'application',
        });
        this.$store.dispatch('applications/updateAndInform', result);
      },
    },
    props: {
      meetings: {
        type: Array,
        default: [],
        isRequired: true,
      },
      application: {
        type: Object,
        isRequired: true,
      },
    }
  }
</script>

<style lang="scss" scoped>
  .meeting-selector {
    .notification {
      margin-bottom: 2rem;
    }
  }
</style>