<template>
  <div class="level">
    <div class="level-left">
      <ApiButton
        type="submit"
        :query="{store: 'identity', name: 'updateIdentity', type: 'identity', params: savableState}"
        disable-with="Enregistrement ..."
        class="button is-primary is-rounded is-medium"
        :to="to"
      >Enregistrer</ApiButton>
    </div>
    <div class="level-right">
      <ApiButton
        v-if="canUndo"
        type="reset"
        query="identity"
        disable-with="Annulation ..."
        class="button is-text is-rounded is-medium"
      >Annuler</ApiButton>
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
    components: {
      ApiButton,
    },
    props: {
      to: {},
    },
  }
</script>