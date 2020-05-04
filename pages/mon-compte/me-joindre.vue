<template>
  <div class="form">
    <div class="form-fields fields">
      <IdentityField
        type="email"
        field="email"
        label="Email" />
      <IdentityField
        type="phone"
        field="mobilePhone"
        label="Numéro de téléphone portable" />
      <IdentityField
        type="phone"
        field="homePhone"
        label="Numéro de téléphone fixe" />
      <IdentitySaveButtons to="/" />
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
