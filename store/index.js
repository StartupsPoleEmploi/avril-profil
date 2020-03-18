import { backendToStore } from '../mappers/toStore';

import { last } from '../utils/array';
import { apiPath, fetchOrRedirectToSignIn } from '../utils/url';

export const state = () => ({});

export const getters = {
};

export const mutations = {};

export const actions = {
  async nuxtServerInit({ commit, dispatch }, context) {
    await Promise.all(['profile', 'applications'].map(async storeName => {
      const jsonData = await fetchOrRedirectToSignIn(apiPath(storeName), context)
      const mappedData = backendToStore[storeName](jsonData.data);
      commit(`${storeName}/initState`, mappedData);
    }))
  },
};
