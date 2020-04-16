<template>
  <div class="card">
    <div class="card-header">
      <h4 class="title is-4">{{delegate.name}}</h4>
    </div>
    <div class="card-content">
      <Address :address="delegate.address || {}" />
    </div>
    <div class="card-footer has-text-centered">
      <button @click="e => onClick(delegate)" class="button is-text">Choisir ce certificateur</button>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Address from '~/components/Address.vue';

  export default {
    components: {
      Address,
    },
    props: {
      delegate: {
        type: Object,
        required: true,
      },
      onClick: {
        type: Function,
        required: true,
      }
    },
  }
</script>
