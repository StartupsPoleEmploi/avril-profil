<template>
  <div class="avril-next-step notification is-info" v-if="nextStep">
    <div class="columns is-mobile is-vcentered">
      <div class="column">
        <p><span>Prochaine étape {{nextStep.isSuggested ? 'conseillée' : ''}}</span><span v-if="nextStep.time"> - {{nextStep.time}}</span></p>
        <h2 class="title is-2">{{nextStep.title}}</h2>
        <p>{{nextStep.description}}</p>
        <ApiButton
          v-if="nextStep.api"
          v-bind="nextStep.api(application)"
          class="button is-info is-inverted is-rounded"
        >{{nextStep.button}}</ApiButton>
        <nuxt-link v-if="nextStep.to" :to="nextStep.to(application)" class="button is-info is-inverted is-rounded">{{nextStep.button}}</nuxt-link>
        <a v-if="nextStep.href" :href="nextStep.href(application)" class="button is-info is-inverted is-rounded">{{nextStep.button}}</a>
      </div>
      <div class="column is-narrow is-hidden-mobile">
        <img :src="`images/next-step/${nextStep.illustration}.svg`" alt="Illustration de la prochaine étape" class="illustration">
      </div>
    </div>
  </div>
</template>

<script>
  import nextStepsData from '~/contents/data/applicationNextSteps';
  import ApiButton from '~/components/ApiButton';

  export default {
    components: {
      ApiButton,
    },
    computed: {
      nextStep: function() {
        const key = this.$store.getters.nextApplicationStep(this.application);
        return nextStepsData[key];
      }
    },
    props: {
      application: {
        type: Object,
      }
    },
  }
</script>
<style scoped lang="scss">
  .avril-next-step {
    padding: 2rem;
    border-radius: 6px;
    position: relative;
  }
  .button {
    margin-top: 1rem;
  }
</style>
