<template>
  <div>
    <p>{{address.street}}</p>
    <p>{{address.postalCode}} {{address.city}}</p>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      address: {
        type: Object,
        required: true,
        default: {},
      }
    }
  }
</script>