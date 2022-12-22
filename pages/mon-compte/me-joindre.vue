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
      <IdentitySaveButtons :to="redirectTo" :onClick="onClick" />
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
      willRedirect: function() {
        return this.$store.getters['identity/isFilled'];
      },
      redirectTo: function() {
        if (!this.willRedirect) {
          return
        }

        if (this.$store.state.applications.applications.length === 1) {
          return path(first(this.$store.state.applications.applications))
        }
        return path();
      },
    },
    methods: {
      onClick() {
        if (!this.willRedirect) {
          this.$emit('showWarning');
        }
      }
    },
  }
</script>
