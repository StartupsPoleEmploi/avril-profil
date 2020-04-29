<template>
  <Message type="success" v-if="message" :onRemove="removeMessage">
    <p>{{message}}</p>
  </Message>
</template>
<script type="text/javascript">
  import Message from '~/components/Message';

  export default {
    components: {
      Message,
    },
    props: {
      message: {
        type: String,
        isRequired: true,
      },
      removeMessage: {
        type: Function,
        isRequired: true,
      }
    }
  }
</script>