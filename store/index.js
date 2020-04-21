import { queryApiOrRedirect } from 'avril/js/utils/api';
import { nextStep } from '~/utils/application';

export const state = () => ({});

export const getters = {
  nextApplicationStep: (state, getters) => {
    return (application => {
      if (!getters['identity/isFilled']) return 'identity';
      return nextStep(application);
    })
  }
};

export const mutations = {};

export const actions = {
  async nuxtServerInit({ commit }, context) {
    return await Promise.all(['identity', 'applications'].map(async storeName => {
      try {
        const jsonData = await queryApiOrRedirect(storeName, context);
        console.log('nuxtServerInit jsonData', jsonData)
        commit(`${storeName}/updateStateFromServer`, jsonData);
      } catch(jsonErr) {
        console.error('Loading data failed')
        console.error(jsonErr)
      }
    }))
  },
};
