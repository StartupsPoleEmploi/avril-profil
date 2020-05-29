import get from 'lodash.get';
import { queryApiWithContext } from 'avril/js/utils/api';
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
