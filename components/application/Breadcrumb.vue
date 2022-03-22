<template>
  <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
  <ul>
    <li v-for="step in steps" :class="nextStep === step.key ? 'is-active' : ''">
      <span class="fake-a" :class="step.index < nextStepIndex ? 'is-past' : ''" v-if="step.index > nextStepIndex || step.api || step.isLast">
        {{step.index + 1}}. {{step.shortTitle}}
        <IconCheck v-if="step.index < nextStepIndex" />
      </span>
      <span v-else>
        <nuxt-link v-if="step.to" :to="step.to(application)">
          {{step.index + 1}}. {{step.shortTitle}}
          <IconCheck v-if="step.index < nextStepIndex" />
        </nuxt-link>
        <a v-if="step.href" :href="step.href(application)">
          {{step.index + 1}}. {{step.shortTitle}}
          <IconCheck v-if="step.index < nextStepIndex" />
        </a>
      </span>
    </li>
  </ul>
</nav>
</template>
<script>
  import IconCheck from 'avril/images/icons/check.svg';
  import { nextStep } from '~/utils/application';
  import nextStepsData from '~/contents/data/applicationNextSteps';

  export default {
    components: {
      IconCheck,
    },
    computed: {
      steps: function() {
        return Object.entries(nextStepsData)
          .sort(d => d.index)
          .filter(([_key, {isActive}]) => isActive(this.application))
          .map(([key, v]) => {
            return {
              key,
              ...v
            }
          });
      },
      nextStep: function(){
        return this.$store.getters.nextApplicationStep(this.application);
      },
      nextStepIndex: function() {
        return nextStepsData[this.nextStep].index;
      }
    },
    props: {
      application: {
        type: Object,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '~avril/scss/variables';

  svg {
    width: 1rem;
    margin-left: 0.5rem;
    fill: $breadcrumb-item-color;
  }

  .fake-a {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 0 0.75em;
    &.is-past {
      color: $breadcrumb-item-color;
    }
  }

  .breadcrumb .is-active span {
    font-weight: bold;
  }
</style>