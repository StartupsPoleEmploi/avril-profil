import get from 'lodash.get';
import {isArray, isString} from 'avril/js/utils/boolean';
import {last, include} from 'avril/js/utils/array';
import {singularize, capitalize} from 'avril/js/utils/string';
import {objectToQueryString} from 'avril/js/utils/url';
import {partition} from 'avril/js/utils/object';

import shapes from '../constants/apiShapes';

const isDev = process.env.NODE_ENV !== 'production';

const serverUrl = context => get(context, 'env.serverToPhoenixUrl', '');

export const fetchApi = async (graphQLQuery, optionalContext) => {
  let fetcher;
  let url = '/api/v2';
  if (process.client) {
    fetcher = window.fetch;
  } else {
    fetcher = require('node-fetch');
    url = `${serverUrl(optionalContext)}${url}`;
  }

  console.log('&&&&&&&&&&&&&&&&&&&&')
  console.log(url)
  console.log('&&&&&&&&&&&&&&&&&&&&')

  const result = await fetcher(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(optionalContext ? {cookie: get(optionalContext, 'req.headers.cookie')} : {}),
    },
    body: JSON.stringify(graphQLQuery)
  });
  const jsonData = await result.json();

  console.log('*********************')
  console.log(result)
  console.log(jsonData)
  console.log('*********************')

  if (result.ok) {
    return jsonData;
  } else {
    throw jsonData;
  }
}

export const paramsToString = params => {
  if (!params) return '';
  return JSON.stringify(params)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/^{/, '(')
    .replace(/}$/, ')')
}

export const buildQuery = (name, type, params) => {
  return `{ ${name}${paramsToString(params)} ${shapes[type]} }`
}

export const queryApi = async (queryInfos, optionalContext) => {
  const {name, type, params} = isString(queryInfos) ? {name: queryInfos} : queryInfos;
  const query = buildQuery(name, type || singularize(name), params) ;

  let jsonData;
  try {
    if (queryInfos.static && optionalContext) {
      throw('Use static json')
    }

    jsonData = await fetchApi({query}, optionalContext);
  } catch(err) {
    if (isDev && !!optionalContext && (queryInfos.static || !serverUrl(optionalContext))) {
      // Fake API call to static json files
      console.warn('API not available, loading static files ...');

      const requestDomain = (context) => {
        const {req} = context || {};
        return req ? `${req.protocol}://${req.get('Host')}` : '';
      }

      const fakeURL = `${requestDomain(optionalContext)}${process.env.NUXT_PROFIL_PATH || ''}/json/${name}.json`;
      const result = await fetch(fakeURL);
      jsonData = await result.json();
    } else {
      throw err;
    }
  }
  console.log('#################')
  console.log(jsonData)
  console.log('#################')
  if (jsonData && jsonData.data) {
    return jsonData.data[name];
  } else {
    throw jsonData;
  }
}

export const mutateApi = async ({name, type, params}) => {

  const query = `mutation ${buildQuery(name, type, {input: params})}`;

  console.log(query)
  const jsonData = await fetchApi({query});
  if (jsonData.data) {
    return jsonData.data[name];
  } else {
    throw jsonData;
  }
}


export const queryApiOrRedirect = async (storeName, context) => {
  try {
    return await queryApi(storeName, context);
  } catch(jsonErr) {
    if (get(jsonErr, 'error.code') === 401 && get(jsonErr, 'error.redirect_to')) {
      return context.redirect(get(jsonErr, 'error.redirect_to'))
    } else {
      throw(jsonErr);
    }
  }
}
