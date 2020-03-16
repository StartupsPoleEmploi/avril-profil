import { backendToStore } from '../mappers/toStore';

import { last } from '../utils/array';
import { apiPath } from '../utils/url';

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
      await Promise.all(apiPath(['profile', 'applications'], {isServer: true}).map(async url => {
        const result = await fetch(url, {
          redirect: 'manual',
          headers: {
            cookie: req.headers.cookie,
          }
        })
        if (result.status === 302) {
          const requestDomain = `${req.protocol}://${req.get('host')}`;
          const redirectUrl = result.headers.get('location')
            .replace(PHOENIX_DOMAIN, requestDomain)
            .replace(encodeURIComponent(API_PATH), encodeURIComponent(req.originalUrl))
          redirect(redirectUrl)
        } else if (result.ok) {
          const storeName = last(url.split('/'));
          const dataWithStatus = await result.json();

          const mappedData = backendToStore[storeName](dataWithStatus.data);
          commit(`${storeName}/initState`, mappedData);
        } else {
          console.log('No idea what happened:')
          console.log(result)
        }
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
