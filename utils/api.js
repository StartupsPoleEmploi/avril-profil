import get from 'lodash.get';
import {isArray} from 'avril/js/utils/boolean';
import {last, include} from 'avril/js/utils/array';
import {singularize, capitalize} from 'avril/js/utils/string';
import {objectToQueryString} from 'avril/js/utils/url';
import {partition} from 'avril/js/utils/object';

import shapes from '../constants/apiShapes';

const isDev = process.env.NODE_ENV !== 'production';

export const fetchApi = async (graphQLQuery, optionalContext) => {
  const result = await fetch(`${get(optionalContext, 'env.serverToPhoenixUrl', '')}/api/v2`, {
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
    if (isDev && include(['ENOTFOUND', 'EAI_AGAIN', 'ECONNREFUSED'], err.code)) {
      const requestDomain = `${get(optionalContext, 'req.protocol')}://${get(optionalContext, 'req.host')}`
      // Fake API call to static json files
      console.warn('API not available ...')
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
