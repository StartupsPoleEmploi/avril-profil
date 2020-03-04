<template>
  <header class="candidature">
    <div class="level">

      <div class="level-left has-text-left">
        <div class="level-item">
          <div>
            <BackButton/>
            <h1 class="title h1">TP Manager d’univers marchand</h1>
            <span>Équivalence CAP BEP</span>
          </div>
        </div>
      </div>

      <div class="level-right">
        à compléter
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
