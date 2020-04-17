<template>
  <div>
    <BackButton label="Mon espace" to="/" />
    <Message v-if="!hasIdentity" type="is-success">
      <h3 class="title is-4">Renseigner votre identité est obligatoire pour toutes vos candidatures</h3>
      <nuxt-link to="/mon-compte" class="button is-success is-inverted is-rounded">Renseigner mon identité</nuxt-link>
    </Message>
    <ApplicationCard :application="firstApplication" />
    <div class="columns is-multiline" v-if="otherApplications.length">
      <div class="column" v-for="application in otherApplications">
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
  import {path} from '~/utils/application';
  import BackButton from '~/components/BackButton.vue';

  export default {
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
      BackButton,
      Message,
      IconPencil,
    },
    methods: {
      formatDate,
    },
  }
</script>