<template>
  <div class="candidature-card card-certificateur" v-bind:class="{ 'card-filled': isFilled }">
    <h4 class="title is-5"><span class="icon lock" v-if="!isFilled"><IconLocked/></span> Mon certificateur</h4>
    <a href="#" class="button is-avril" v-if="!isFilled">Trouver mon certificateur</a>

    <div v-if="isFilled">
      <h3 class="title is-5 certificateur-title">DAVA de Versailles</h3>
      <div class="label-avril"><strong>Réunion d'information disponible</strong></div>
      <p>45 rue de la soif</p>
      <p>45000 Marseille</p>
    </div>

    <a v-if="isFilled" href="#" class="button edit-button is-small">
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
    IconPencil
  },
  props: {
    isFilled: {
      default: false,
      type: Boolean
    },
  },
  mounted () {
    console.log(this.isFilled)
  }
}
</script>
<style scoped lang="scss">
.button {
  // margin-top: auto;
}
.edit-button {
  margin-top: auto;
  margin-left: auto;
}
.certificateur-title {
  margin-bottom: .5rem;
}
.label-avril {
  margin-bottom: 1.5rem;
  display: block;
}
</style>
