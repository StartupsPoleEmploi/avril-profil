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
      <IdentitySaveButtons />
    </div>
  </div>
</template>

<script>
  import IdentitySaveButtons from '~/components/IdentitySaveButtons.vue';
  import IdentityField from '~/components/IdentityField.vue';
  import {first} from 'avril/js/utils/array';
  import {path} from '~/utils/application';

  export default {
    components: {
      IdentityField,
      IdentitySaveButtons,
    },
    computed: {
      redirectTo: function() {
        if (this.$store.state.applications.applications.length === 1) {
          return path(first(this.$store.state.applications.applications))
        }
        return path();
      },
    },
  }
</script>
