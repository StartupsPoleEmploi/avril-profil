<template>
  <div>
    <Message v-if="!hasIdentity" type="is-success">
      <h3 class="title is-4">Renseigner votre identité est obligatoire pour toutes vos candidatures</h3>
      <nuxt-link to="/mon-compte" class="button is-success is-inverted is-rounded">Renseigner mon identité</nuxt-link>
    </Message>

    <div class="">
      <div class="candidatures-card">
          <div class="level">
            <div class="level-left has-text-left">
              <div class="level-item">
                <div>
                  <nuxt-link :to="`/mes-candidatures/${applications[0].slug}`"><h3 class="title is-3">{{applications[0].certificationLabel}}</h3></nuxt-link>
                </div>
                <div>
                  <div class="label-avril">Équivalence CAP BEP</div>
                </div>
              </div>
            </div>

            <div class="level-right">
              <span class="tag is-info">à compléter</span>
            </div>

          </div>

          <p>Candidature démarrée le {{formatDate(applications[0].createdAt)}}</p>

          <nuxt-link :to="`/mes-candidatures/${applications[0].slug}`" class="is-small edit-button is-rounded">
            <span>Compléter...</span>
          </nuxt-link>

      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column is-4" v-for="(application, idx) in applications" v-if="idx != 0">

        <div class="candidatures-card small-card">
          <div class="">

            <div class="level">

              <div class="level-left has-text-left">
                <div class="level-item">
                  <nuxt-link :to="`/mes-candidatures/${application.slug}`"><h3 class="title is-5">{{application.certificationLabel}}</h3></nuxt-link>
                  <div class="label-avril">Équivalence CAP BEP</div>
                </div>
              </div>

              <div class="level-right">
                <span class="tag is-info">à compléter</span>
              </div>
            </div>

          </div>
          <p>Candidature démarrée le {{formatDate(application.createdAt)}}</p>

          <nuxt-link :to="`/mes-candidatures/${application.slug}`" class="is-small edit-button is-rounded">
            <span>Compléter...</span>
          </nuxt-link>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import {formatDate} from 'avril/js/utils/time.js';
  import Message from '~/components/Message.vue'
  import IconPencil from '~/components/icons/pencil.svg';

  export default {
    beforeCreate() {
      if (this.$store.state.applications.length == 1) {
        this.$router.push(`/mes-candidatures/${this.$store.state.applications.first().slug}`);
      }
    },
    computed: {
      hasIdentity() {
        return this.$store.getters['profile/isFilled'];
      },
      applications() {
        return this.$store.state.applications;
      },
    },
    components: {
      Message,
      IconPencil
    },
    methods: {
      formatDate,
    },
  }
</script>
<style scoped lang="scss">
.small-card {
  padding-bottom: 1rem;
  .level{
    display: block;
    &-left, &-right {
      display: block;
    }
  }
  .tag {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
.edit-button {
  margin-top: 2rem;
  margin-left: auto;
  background: transparent;
  display: block;
  text-decoration: underline;
}
</style>
