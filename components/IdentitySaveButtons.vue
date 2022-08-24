<template>
  <div class="field">
    <div class="level">
      <div class="level-left">
        <ApiButton
          ref="saveButton"
          type="submit"
          :query="{store: 'identity', name: 'updateIdentity', type: 'identity', params: {input: savableState}}"
          disable-with="Enregistrement ..."
          class="button is-primary is-rounded is-medium"
          :to="to"
        >{{canUndo ? 'Enregistrer' : 'Continuer'}}</ApiButton>
      </div>
      <div class="level-right">
        <ApiButton
          ref="resetButton"
          v-if="canUndo"
          type="reset"
          query="identity"
          disable-with="Annulation ..."
          class="button is-text is-rounded is-medium"
        >Annuler</ApiButton>
      </div>
    </div>
  </div>
</template>
<script>
  import ApiButton from '~/components/ApiButton';

  export default {
    computed: {
      canUndo: function() {
        return !this.$store.state.identity.isServerData;
      },
      savableState: function() {
        return this.$store.getters['identity/savableState'];
      }
    },
    beforeDestroy() {
      if (this.canUndo) {
        const shouldSave = window.confirm(`
Souhaitez-vous enregistrer ces modifications ?
Pour poursuivre n'oubliez pas d'enregistrer
        `);
        this.$refs[shouldSave ? 'saveButton' : 'resetButton'].$el.click();
      }
    },
    components: {
      ApiButton,
    },
    props: {
      to: {},
    },
  }
</script>