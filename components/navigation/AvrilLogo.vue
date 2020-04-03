<template>
  <a href="/" class="logo"><Logo/></a>
</template>

<script type="text/javascript">
  import Logo from '~/assets/images/avril-logo.svg';

  export default {
    components: {
      Logo,
    },
  }
</script>
<style lang="scss" scoped>
  a.logo {
    padding: 0.5rem 0.75rem;
    display: block;
  }
</style>