import { backendToStore } from '~/mappers/toStore';
import { hasDelegate, hasBooklet } from '~/utils/application';
import { queryApiOrRedirect } from '~/utils/api';

export const state = () => ({});

export const getters = {
  nextApplicationStep: (state, getters) => {
    return (application => {
      if (!getters['identity/isFilled']) return 'identity';
      if (!hasDelegate(application)) return 'delegate';
      if (!hasBooklet(application)) return 'booklet';
      return 'uploads';
    })
  }
};

export const mutations = {};

export const actions = {
  async nuxtServerInit({ commit, dispatch }, context) {
    await Promise.all(['identity', 'applications'].map(async storeName => {
      const jsonData = await queryApiOrRedirect(storeName, context)
      if (jsonData) {
        commit(`${storeName}/updateState`, backendToStore[storeName](jsonData));
      } else {
        console.error('Loading data failed')
        console.error(jsonData)
      }
    }))
  },
};
