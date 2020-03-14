<template>
  <div class="candidature-card card-recevabilite" v-bind:class="{ 'card-filled': isFilled }">
    <h4 class="title is-5">Ma recevabilité</h4>
    <a href="#" class="button is-avril is-rounded" v-if="!isFilled">Compléter ma recevabilité</a>
    <a v-if="isFilled" href="#" class="button edit-button is-small is-rounded">
      <span class="icon is-small">
        <IconPencil/>
      </span>
      <span>Éditer</span>
    </a>
  </div>
</template>

<script>
import IconLocked from '~/components/icons/locked.svg';
import IconPencil from '~/components/icons/pencil.svg';

export default {
  components: {
    IconLocked,
    IconPencil,
  },
  props: {
    isFilled: {
      default: false,
      type: Boolean
    },
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">

</style>
