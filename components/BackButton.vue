<template>
  <nuxt-link :to="to" class="avril-back-button">
    <span class="icon"><ArrowLeft/></span> {{label || 'retour'}}
  </nuxt-link>
</template>
<script>
import ArrowLeft from 'avril/images/icons/arrow-left.svg';

export default {
  components: {
    ArrowLeft,
  },
  props: {
    label: {},
    to: {},
  },
}
</script>
<style lang="scss">
@import '~avril/scss/variables';

.avril-back-button {
  color: $gray-bike;
  margin-bottom: 1rem;
  display: inline-block;
  transition: color .2s ease-in-out;
  svg{
    transition: all .3s ease-in-out;
  }
  svg path {
    stroke: $gray-bike;
    transition: stroke .2s ease-in-out;
  }
  span {
    float: left;
    display: inline-grid;
    margin-right: 9px;
  }
  &:hover {
    color: $blue-avril;
    svg {
      transform: translateX(-10px);
    }
    svg path {
      stroke: $blue-avril;
    }
  }
}
</style>
