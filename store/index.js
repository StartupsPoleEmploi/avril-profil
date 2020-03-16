import { backendToStore } from '../mappers/toStore';

import get from 'lodash.get';
import { last } from '../utils/array';
import { apiPath, fetchOrRedirectToSignIn } from '../utils/url';

export const state = () => ({
  cookie: null,
});

export const getters = {
};

export const mutations = {
  saveCookie: (state, cookie) => {
    console.log('saving cookie', cookie)
    state.cookie = cookie
  }
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }, {
    app,
    env,
    req,
    redirect,
  }) {
    try {
      console.log(apiPath(['profile', 'applications'], {isServer: true}))
      await Promise.all(['profile', 'applications'].map(async store => {
        const jsonData = await fetchOrRedirectToSignIn(apiPath(store), req)
        const mappedData = backendToStore[store](jsonData.data);
        commit(`${storeName}/initState`, mappedData);
      }))
    } catch(err) {
      if (err.code === 'ENOTFOUND') {
        console.warn('API not available ...')
      } else {
        console.error(err);
      }
    }
  },
};
