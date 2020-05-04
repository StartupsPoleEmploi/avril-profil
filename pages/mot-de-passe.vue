<template>
  <div class="form">
    <h1 class="title h1 is-spaced">Changer de mot de passe</h1>
    <div class="form-fields fields">
      <div class="field">
        <label class="label">Mot de passe actuel</label>
        <div class="control">
          <input v-model="currentPassword" class="input is-large" type="password" placeholder="Mot de passe actuel">
        </div>
      </div>
      <div class="field">
        <label class="label">Nouveau mot de passe</label>
        <div class="control">
          <input v-model="newPassword" class="input is-large" type="password" placeholder="Nouveau mot de passe" />
        </div>
      </div>

      <!-- <div class="field">
        <div class="control">
          <input v-model="newPasswordConfirmation" class="input is-large" type="password" placeholder="Confirmation de mon nouveau mot de passe" />
        </div>
      </div> -->
      <div class="field">
        <button @click="save" type="submit" class="button is-primary is-rounded is-medium">{{isSaving ? 'Enregistrement ...' : 'Enregistrer'}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mutateApi } from 'avril/js/utils/api';

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
      save: async function() {
        this.isSaving = true;
        const result = await mutateApi({
          name: 'updatePassword',
          type: 'identity',
          params: {
            input: {
              password: this.newPassword,
              confirmPassword: this.newPassword,
              currentPassword: this.currentPassword,
            }
          },
        });
        this.isSaving = false;
        this.$store.dispatch('identity/updateAndInform', {
          ...result,
          savedMessage: 'Mot de passe modifié avec succès.',
        });
      },
    },
  }
</script>