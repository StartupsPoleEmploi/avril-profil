<template>
  <div class="meeting-selector">
    <Message v-if="!isMeetingsDisabled && !application.meeting && meetings.length" type="success" size="large" :onRemove="disableMeetings">
      <div v-if="meetingSelect">
        <h3 class="title is-4">Où et quand souhaitez-vous venir vous informer sur la VAE ?</h3>
        <div class="columns is-vcentered">
          <div class="column is-4">
            <div class="select is-medium is-fullwidth">
              <select v-model="meetingPlace">
                <option :value="null">Le lieu</option>
                <option v-for="p in meetingPlaces" :value="p">{{p}}</option>
              </select>
            </div>
          </div>
          <div class="column is-4">
            <div class="select is-medium is-fullwidth">
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
          <span>Vous souhaitez vous inscrire à la réunion d'information {{selectedMeeting.place}} :
          {{formatInterval(selectedMeeting.startDate, selectedMeeting.endDate)}}</span>
          <span v-if="selectedMeeting.address">à {{selectedMeeting.address}} {{selectedMeeting.postalCode}} {{selectedMeeting.city}}</span>.
        </p>
      </div>
      <div class="columns" v-else>
        <div class="column is-half">
          <h3 class="title is-4">Votre certificateur vous propose une réunion d'information</h3>
          <button @click="selectMeeting" class="button is-success is-inverted is-rounded">Choisir une date</button>
        </div>
        <div class="column is-half content">
          <p>La réunion vous permettra d'obtenir des informations précises, de rencontrer votre certificateur et de prendre connaissance de ses dispositions particulières.</p>
          <a @click="disableMeetings" >Je n'en ai pas besoin, je connais déjà la VAE</a>
        </div>
      </div>
    </Message>
  </div>
</template>

<script type="text/javascript">
  import get from 'lodash.get';
  import { formatInterval, parseISODate } from 'avril/js/utils/time';
  import { queryApi, mutateApi } from 'avril/js/utils/api';
  import Message from '~/components/Message.vue';
  import { delegateId, meetingPlace } from '~/utils/application';
  export default {
    components: {
      Message,
    },
    computed: {
      meetingPlaces: function() {
        return this.meetings.map(meetingPlace).reduce((places, place) => {
          const existing = places.find(p => p === place)
          return places.concat(existing ? [] : [place]);
        }, []);
      },
      filteredMeetings: function() {
        return this.meetings
          .filter(m => meetingPlace(m) === this.meetingPlace)
          .sort((m1, m2) => parseISODate(m1.startDate) > parseISODate(m2.startDate) ? 1 : -1)
      },
      selectedMeeting: function() {
        return this.meetings.find(m => m.meetingId === this.meetingId)
      },
    },
    data: function() {
      return {
        meetings: [],
        isMeetingsDisabled: false,
        meetingSelect: false,
        meetingId: null,
        meetingName: null,
        meetingPlace: null,
      }
    },
    methods: {
      disableMeetings: function() {
        this.isMeetingsDisabled = true;
      },
      formatInterval: function(d1, d2) {
        if (!d1 || !d2) return;
        return formatInterval(parseISODate(d1), parseISODate(d2));
      },
      selectMeeting: function() {
        this.meetingSelect = true;
      },
      validateMeeting: async function() {
        try {
          const application = await mutateApi({
            name: 'registerMeeting',
            params: {
              input: {
                applicationId: this.application.id,
                meetingId: this.meetingId,
              }
            },
            type: 'application',
          });
          this.$store.dispatch('applications/updateAndInform', {
            ...application
          });
          this.$store.commit('setFeedback', {
            message: 'Inscription à la réunion d\'information bien enregistrée.',
          })
        } catch(err) {
          this.$store.commit('setApiErrorFeedback', {err, message: 'Une erreur est survenue'});
        }
      },
    },
    mounted: async function() {
      this.meetings = await queryApi({
        name: 'meetingsSearch',
        params: {
          delegateId: delegateId(this.application),
        },
        type: 'meeting',
      });
    },
    props: {
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