<template>
  <div>
    <Message v-if="!hasIdentity" type="is-success">
      <h3 class="title is-4">Renseigner votre identité est obligatoire pour toutes vos candidatures</h3>
      <nuxt-link to="/mon-compte" class="button is-success is-inverted is-rounded">Renseigner mon identité</nuxt-link>
    </Message>
    <ApplicationCard :application="firstApplication" />
    <div class="columns is-multiline" v-if="otherApplications.length">
      <div class="column is-4" v-for="application in otherApplications">
        <ApplicationCard size="small" :application="application" />
      </div>
    </div>
  </div>
</template>

<script>
  import {first} from 'avril/js/utils/array';
  import {formatDate} from 'avril/js/utils/time.js';
  import Message from '~/components/Message.vue'
  import ApplicationCard from '~/components/ApplicationCard.vue'
  import IconPencil from '~/components/icons/pencil.svg';

  export default {
    mounted() {
      if (this.applications.length === 1) {
        return this.$router.push({
            path: `/mes-candidatures/${this.applications[0].certification.slug}`
        })
      }
    },
    computed: {
      hasIdentity() {
        return this.$store.getters['identity/isFilled'];
      },
      applications() {
        return this.$store.state.applications;
      },
      firstApplication() {
        return first(this.applications);
      },
      otherApplications() {
        return this.applications.filter((a, i) => i);
      },
    },
    components: {
      ApplicationCard,
      Message,
      IconPencil,
    },
    methods: {
      formatDate,
    },
  }
</script>