<template>
  <div>
    <div v-if="isIndex">
      <BackButton v-if="applications.length > 1" label="Mes candidatures" :to="applicationsPath" />
    </div>
    <div v-else>
      <BackButton :label="`Ma candidature ${certificationName}`" :to="applicationPath" />
    </div>
    <nuxt-child :application="application"/>
  </div>
</template>

<script>
  import get from 'lodash.get';
  import {first} from 'avril/js/utils/array';
  import BackButton from '~/components/BackButton.vue';

  import {path, currentApplication, certificationName} from '~/utils/application';

  export default {
    components: {
      BackButton,
    },
    computed: {
      applications() {
        return this.$store.state.applications.applications;
      },
      application() {
        return currentApplication(this.applications, this.$route.params.slug);
      },
      applicationPath() {
        return path(this.application);
      },
      applicationsPath() {
        return path();
      },
      certificationName: function() {
        return certificationName(this.application);
      },
      isIndex: function() {
        return this.$route.fullPath === this.applicationPath;
      },
    },
    asyncData: async function(context) {
      console.log('async data called')
      const application = currentApplication(context.store.state.applications.applications, context.params.slug);
      if (!application) {
        context.redirect(path());
      }
      return {}
    },
  }
</script>