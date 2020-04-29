<template>
  <button @click="callAction" type="submit" v-bind="$attrs" :disabled="isSaving">
    <span v-if="isSaving && disableWith">{{disableWith}}</span>
    <slot v-else></slot>
  </button>
</template>
<script>
  import { queryApi, mutateApi } from 'avril/js/utils/api';
  import { include } from 'avril/js/utils/array';
  import { isString } from 'avril/js/utils/boolean';

  const SUBMIT = 'submit';
  const RESET = 'reset';

  export default {
    props: {
      disableWith: {
        type: String,
      },
      query: {
        isRequired: true,
      },
      type: {
        type: String,
        default: SUBMIT,
        validator: p => include([RESET, SUBMIT], p),
      },
    },
    data: function() {
      return {
        isSaving: false,
      };
    },
    methods: {
      callAction: async function() {
        const fetchApi = this.type === SUBMIT ? mutateApi : queryApi;
        const store = isString(this.query) ? this.query : this.query.store;
        this.$store.commit(`${store}/removeSavedMessage`);
        this.isSaving = true;
        const result = await fetchApi(this.query)
        this.isSaving = false;
        if (this.type === SUBMIT) {
          this.$store.dispatch(`${store}/updateAndInform`, {
            ...result,
            savedMessage: this.query.message || 'Enregistré'
          });
        } else {
          this.$store.commit(`${store}/updateStateFromServer`, result);
        }
        if (this.to) {
          is.$router.push(this.to);
        }
      }
    },
  }
</script>