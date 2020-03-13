<template>
  <div class="candidature-card card-identite" v-bind:class="{ 'card-filled': isFilled }">
    <h4 class="title is-5">Mon identité</h4>
    <a href="#" class="button is-avril"  v-if="!isFilled">Renseigner mon identité</a>
    <p v-if="isFilled">Mon identité</p>
    <!-- <a v-if="isFilled" href="#" class="button is-small card-edit is-text"><span class="icon is-small"><IconPencil/></span> Éditer</a> -->
    <a v-if="isFilled" href="#" class="button is-small edit-button">
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
.edit-button {
  margin-top: auto;
  margin-left: auto;
}
.card-edit{
  margin-top: auto;
}
</style>
