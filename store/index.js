import get from 'lodash.get';
import { isString } from 'avril/js/utils/boolean';
import { queryApiWithContext, formatApiError } from 'avril/js/utils/api';
import { nextStep } from '~/utils/application';

export const state = () => ({
  serverFeedback: null,
});

export const getters = {
  nextApplicationStep: (state, getters) => {
    return (application => {
      if (!getters['identity/isFilled']) return 'identity';
      return nextStep(application);
    })
  }
};

export const mutations = {
  removeFeedback: function(state) {
    state.serverFeedback = null;
  },
  setFeedback: function(state, {message, type}) {
    state.serverFeedback = {
      message,
      type: type || 'success',
      timestamp: Date.now(),
    }
  },
  setApiErrorFeedback: function(state, {err, message}) {
    state.serverFeedback = {
      message: formatApiError(err, message),
      type: 'danger',
      timestamp: Date.now(),
    }
  }
};

export const actions = {
  async nuxtServerInit({ commit }, context) {
    if (get(context, 'req.path') === '/hotjar') return;
    return await Promise.all(['identity', 'applications'].map(async storeName => {
      try {
        const jsonData = await queryApiWithContext(context)(storeName);
        commit(`${storeName}/updateStateFromServer`, jsonData);
      } catch(jsonErr) {
        console.error('Loading data failed')
        console.error(jsonErr)
        throw jsonErr;
      }
    }))
  },
};
