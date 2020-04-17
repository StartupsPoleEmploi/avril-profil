<template>
  <div class="level">
    <div class="level-left">
      <button @click="saveAndNext" type="submit" class="button is-primary is-rounded is-medium">
        {{isSaving ? 'Enregistrement ...' : 'Enregistrer'}}
      </button>
    </div>
    <div class="level-right">
      <button v-if="canUndo" @click="resetData" type="submit" class="button is-text is-rounded is-medium">Annuler</button>
    </div>
  </div>
</template>
<script>
  import { queryApi, mutateApi } from '~/utils/api';

  export default {
    data: function() {
      return {
        isSaving: false,
      };
    },
    computed: {
      canUndo: function() {
        return !this.$store.state.identity.isServerData;
      },
    },
    methods: {
      resetData: async function() {
        const result = await queryApi('identity');
        this.$store.commit('identity/updateStateFromServer', result);
      },
      saveAndNext: async function() {
        this.isSaving = true;
        const result = await mutateApi({
          name: 'updateIdentity',
          type: 'identity',
          params: this.$store.getters['identity/savableState'],
        });
        this.isSaving = false;
        this.$store.dispatch('identity/updateAndInform', result);
        this.$router.push(this.to);
      },
    },
    props: {
      store: {},
      to: {},
    },
  }
</script>