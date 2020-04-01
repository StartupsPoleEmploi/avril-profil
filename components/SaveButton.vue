<template>
  <button @click="saveAndNext" type="submit" class="button is-primary is-rounded is-medium">{{isSaving ? 'Enregistrement ...' : 'Enregistrer'}}</button>
</template>
<script>
  import { mutateApi } from '~/utils/api';

  export default {
    data: function() {
      return {
        isSaving: false,
      };
    },
    methods: {
      saveAndNext: async function() {
        this.isSaving = true;
        const jsonData = await mutateApi(this.store, this.$store.state[this.store]);
        this.isSaving = false;
        this.$router.push(this.to);
      },
    },
    props: {
      store: {},
      to: {},
    },
  }
</script>