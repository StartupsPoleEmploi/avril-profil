<template>
  <div class="notification" v-bind:class="type" ref="notification">
    <button class="delete" @click="remove"></button>
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
  methods: {
    remove() {
      this.$refs.notification.remove()
    }
  }
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
