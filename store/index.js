export const state = () => ({
});

export const getters = {
};

export const mutations = {
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }, {
      app,
      env,
      req,
      redirect,
  }) {
    const PHOENIX_DOMAIN = 'http://phoenix:4000';
    const API_PATH = '/api2/profile';
    try {
      const result = await fetch(`${PHOENIX_DOMAIN}${API_PATH}`, {
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
        const dataWithStatus = await result.json();

        console.log(dataWithStatus)
        dispatch('initState', {});
      } else {
        console.log('No idea what happened:')
        console.log(result)
      }
    } catch(err) {
      if (err.code === 'ENOTFOUND') {
        console.warn('API not available ...')
      } else {
        console.error(err);
      }
    }
  },
  initState({commit}, params) {
    console.log('initState called', params);
  }
};
