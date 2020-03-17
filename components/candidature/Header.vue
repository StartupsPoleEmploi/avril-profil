<template>
  <header class="candidature">
    <div class="level">

      <div class="level-left has-text-left">
        <div class="level-item">
          <div>
            <h1 class="title h1">TP Manager d’univers marchand</h1>
            <div class="label-avril">Équivalence CAP BEP</div>
          </div>
        </div>
      </div>

      <div class="level-right">
        <span class="tag is-blue">à compléter</span>
      </div>
    </div>
  </header>
</template>

<script>
import BackButton from '~/components/BackButton.vue';

export default {
  components: {
    BackButton,
  }
}
</script>
<style scoped>
.candidature {
  margin-bottom: 2rem
}
.level-item {
  justify-content: flex-start
}
</style>
