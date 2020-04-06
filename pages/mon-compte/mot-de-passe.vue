<template>
  <div class="form">
    <div class="form-fields fields">
      <div class="field">
        <div class="control">
          <input v-model="currentPassword" class="input is-large" type="password" placeholder="Mon mot de passe actuel">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="newPassword" class="input is-large" type="password" placeholder="Mon nouveau mot de passe" />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input v-model="newPasswordConfirmation" class="input is-large" type="password" placeholder="Confirmation de mon nouveau mot de passe" />
        </div>
      </div>
      <div class="field">
        <button @click="save" type="submit" class="button is-primary is-rounded is-medium">{{isSaving ? 'Enregistrement ...' : 'Enregistrer'}}</button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data: function() {
      return {
        isSaving: false,
        currentPassword: null,
        newPassword: null,
        newPasswordConfirmation: null,
      }
    },
    methods: {
      save: function() {
        console.log('Saving', this.currentPassword, this.newPassword, this.newPasswordConfirmation)
      }
    },
  }
</script>