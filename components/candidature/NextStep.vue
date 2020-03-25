<template>
  <div class="avril-next-step level notification is-info" v-if="title && button">
    <div class="level-left">
      <div class="level-item">
        <div>
          <p><span>Prochaine étape {{isOptional ? 'conseillée' : ''}}</span><span v-if="time"> - {{time}}</span></p>
          <h2 class="title is-2">{{title}}</h2>
          <p>{{description}}</p>
          <nuxt-link v-if="to" :to="to(application)" class="button is-info is-inverted is-rounded">{{button}}</nuxt-link>
          <a v-if="href" :href="href(application)" class="button is-info is-inverted is-rounded">{{button}}</a>
        </div>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <img :src="`/images/next-step/${illustration}.svg`" alt="Illustration de la prochaine étape" class="illustration">
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
  @import '~bulma/sass/utilities/all';
  .avril-next-step {
    padding: 2rem;
    border-radius: 6px;
    position: relative;
  }
  .level-item {
    @include desktop {
      justify-content: flex-start;
    }
  }
  .button {
    margin-top: 1rem;
  }
  .illustration {
    position: absolute;
    @include until( $tablet + 10 ) {
      display: none;
    }
    @include desktop {
      top: -20px;
      right: 30px;
    }
    @include until( $desktop + 100 ){
      right: -30px;
    }
  }
</style>
