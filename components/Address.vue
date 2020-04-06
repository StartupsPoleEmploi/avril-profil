<template>
  <div v-if="address">
    <p v-if="isString">{{address}}</p>
    <div v-else>
      <p>{{address.street}}</p>
      <p>{{address.postalCode}} {{address.city}}</p>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    computed: {
      isString: function() {
        return typeof this.address === 'string';
      },
    },
    props: {
      address: {}
    }
  }
</script>