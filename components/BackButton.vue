<template>
  <a href="#back" class="avril-back-button">
    <span class="icon"><IconsArrowLeft/></span> retour
  </a>
</template>
<script>
import IconsArrowLeft from '~/components/icons/arrow-left.svg';

export default {
  components: {
    IconsArrowLeft,
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/variables.scss';

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
