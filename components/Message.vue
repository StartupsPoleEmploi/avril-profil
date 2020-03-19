<template>
  <div class="notification" v-bind:class="type">
    <button class="delete"></button>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      default: 'is-primary',
      type: String
    },
  },
}
</script>
<style lang="scss" scoped>
.notification {
  padding: 3rem;
}
.button {
  margin-top: 2rem;
}
</style>
