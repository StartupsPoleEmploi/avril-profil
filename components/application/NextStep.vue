<template>
  <div class="avril-next-step notification is-info" v-if="title && button">
    <div class="columns is-mobile is-vcentered">
      <div class="column">
        <p><span>Prochaine étape {{isSuggested ? 'conseillée' : ''}}</span><span v-if="time"> - {{time}}</span></p>
        <h2 class="title is-2">{{title}}</h2>
        <p>{{description}}</p>
        <nuxt-link v-if="to" :to="to(application)" class="button is-info is-inverted is-rounded">{{button}}</nuxt-link>
        <a v-if="href" :href="href(application)" class="button is-info is-inverted is-rounded">{{button}}</a>
      </div>
      <div class="column is-narrow is-hidden-mobile">
        <img :src="`images/next-step/${illustration}.svg`" alt="Illustration de la prochaine étape" class="illustration">
      </div>
    </div>
  </div>
</template>

<script>
  import nextStepsData from '~/contents/data/applicationNextSteps';

  export default {
    data: function() {
      const key = this.$store.getters.nextApplicationStep(this.application);
      return Object.assign({
        href: null,
        to: null,
        time: null,
      }, nextStepsData[key]);
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
