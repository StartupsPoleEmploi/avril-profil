<template>
  <div>
    <div v-if="isIndex">
      <BackButton v-if="applications.length > 1" label="Mes candidatures" to="/mes-candidatures" />
    </div>
    <div v-else>
      <BackButton :label="`Ma candidature ${application.certification.name}`" :to="`/mes-candidatures/${application.slug}`" />
    </div>

    <Message v-if="meetings.length" type="is-success">
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
        <button class="button is-success is-inverted is-rounded">Valider le rendez-vous</button>
      </div>
      <div v-else>
        <h3 class="title is-4">Nous avons trouvé une réunion d'information près de chez vous</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <button @click="selectMeeting" class="button is-success is-inverted is-rounded">Choisir une date</button>
      </div>
    </Message>

    <nuxt-child :application="application"/>
  </div>
</template>

<script>
  import get from 'lodash.get';
  import BackButton from '~/components/BackButton.vue';
  import Message from '~/components/Message.vue';

  export default {
    components: {
      BackButton,
      Message,
    },
    computed: {
      applications() {
        return this.$store.state.applications
      },
      application() {
        return this.applications.find(a => a.slug === this.$route.params.slug)
      },
      delegate: function() {
        return get(this.application, 'delegate', {})
      },
      meetings: function() {
        return get(this.application, 'delegate.meetings', [])
      },
      isIndex: function() {
        return this.$route.fullPath === `/mes-candidatures/${this.application.slug}`;
      }
    },
    data: function() {
      return {
        meetingSelect: false,
        meetingDate: null,
        meetingPlace: null,
      }
    },
    methods: {
      selectMeeting: function() {
        this.meetingSelect = true;
      },
    },
  }
</script>


