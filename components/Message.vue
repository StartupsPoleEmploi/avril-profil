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
    onRemove: {
      type: Function,
      default: () => {},
    }
  },
  methods: {
    remove() {
      onRemove();
      this.$refs.notification.remove();
    }
  }
}
</script>
<style lang="scss" scoped>
  .notification {
    padding: 3rem;
  }
</style>
