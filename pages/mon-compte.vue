<template>
  <div>
    <BackButton label="Mes candidatures" to="/" />
    <div class="identite">
      <div class="columns">
        <div class="column is-12 is-11-desktop is-10-widescreen is-9-hd">
          <h1 class="title h1 is-spaced">Mon compte</h1>
          <p class="subtitle">
            Tous ces éléments sont indispensables pour votre candidature.
          </p>
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

  export default {
    components: {
      BackButton,
    },
  }
</script>

<style lang="scss" scoped>
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