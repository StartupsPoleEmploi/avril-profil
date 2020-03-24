<template>
  <div class="navbar-item">
    <nuxt-link :to="to">
      <slot></slot>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    to: {},
  },
}
</script>
