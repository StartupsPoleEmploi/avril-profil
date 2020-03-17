<template>
  <div class="candidature-card card-identite" v-bind:class="{ 'card-filled': isFilled }">
    <h4 class="title is-5">Mon identité</h4>
    <nuxt-link to="/identite" class="button is-avril is-rounded"  v-if="!isFilled">Renseigner mon identité</nuxt-link>
    <p v-if="isFilled">Mon identité</p>
    <!-- <a v-if="isFilled" href="#" class="button is-small card-edit is-text"><span class="icon is-small"><IconPencil/></span> Éditer</a> -->
    <nuxt-link v-if="isFilled" to="/identite" class="button is-small edit-button is-rounded">
      <span class="icon is-small">
        <IconPencil/>
      </span>
      <span>Éditer</span>
    </nuxt-link>
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
    computed: {
      isFilled() {
        return this.$store.getters.isFilled
      },
    },
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
