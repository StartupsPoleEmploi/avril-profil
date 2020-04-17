<template>
  <Message type="success" v-if="isSaved" :onRemove="removeIsSaved">
    <p>Enregistré</p>
  </Message>
</template>
<script type="text/javascript">
  import Message from '~/components/Message';

  export default {
    components: {
      Message,
    },
    props: {
      isSaved: {
        type: Boolean,
        isRequired: true,
        default: false,
      },
      removeIsSaved: {
        type: Function,
        isRequired: true,
      }
    }
  }
</script>