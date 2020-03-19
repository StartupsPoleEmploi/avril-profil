import get from 'lodash.get';
import {isArray} from 'avril/js/utils/boolean';
import {last} from 'avril/js/utils/array';

const PATHS = {
  PHOENIX_DOMAIN: 'http://phoenix:4000',
  API_PREFIX_PATH: '/api/v1',
  API_PATHS: {
    profile: '/profile',
    applications: '/applications',
    application: '/applications/:slug'
  }
}

export const apiPath = (routeName, params={}) => {
  const path = Object.keys(params).reduce((route, key) => {
    return route.replace(new RegExp(`:${key}`), params[key])
  }, PATHS.API_PATHS[routeName])
  return `${PATHS.API_PREFIX_PATH}${path}`
}

export async function fetchWithCookie(path, req){
  const url = `${req ? PATHS.PHOENIX_DOMAIN : ''}${path}`
  return await fetch(url, req ? ({
    headers: {
      cookie: req.headers.cookie,
    }
  }) : {})
}

export async function fetchOrRedirectToSignIn(path, {req, redirect, store, route, env}) {
  let result;
  try {
    result = await fetchWithCookie(path, req)
  } catch(err) {
    if (err.code === 'ENOTFOUND' || err.code === 'EAI_AGAIN' || err.code === 'ECONNREFUSED') {
      console.warn('API not available ...')
      const storeName = last(path.split('/'));
      const fakeURL = `http://localhost:${process.env.PORT || 3000}${process.env.NUXT_PROFIL_PATH || ''}/json/${storeName}.json`;
      // Fake API call to static json files
      result = await fetchWithCookie(fakeURL)
    }
  }

  const jsonData = await result.json();

  if (result.ok) {
    return jsonData;
  } else {
    if (result.status === 401 && get(jsonData, 'error.redirect_to')) {
      redirect(get(jsonData, 'error.redirect_to'))
    } else {
      console.error('No idea what happened:')
      console.error(result)
    }
  }
}