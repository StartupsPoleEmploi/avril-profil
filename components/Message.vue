<template>
  <div class="notification" v-bind:class="type">
    <button class="delete"></button>
    Primar lorem ipsum dolor sit amet, consectetur
    adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Sit amet,
    consectetur adipiscing elit
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
<style>
</style>
