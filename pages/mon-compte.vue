<template>
  <div>
    <BackButton label="Mes candidatures" to="/" />
    <div class="identite">
      <div class="columns">
        <div class="column is-12 is-11-desktop is-10-widescreen is-9-hd">
          <h1 class="title h1 is-spaced">Mon compte</h1>
          <p class="subtitle">
            Tous ces éléments sont indispensables pour lier le diplôme à votre identité. <br />
            Sans elles, il est impossible de garantir votre identité.
          </p>
          <SavedMessage :message="savedMessage" :removeMessage="removeSavedMessage" />
          <div class="tags">
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-compte">Profil</nuxt-link>
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-compte/situation-professionnelle">Situation professionnelle</nuxt-link>
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-compte/lieu-de-residence">Lieu de résidence</nuxt-link>
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-compte/me-joindre">Me joindre</nuxt-link>
          </div>
          <nuxt-child />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BackButton from '~/components/BackButton.vue'
  import SavedMessage from '~/components/SavedMessage.vue'

  export default {
    components: {
      BackButton,
      SavedMessage,
    },
    computed: {
      savedMessage: function() {
        if (this.$store.state.identity.isServerData)
          return this.$store.state.identity.savedMessage;
      }
    },
    mounted: function() {
      this.$store.commit('identity/removeSavedMessage');
    },
    methods: {
      removeSavedMessage: function() {
        this.$store.commit('identity/removeSavedMessage');
      },
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
  .tags {
    margin-bottom: 2rem;
    .tag {
      text-transform: none;
      &.is-togglable {
        &:not(.is-active) {
          background: transparent;
          color: initial;
          &:hover {
            background: rgba(0, 0, 0, 0.05);
          }
        }
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
</style>