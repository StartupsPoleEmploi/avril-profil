<template>
  <div class="candidature-card card-justificatifs" v-bind:class="{ 'card-filled': !isLocked }">
    <h4 class="title is-5"><span class="icon lock" v-if="isLocked"><IconLocked/></span> Mes justificatifs</h4>
    <a href="#" class="button is-text" v-if="!isLocked">Voir la liste</a>
    <p class="help" v-if="isLocked">Pour débloquer les justificatifs, vous devez remplir votre <a href="#"><strong class="avril-tag">recevabilité</strong></a>.</p>
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
@import '~avril/scss/variables';

.help {
  margin-top: auto
}
.avril-tag {
  color: palette(default, text)
}
</style>
