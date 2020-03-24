<template>
  <nuxt-link :to="to" class="navbar-item">
    <div class="navbar-content">
      <div class="navbar-content">
        <p>
          <small class="has-text-info"><slot name="small"></slot></small>
        </p>
        <p><slot name="text"></slot></p>
      </div>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    to: {},
  },
}
</script>
