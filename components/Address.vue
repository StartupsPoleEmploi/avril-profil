<template>
  <div v-if="address">
    <p v-if="isString">{{address}}</p>
    <div v-else>
      <p v-if="address.name">{{address.name}}</p>
      <p>{{address.street}}</p>
      <p v-if="address.postalCode || address.city">{{address.postalCode}} {{address.city}}</p>
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