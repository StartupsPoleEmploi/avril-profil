<template>
  <button @click="saveAndNext" type="submit" class="button is-primary is-rounded is-medium">{{isSaving ? 'Enregistrement ...' : 'Enregistrer'}}</button>
</template>
<script>
  import { apiPath } from '~/utils/api';

  export default {
    data: function() {
      return {
        isSaving: false,
      };
    },
    methods: {
      saveAndNext: async function() {
        this.isSaving = true;
        const result = await fetch(apiPath(this.store), {
          method: 'PUT',
          data: this.$store.state[this.store],
        });
        this.isSaving = false;
        if (result.ok) {
          this.$router.push(this.to);
        }
      },
    },
    props: {
      store: {},
      to: {},
    },
  }
</script>