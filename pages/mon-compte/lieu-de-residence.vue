<template>
  <div class="form">
    <div class="form-fields">
      <IdentityField
        type="geo"
        field="fullAddress"
        label="Adresse" />

      <IdentitySaveButtons to="/mon-compte/me-joindre" />
    </div>
  </div>
</template>

<script>
  import IdentitySaveButtons from '~/components/IdentitySaveButtons.vue';
  import IdentityField from '~/components/IdentityField.vue';

  export default {
    components: {
      IdentityField,
      IdentitySaveButtons,
    },
  }
</script>