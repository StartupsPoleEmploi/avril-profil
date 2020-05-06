<template>
  <div class="candidature-detail content">
    <div v-html="content"></div>

  </div>
</template>

<script>
  import content from './justificatifs.md';

  console.log(content);

  export default {
    computed: {},
    data: function() {
      return {
        content,
      }
    },
    props: {
      application: {
        type: Object
      }
    },
  }
</script>
