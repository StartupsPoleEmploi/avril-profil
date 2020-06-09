<template>
  <div class="avril-next-step notification is-info" :class="nextStep.color ? `is-${nextStep.color}` : ''" v-if="nextStep">
    <div class="columns is-mobile is-vcentered">
      <div class="column">
        <p v-if="!nextStep.isLast"><span>Prochaine étape {{nextStep.isSuggested ? 'conseillée' : ''}}</span><span v-if="nextStep.time"> - {{nextStep.time}}</span></p>
        <h2 class="title is-2">{{nextStep.title}}</h2>
        <p>
          {{nextStep.description}}
        </p>
        <div v-if="nextStep.isLast" style="margin-top: 1rem;">
          <h5 class="title is-6" style="margin: 0;">{{application.delegate.name}}</h5>
          <Address :address="delegateAddress" />
          <p><a :href="`mailto:${application.delegate.email}`">{{application.delegate.email}}</a></p>
          <p><a :href="`tel:${application.delegate.telephone}`">{{application.delegate.telephone}}</a></p>
        </div>
        <ApiButton
          v-if="nextStep.api"
          v-bind="nextStep.api(application)"
          class="button is-info is-inverted is-rounded"
          :analytics="nextStep.analytics"
        >{{nextStep.button}}</ApiButton>
        <nuxt-link v-else-if="nextStep.to" :to="nextStep.to(application)" class="button is-info is-inverted is-rounded">{{nextStep.button}}</nuxt-link>
        <a v-else-if="nextStep.href" :href="nextStep.href(application)" class="button is-info is-inverted is-rounded">{{nextStep.button}}</a>
      </div>
      <div class="column is-narrow is-hidden-mobile">
        <img :src="`images/next-step/${nextStep.illustration}.svg`" :alt="!nextStep.isLast ? 'Illustration de la prochaine étape' : ''" class="illustration">
      </div>
    </div>
  </div>
</template>

<script>
  import get from 'lodash.get';
  import nextStepsData from '~/contents/data/applicationNextSteps';
  import ApiButton from '~/components/ApiButton';
  import Address from '~/components/Address';
  export default {
    components: {
      ApiButton,
      Address,
    },
    computed: {
      nextStep: function() {
        const key = this.$store.getters.nextApplicationStep(this.application);
        return nextStepsData[key];
      },
      delegateAddress: function() {
        return get(this.application, 'delegate.address', {});
      },
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
