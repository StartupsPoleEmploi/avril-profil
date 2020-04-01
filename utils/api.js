import get from 'lodash.get';
import {isArray} from 'avril/js/utils/boolean';
import {last, include} from 'avril/js/utils/array';
import {singularize} from 'avril/js/utils/string';
import {objectToQueryString} from 'avril/js/utils/url';
import {partition} from 'avril/js/utils/object';

import shapes from '~/constants/apiShapes';

const isDev = process.env.NODE_ENV !== 'production';

export const fetchApi = async (graphQLQuery, optionalContext) => {
  return await fetch(`${get(optionalContext, 'env.serverToPhoenixUrl', '')}/api/v2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(optionalContext ? {cookie: get(optionalContext, 'req.headers.cookie')} : {}),
    },
    body: JSON.stringify(graphQLQuery)
  })
}

export const queryApi = async (storeName, optionalContext) => {
  const query = `{${storeName} ${shapes[singularize(storeName)]}}`;

  let result, jsonData;
  try {
    result = await fetchApi({query}, optionalContext);
    jsonData = await result.json();
  } catch(err) {
    if (isDev && include(['ENOTFOUND', 'EAI_AGAIN', 'ECONNREFUSED'], err.code)) {
      const requestDomain = `${get(optionalContext, 'req.protocol')}://${get(optionalContext, 'req.host')}`
      console.log(requestDomain)
      // Fake API call to static json files
      console.warn('API not available ...', optionalContext.req.originalUrl)
      const fakeURL = `${requestDomain}${process.env.NUXT_PROFIL_PATH || ''}/json/${storeName}.json`;
      result = await fetch(fakeURL);
      jsonData = await result.json();
    } else {
      console.error(err);
    }
  }
  if (result.ok) {
    console.log(jsonData)
    return jsonData.data[storeName];
  } else {
    throw jsonData;
  }
}

export const mutateApi = async (mutationName, variables, optionalContext) => {
  const query = `
    mutation UpdateIdentity($input: IdentityInput!) {
      identity: updateIdentity(input: $input) {
        firstName
        lastName
        gender
      }
    }
  `;
  return await fetchApi({query, variables}, optionalContext);
}


export const queryApiOrRedirect = async (storeName, context) => {
  try {
    return await queryApi(storeName, context);
  } catch(jsonErr) {
    if (get(jsonErr, 'error.code') === 401 && get(jsonErr, 'error.redirect_to')) {
      return context.redirect(get(jsonErr, 'error.redirect_to'))
    } else {
      console.log('Could not fetch API', jsonErr)
    }
  }
}
