<template>
  <div class="form">
    <div class="form-fields fields">
      <div class="field">
        <label class="label">Mon email</label>
        <div class="control">
          <input :value="identity.email" class="input is-large" type="email" placeholder="Exemple : avril@pole-emploi.fr" @input="addEmail">
        </div>
      </div>
      <div class="field">
        <label class="label">Mon numéro de téléphone mobile</label>
        <div class="control">
          <PhoneInput :value="identity.mobilePhone" class="input is-large" placeholder="Exemple : 06 12 34 56 78" @input="addMobilePhone" />
        </div>
      </div>

      <div class="field">
        <label class="label">Mon numéro de téléphone à domicile</label>
        <div class="control">
          <PhoneInput :value="identity.homePhone" class="input is-large" placeholder="Exemple : 01 99 88 77 66" @input="addHomePhone" />
        </div>
      </div>
      <div class="field">
        <IdentitySaveButtons to="/" />
      </div>
    </div>
  </div>
</template>

<script>
  import PhoneInput from 'avril/js/components/PhoneInput.vue';
  import IdentitySaveButtons from '~/components/IdentitySaveButtons.vue';

  export default {
    components: {
      PhoneInput,
      IdentitySaveButtons,
    },
    computed: {
      identity() {
        return this.$store.state.identity
      },
    },
    methods: {
      addEmail: function(e) {
        this.$store.commit('identity/updateState', {email: e.target.value})
      },
      addMobilePhone: function(value) {
        this.$store.commit('identity/updateState', {mobilePhone: value})
      },
      addHomePhone: function(value) {
        this.$store.commit('identity/updateState', {homePhone: value})
      },
    },
  }
</script>