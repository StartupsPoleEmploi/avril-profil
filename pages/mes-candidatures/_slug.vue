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
  import BackButton from '~/components/BackButton.vue';

  import {name, levelToLevelLabel} from '~/utils/certification';
  import {path} from '~/utils/application';

  export default {
    components: {
      BackButton,
    },
    computed: {
      applications() {
        return this.$store.state.applications
      },
      application() {
        return this.applications.find(a => get(a, 'certification.slug') === this.$route.params.slug);
      },
      applicationPath() {
        return path(this.application);
      },
      applicationsPath() {
        return path();
      },
      certificationName: function() {
        return name(get(this.application, 'certification', {}));
      },
      isIndex: function() {
        return this.$route.fullPath === this.applicationPath;
      },
    },
  }
</script>