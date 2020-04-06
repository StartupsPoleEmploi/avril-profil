<template>
  <div class="candidature-card card-identite" :class="{ 'card-filled': isFilled }">
    <h4 class="title is-5">Mon identité</h4>
    <nuxt-link to="/mon-compte" class="button is-rounded" :class="{'edit-button': isFilled, 'is-small': isFilled, 'is-avril': !isFilled}">
      <span v-if="isFilled">
        <span class="icon is-small">
          <IconPencil/>
        </span>
        <span>Éditer</span>
      </span>
      <span v-else>Renseigner mon identité</span>
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
    props: {
      isFilled: {}
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
