<template>
  <div class="navbar-item">
    <nuxt-link v-if="to" :to="to">
      <slot></slot>
    </nuxt-link>
    <a v-if="href" :href="href" :target="href.match(/^https?:\/\//) ? '_blank' : '' ">
      <slot></slot>
    </a>
  </div>
</template>
<script>
  export default {
    props: {
      to: {},
      href: {},
    },
  }
</script>