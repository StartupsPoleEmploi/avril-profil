<template>
  <div>
    <BackButton label="Mon espace" to="/" />
    <div class="identite">
      <div class="columns">
        <div class="column is-8">
          <h1 class="title h1 is-spaced">Mon identité</h1>
          <p class="subtitle">
            Tous ces éléments sont indispensables pour lier le diplôme à votre identité. <br />
            Sans elles, il est impossible de garantir votre identité.
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-8">
          <div class="tags">
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-identite">Profil</nuxt-link>
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-identite/situation-professionnelle">Situation professionnelle</nuxt-link>
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-identite/lieu-de-residence">Lieu de résidence</nuxt-link>
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-identite/me-joindre">Me joindre</nuxt-link>
          </div>
          <nuxt-child />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BackButton from '~/components/BackButton.vue'

  export default {
    computed: {
      profile() {
        return this.$store.state.profile
      },
    },
    components: {
      BackButton,
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
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
</style>