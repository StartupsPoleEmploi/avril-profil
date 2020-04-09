import get from 'lodash.get';
import {isArray} from 'avril/js/utils/boolean';
import {last, include} from 'avril/js/utils/array';
import {singularize, capitalize} from 'avril/js/utils/string';
import {objectToQueryString} from 'avril/js/utils/url';
import {partition} from 'avril/js/utils/object';

import shapes from '../constants/apiShapes';

const isDev = process.env.NODE_ENV !== 'production';

const serverUrl = context => get(context, 'env.serverToPhoenixUrl', process.env.SERVER_TO_PHOENIX_URL || '');

export const fetchApi = async (graphQLQuery, optionalContext) => {
  let fetcher;
  let url = '/api/v2';
  if (process.client) {
    fetcher = window.fetch;
  } else {
    fetcher = require('node-fetch');
    url = `${serverUrl(optionalContext)}${url}`;
  }

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
  if (result.ok) {
    return jsonData;
  } else {
    throw jsonData;
  }
}

export const queryApi = async (storeName, optionalContext) => {
  const query = `{${storeName} ${shapes[singularize(storeName)]}}`;

  let jsonData;
  try {
    jsonData = await fetchApi({query}, optionalContext);
  } catch(err) {
    if (isDev && !serverUrl(optionalContext)) {
      // Fake API call to static json files
      console.warn('API not available, loading static files ...');

      const requestDomain = `${get(optionalContext, 'req.protocol')}://${get(optionalContext, 'req').get('Host')}`;
      const fakeURL = `${requestDomain}${process.env.NUXT_PROFIL_PATH || ''}/json/${storeName}.json`;
      const result = await fetch(fakeURL);
      jsonData = await result.json();
    } else {
      throw err;
    }
  }
  if (jsonData && jsonData.data) {
    return jsonData.data[storeName];
  } else {
    throw jsonData;
  }
}

export const mutateApi = async (storeName, input, optionalContext) => {
  const query = `
    mutation Update${capitalize(storeName)}($input: ${capitalize(storeName)}Input) {
      ${storeName}: update${capitalize(storeName)}(input: $input) ${shapes[singularize(storeName)]}
    }
  `;
  const jsonData = await fetchApi({query, variables: {input}}, optionalContext);
  if (jsonData.data) {
    return jsonData.data[storeName];
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
