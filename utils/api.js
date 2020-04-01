import get from 'lodash.get';
import {isArray} from 'avril/js/utils/boolean';
import {last} from 'avril/js/utils/array';
import {objectToQueryString} from 'avril/js/utils/url';
import {partition} from 'avril/js/utils/object';

const PATHS = {
  PHOENIX_DOMAIN: 'http://phoenix:4000',
  API_PREFIX_PATH: '/api/v2',
  API_QUERIES: {
    identity: `
      {
        identity {
          firstName
          usageName
          lastName
          email
          gender
          mobilePhone
          homePhone
          birthday
          isHandicapped,
          fullAddress{
            street
            city
            postalCode
            country
            lat
            lng
          }
          birthPlace{
            city
            country
          }
          nationality{
            country
            countryCode
          }
          currentSituation{
            status
            employmentType
            registerToPoleEmploi
            registerToPoleEmploiSince
            compensationType
          }
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
    delegates: `
      query ($applicationId: ID!, $geo: GeoInput!, $postalCode: String!) {
        delegateSearch(applicationId: $applicationId, geo: $geo, postalCode: $postalCode) {
          name
          address
          email
          personName
          telephone
          certifier {
            name
          }
        }
      }
    `,
  },
  // API_MUTATIONS: {
  //   identity: `
  //     mutation UpdateIdentity($input: IdentityInput!) {
  //     updateIdentity(input: $input) {
  //       ${PATHS.API_QUERIES.identity}
  //     }
  //   }
  //   `,
  // },
  API_PATHS: {
    identity: '/identity',
    applications: '/applications',
    delegates: '/applications/:slug/delegates',
  }
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

export async function fetchOrRedirectToSignIn(storeName, {req, redirect, store, route, env}) {
  const query = storeName;
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
    console.log(jsonData.data[query])
    return jsonData.data[query];
  } else {
    if (get(jsonData, 'error.code') === 401 && get(jsonData, 'error.redirect_to')) {
      return redirect(get(jsonData, 'error.redirect_to'))
    } else {
      console.log('Unknown error', jsonData)
    }
  }

}