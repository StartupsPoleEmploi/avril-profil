<template>
  <div class="candidature-card card-synthese" v-bind:class="{ 'card-filled': !isLocked }">
    <h4 class="title is-5"><span class="icon" v-if="isLocked"><IconLocked/></span> Ma synthèse</h4>
    <a href="#" class="button is-text" v-if="!isLocked">Télécharger</a>
    <p class="help" v-if="isLocked">Pour débloquer votre synthèse, vous devez choisir votre <a href="#"><strong class="avril-tag">certificateur</strong></a>.</p>
  </div>
</template>

<script>
import IconLocked from '~/components/icons/locked.svg';

export default {
  components: {
    IconLocked,
  },
  props: {
    isLocked: {
      default: true,
      type: Boolean
    },
  },
}
</script>
<style scoped lang="scss">
@import '~assets/scss/mixins';
@import '~assets/scss/variables';

.help {
  margin-top: auto
}
.avril-tag {
  color: palette(default, text)
}
.card-edit{
  margin-top: auto;
}
</style>
