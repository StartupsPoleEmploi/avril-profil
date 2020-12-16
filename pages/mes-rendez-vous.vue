<template>
  <div>
    <BackButton label="Mes candidatures" to="/" />
    <div class="identite">
      <div class="columns">
        <div class="column is-8">
          <h1 class="title h1 is-spaced">Mes rendez-vous</h1>
          <p class="subtitle">
            Participez à une réunion d'information sur la VAE.
          </p>

          <div class="contents" v-if="meetings.length === 0">
            <p>Vous ne vous êtes inscrit à aucune réunion d'information pour le moment.</p>
          </div>
          <div v-else>
            <div class="content">
              <p>Vous êtes inscrit à {{pluralize(meetings.length, 'réunion')}} d'information :</p>
            </div>

            <ul class="columns is-multiline">
              <li class="column is-6" v-for="m in meetings">
                <div class="card">
                  <div class="card-header">
                    <h4 class="title is-5">{{m.name }}</h4>
                  </div>
                  <div class="card-content">
                    <p>
                      {{m.address}} {{m.city}}
                    </p>
                  </div>
                  <div class="card-footer">
                    {{capitalize(formatInterval(m.startDate, m.endDate))}}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {pluralize, capitalize} from 'avril/js/utils/string';
  import BackButton from '~/components/BackButton.vue';

  import { formatInterval, parseISODate } from 'avril/js/utils/time';

  export default {
    computed: {
      meetings: function() {
        return this.$store.state.applications.applications.filter(a => a.meeting).map(a => ({
          ...a.meeting,
          name: a.meeting.name || a.delegate.name,
        }))
      },
    },
    components: {
      BackButton,
    },
    methods: {
      pluralize,
      capitalize,
      formatInterval: function(d1, d2) {
        if (!d1 || !d2) return;
        return formatInterval(parseISODate(d1), parseISODate(d2));
      },
    }
  }
</script>
