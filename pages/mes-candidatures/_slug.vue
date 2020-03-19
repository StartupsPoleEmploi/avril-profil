<template>
  <div>
    <BackButton label="Mes candidatures" to="/mes-candidatures" />
    <header class="candidature">
      <div class="level">

        <div class="level-left has-text-left">
          <div class="level-item">
            <div>
              <h1 class="title h1">{{application.certificationLabel}}</h1>
              <div class="label-avril">Équivalence {{application.certificationLevel}}</div>
            </div>
          </div>
        </div>

        <div class="level-right">
          <span class="tag is-blue">à compléter</span>
        </div>
      </div>
    </header>

    <Message type="is-info"/>

    <nuxt-child :application="application"/>
  </div>
</template>

<script>
import {
  apiPath,
  fetchOrRedirectToSignIn,
} from '~/utils/url';

import BackButton from '~/components/BackButton.vue'
import CandidatureHeader from '~/components/candidature/Header.vue'
import Message from '~/components/Message.vue'

  export default {
    components: {
      BackButton,
      CandidatureHeader,
      Message
    },
    computed: {
      application() {
        return this.$store.state.applications.find(a => a.slug === this.$route.params.slug)
      },
    },
    // async asyncData (context) {
    //   const result = await fetchOrRedirectToSignIn(apiPath('application', context.params), context)
    //   const application = result.data;
    //   console.log(application)
    //   return {application};
    // },
  }
</script>

<style type="text/css" scoped>
  .candidature {
    margin-bottom: 2rem
  }
  .level-item {
    justify-content: flex-start
  }
</style>
