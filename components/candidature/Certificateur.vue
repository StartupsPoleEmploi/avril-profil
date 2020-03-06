<template>
  <div class="candidature-card card-certificateur">
    <h4 class="title is-4">Mon certificateur <span v-if="etat=='locked'" class="icon"><IconLocked/></span></h4>
  </div>
</template>

<script>
import IconLocked from '~/components/icons/locked.svg';

export default {
  components: {
    IconLocked,
  },
  props: {
    etat: {
      default: 'locked',
      type: String
    },
  },
  mounted () {
    console.log(this.etat)
  }
}
</script>
<style>

</style>
