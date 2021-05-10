<template>
  <div class="candidature-detail">
    <h2 class="title is-2 is-spaced">{{delegateName}}</h2>
    <p class="subtitle" >Informations spécifiques de mon certificateur</p>
    <div class="content-wrapper">
      <div class="content" v-if="delegateInfos" v-html="delegateInfos" />
      <div class="content" v-if="certifierInfos" v-html="certifierInfos" />
    </div>
    <nuxt-link class="button is-primary is-rounded" :to="applicationPath">J'ai bien consulté ces informations</nuxt-link>
  </div>
</template>

<script type="text/javascript">
  import {
    delegateName,
    delegateInfos,
    certifierInfos,
    path,
  } from '~/utils/application';

  export default {
    computed: {
      delegateName() {
        return delegateName(this.application);
      },
      delegateInfos() {
        return delegateInfos(this.application);
      },
      certifierInfos() {
        return certifierInfos(this.application);
      },
      applicationPath: function() {
        return path(this.application);
      },
    },
    props: {
      application: {
        type: Object
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '~avril/scss/variables';

  .content-wrapper {
    font-family: $family-serif;
    background: white;
    padding: 2rem;
    margin-bottom: 2rem;
  }
</style>