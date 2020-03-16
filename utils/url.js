import {isArray} from './boolean';

export const objectToQueryString = object => Object.keys(object).filter(k => object[k]).map(k => {
  return `${encodeURIComponent(k)}=${encodeURIComponent(object[k])}`
}).join('&');

// export const phoenixUrl = (hash, msg) =>
//   (process.env.clientToPhoenixUrl ? `${process.env.clientToPhoenixUrl}/candidatures?${objectToQueryString({hash, msg})}` : null);

// export const redirectToPhoenix = ({path, redirect}, hash, msg) => {
//   const phoenixUrlWithParams = phoenixUrl(hash, msg)
//   if (phoenixUrlWithParams && path !== '/hotjar') {
//     redirect(phoenixUrlWithParams);
//   } else {
//     console.log("Should redirect but env.phoenixUrl not set");
//   }
// };

const PATHS = {
  PHOENIX_DOMAIN: 'http://phoenix:4000',
  API_PREFIX_PATH: '/api/v1',
  API_PATHS: {
    profile: '/profile',
    applications: '/applications',
    application: '/applications/:id'
  }
}

export const apiPath = (routeName, opts) => {
  if (isArray(routeName)) {
    return routeName.map(name => apiPath(name, opts))
  }
  const {isServer, ...params} = opts;

  const path = Object.keys(params).reduce((route, key) => {
    return route.replace(new RegExp(`:${key}`), params[key])
  }, PATHS.API_PATHS[routeName])
  return `${isServer ? PATHS.PHOENIX_DOMAIN : ''}${PATHS.API_PREFIX_PATH}${path}`
}

console.log('##############')
console.log(apiPath('application', {id: 33, isServer: process.server}))
console.log('##############')