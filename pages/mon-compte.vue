<template>
  <div>
    <BackButton label="Mon espace" to="/" />
    <div class="identite">
      <div class="columns">
        <div class="column is-12 is-11-desktop is-9-widescreen is-8-hd">
          <h1 class="title h1 is-spaced">Mon identité</h1>
          <p class="subtitle">
            Tous ces éléments sont indispensables pour lier le diplôme à votre identité. <br />
            Sans elles, il est impossible de garantir votre identité.
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-9">
          <div class="tags">
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-compte">Profil</nuxt-link>
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-compte/situation-professionnelle">Situation professionnelle</nuxt-link>
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-compte/lieu-de-residence">Lieu de résidence</nuxt-link>
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-compte/me-joindre">Me joindre</nuxt-link>
            <nuxt-link class="tag is-rounded is-primary is-medium is-togglable" to="/mon-compte/mot-de-passe">Mot de passe</nuxt-link>
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