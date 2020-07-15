<template>
  <div class="">
    <Header/>
    <div id="profil-avril">
      <NavigationDashboard />
      <div class="container avril-container">
        <Message v-if="message" :type="messageType" :onRemove="removeFeedback">
          {{message}}
        </Message>
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import NavigationDashboard from '~/components/Navigation-Dashboard.vue'
import Header from '~/components/Header.vue'
import Message from '~/components/Message.vue'
import get from 'lodash.get';
export default {
  components: {
    Message,
    NavigationDashboard,
    Header
  },
  computed: {
    message: function() {
      return get(this.$store.state, 'serverFeedback.message');
    },
    messageType: function() {
      return get(this.$store.state, 'serverFeedback.type');
    },
  },
  methods: {
    removeFeedback: function() {
      this.$store.commit('removeFeedback');
    }
  },
}
</script>
