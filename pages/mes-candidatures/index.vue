<template>
  <div>
    <Message type="is-success">
      <h3 class="title is-4">Renseigner votre identité est obligatoire pour toutes vos candidatures</h3>
      <button class="button is-success is-inverted is-rounded">Renseigner mon identité</button>
    </Message>

    <div class="">
      <div class="candidatures-card">
        <div class="">

          <div class="level">

            <div class="level-left has-text-left">
              <div class="level-item">
                <div>
                  <nuxt-link :to="`/mes-candidatures/${applications[0].slug}`"><h3 class="title is-3">{{applications[0].certificationLabel}}</h3></nuxt-link>
                  <div class="label-avril">Équivalence CAP BEP</div>
                </div>
              </div>
            </div>

            <div class="level-right">
              <span class="tag is-blue">à compléter</span>
            </div>
          </div>

        </div>
        <p>VAE démarrée le {{formatDate(applications[0].createdAt)}}</p>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column is-4" v-for="(application, idx) in applications" v-if="idx != 0">

        <div class="candidatures-card">
          <div class="">

            <div class="level">

              <div class="level-left has-text-left">
                <div class="level-item">
                  <div>
                    <nuxt-link :to="`/mes-candidatures/${applications[0].slug}`"><h3 class="title is-3">{{applications[0].certificationLabel}}</h3></nuxt-link>
                    <div class="label-avril">Équivalence CAP BEP</div>
                  </div>
                </div>
              </div>

              <div class="level-right">
                <span class="tag is-blue">à compléter</span>
              </div>
            </div>

          </div>
          <p>VAE démarrée le {{formatDate(applications[0].createdAt)}}</p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import {formatDate} from '~/utils/time.js';
  import Message from '~/components/Message.vue'

  export default {
    beforeCreate() {
      if (this.$store.state.applications.length == 1) {
        this.$router.push(`/mes-candidatures/${this.$store.state.applications.first().slug}`);
      }
    },
    computed: {
      applications() {
        return this.$store.state.applications
      },
    },
    components: {
      Message
    },
    methods: {
      formatDate,
    },
  }
</script>
