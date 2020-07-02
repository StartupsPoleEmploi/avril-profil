<template>
  <div class="notification" :class="`is-${type} is-${size}`" ref="notification">
    <button v-if="removable" class="delete" @click="remove"></button>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      default: 'primary',
      type: String,
    },
    size: {
      default: 'normal',
      type: String,
    },
    onRemove: {
      type: Function,
    },
    removable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    remove() {
      if (this.onRemove) {
        this.onRemove();
      } else {
        this.$refs.notification.remove();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .notification {
    &.is-large {
      padding: 3rem;
    }
  }
</style>
