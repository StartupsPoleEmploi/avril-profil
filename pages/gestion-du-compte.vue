<template>
  <div>
    <div class="form">
      <h1 class="title h1 is-spaced">Changer de mot de passe</h1>
      <div class="form-fields fields">
        <div class="field">
          <label class="label">Mot de passe actuel</label>
          <div class="control">
            <input v-model="currentPassword" class="input is-large" type="password" placeholder="Mot de passe actuel" minlength="8" required>
          </div>
        </div>
        <div class="field">
          <label class="label">Nouveau mot de passe</label>
          <div class="control">
            <input v-model="newPassword" class="input is-large" type="password" placeholder="Nouveau mot de passe" minlength="8" required />
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
    <hr />

    <article class="message is-danger">
      <div class="message-body">
        <h1 class="title h1 is-spaced has-text-danger">Supprimer mon compte</h1>
        <p class="subtitle">Attention cette action est irréversible !</p>
        <button @click="deleteAccount" type="submit" class="button is-danger is-rounded is-medium">Je souhaite supprimer toutes mes informations personnelles</button>
      </div>
    </article>
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
      deleteAccount: async function() {
        if (window.confirm('Confirmez-vous vouloir supprimer l\'ensemble des vos données sur le site d\'Avril ?')) {
          await mutateApi({
            name: 'deleteAccount',
            type: 'identity',
          });
          window.location = '/disconnect?delete_account'
        }
      },
      save: async function() {
        this.isSaving = true;
        try {
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
          this.$store.dispatch('identity/updateAndInform', result);
          this.$store.commit('setFeedback', {
            message: 'Mot de passe modifié avec succès.',
          })
        } catch(err) {
          this.$store.commit('setApiErrorFeedback', {err});
        }
        this.isSaving = false;
      },
    },
  }
</script>