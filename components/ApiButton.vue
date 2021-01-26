<template>
  <button @click="callAction" type="submit" v-bind="$attrs" :disabled="isSaving">
    <span v-if="isSaving && disableWith">{{disableWith}}</span>
    <slot v-else></slot>
  </button>
</template>
<script>
  import get from 'lodash.get';
  import { queryApi, mutateApi } from 'avril/js/utils/api';
  import { include, first } from 'avril/js/utils/array';
  import { isString } from 'avril/js/utils/boolean';
  import { track } from 'avril/js/utils/analytics';

  const SUBMIT = 'submit';
  const RESET = 'reset';

  export default {
    props: {
      analytics: {
        type: String,
      },
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
      to: {
        type: String,
      }
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
        this.isSaving = true;
        try {
          const result = await fetchApi(this.query);
          if (this.type === SUBMIT) {
            this.$store.dispatch(`${store}/updateAndInform`, result);
            this.$store.commit('setFeedback', {
              message: get(this, 'query.message', 'Enregistré'),
            })
          } else {
            this.$store.commit(`${store}/updateStateFromServer`, result);
          }
          if (this.analytics) {
            track(this, this.analytics)
          }
          if (this.to) {
            setTimeout(() => {
              this.$router.push(this.to);
            }, 0);
          }
        } catch(err) {
          this.$store.commit('setApiErrorFeedback', {err, message: 'Impossible d\'enregistrer'});
        }
        this.isSaving = false;
      }
    },
  }
</script>