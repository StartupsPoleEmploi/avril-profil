import get from 'lodash.get';
import {isArray} from 'avril/js/utils/boolean';
import {last} from 'avril/js/utils/array';
import {objectToQueryString} from 'avril/js/utils/url';
import {partition} from 'avril/js/utils/object';
import { createApolloFetch } from 'apollo-fetch';

const PATHS = {
  PHOENIX_DOMAIN: 'http://phoenix:4000',
  API_PREFIX_PATH: '/api/v2',
  API_QUERIES: {
    profile: `
      {
        profile {
          firstName
          # usageName
          lastName
          email
          gender
          phoneNumber
          # mobilePhone
          # homePhone
          birthday
          # isHandicapped,
          fullAddress{
            street
            city
            postalCode
            country
            # lat
            # lng
          }
          birthPlace{
            city
            #  countryCode
          }
          # currentSituation{
          #   status
          #   employmentType
          #   registerToPoleEmploi
          #   registerToPoleEmploiSince
          #   compensationType
          # }
        }
      }
    `,
    applications: `
      {
        applications {
          id
          # booklet_1
          bookletHash
          insertedAt
          certification {
            acronym
            label
            level
            slug
          }
          delegate {
            name
            address
            personName
            email
            telephone
            certifier {
              name
            }
          }
        }
      }
    `,
  },
  API_PATHS: {
    profile: '/profile',
    applications: '/applications',
    delegates: '/applications/:slug/delegates',
  }
}

export const apiPath = (routeName, params={}) => {
  const {pathParams, queryParams} = partition(params, (v, k) => {
    return PATHS.API_PATHS[routeName].indexOf(`:${k}`) > -1 ? 'pathParams' : 'queryParams';
  })
  console.log(params)
  console.log(pathParams, queryParams);
  const path = Object.keys(pathParams || {}).reduce((route, key) => {
    return route.replace(new RegExp(`:${key}`), params[key])
  }, PATHS.API_PATHS[routeName] || '')
  return `${PATHS.API_PREFIX_PATH}${path}?${objectToQueryString(queryParams || {})}`
}

export async function fetchWithCookie(query, req){
  return await fetch(`${PATHS.PHOENIX_DOMAIN}${PATHS.API_PREFIX_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: req.headers.cookie,
    },
    body: JSON.stringify({
      query: PATHS.API_QUERIES[query],
    })

  })
}

export async function fetchOrRedirectToSignIn(query, {req, redirect, store, route, env}) {
  let result;
  try {
    result = await fetchWithCookie(query, req)
  } catch(err) {
    if (err.code === 'ENOTFOUND' || err.code === 'EAI_AGAIN' || err.code === 'ECONNREFUSED') {
      console.warn('API not available ...')
      // Fake API call to static json files
      const fakeURL = `http://localhost:${process.env.PORT || 3000}${process.env.NUXT_PROFIL_PATH || ''}/json/${query}.json`;
      result = await fetch(fakeURL);
    }
  }
  const jsonData = await result.json();

  if (result.ok) {
    console.log(jsonData.data)
    return jsonData;
  } else {
    if (get(jsonData, 'error.code') === 401 && get(jsonData, 'error.redirect_to')) {
      return redirect(get(jsonData, 'error.redirect_to'))
    } else {
      console.log('Unknown error', jsonData)
    }
  }

}