<template>
  <div class="form">
    <div class="form-fields fields">
      <div class="field">
        <label class="label">Mon email</label>
        <div class="control">
          <input :value="profile.email" class="input is-large" type="email" placeholder="Exemple : avril@pole-emploi.fr" @input="addEmail">
        </div>
      </div>
      <div class="field">
        <label class="label">Mon numéro de téléphone mobile</label>
        <div class="control">
          <PhoneInput :value="profile.cellPhoneNumber" class="input is-large" placeholder="Exemple : 06 12 34 56 78" @input="addCellPhoneNumber" />
        </div>
      </div>

      <div class="field">
        <label class="label">Mon numéro de téléphone à domicile</label>
        <div class="control">
          <PhoneInput :value="profile.homePhoneNumber" class="input is-large" placeholder="Exemple : 01 99 88 77 66" @input="addHomePhoneNumber" />
        </div>
      </div>
      <div class="field">
        <SaveButton store="profile" to="/" />
      </div>
    </div>
  </div>
</template>

<script>
  import PhoneInput from 'avril/js/components/PhoneInput.vue';
  import SaveButton from '~/components/SaveButton.vue';

  export default {
    components: {
      PhoneInput,
      SaveButton,
    },
    computed: {
      profile() {
        return this.$store.state.profile
      },
    },
    methods: {
      addEmail: function(e) {
        this.$store.commit('profile/updateState', {email: e.target.value})
      },
      addCellPhoneNumber: function(value) {
        this.$store.commit('profile/updateState', {cellPhoneNumber: value})
      },
      addHomePhoneNumber: function(value) {
        this.$store.commit('profile/updateState', {homePhoneNumber: value})
      },
    },
  }
</script>