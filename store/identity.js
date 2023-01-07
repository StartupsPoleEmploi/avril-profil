import get from 'lodash.get';
import {isPresent, isBlank} from 'avril/js/utils/boolean';
import {deepMerge, getKeysDeep, exceptKeys} from 'avril/js/utils/object';
import {include, deduce} from 'avril/js/utils/array';

export const state = () => ({
  isServerData: false,
  lastName: null,
  usageName: null,
  firstName: null,
  gender: null,
  email: null,
  homePhone: null,
  mobilePhone: null,
  birthday: null,
  birthPlace: {
    city: null,
    county: null,
    country: null,
    lat: null,
    lng: null,
  },
  fullAddress: {
    street: null,
    city: null,
    postalCode: null,
    country: null,
    lat: null,
    lng: null,
  },
  nationality: {
    country: null,
    countryCode: null,
  },
  currentSituation: {
    status: null,
    employmentType: null,
    registerToPoleEmploi: null,
    registerToPoleEmploiSince: null,
    compensationType: null,
  },
  isHandicapped: null,
})

const OPTIONAL_FIELDS = [
  'usageName',
  'homePhone',
  'birthPlace.street',
  'birthPlace.postalCode',
  'birthPlace.county',
  'birthPlace.countryCode',
  'birthPlace.lat',
  'birthPlace.lng',
  'fullAddress.lat',
  'fullAddress.lng',
  'currentSituation.employmentType',
  'currentSituation.registerToPoleEmploiSince',
  'currentSituation.registerToPoleEmploi',
  'currentSituation.compensationType',
  'fullAddress.postalCode',
];

const UNSAVABLE_FIELDS = [
  'isServerData',
];

const MANDATORY_FIELDS = deduce(getKeysDeep(state()), OPTIONAL_FIELDS.concat(UNSAVABLE_FIELDS));

export const getters = {
  savableState: state => exceptKeys(state, UNSAVABLE_FIELDS),
  missingFields: state => MANDATORY_FIELDS.filter(k => isBlank(get(state, k))),
  isFilled: (state, {missingFields}) => missingFields.length === 0,
  username: ({firstName, lastName, email}) => [firstName, lastName].filter(v => v).join(' ') || email,
}

export const mutations = {
  updateState(state, newState) {
    state.isServerData = false;
    Object.assign(state, newState);
  },
  updateStateDeep(state, newState) {
    state.isServerData = false;
    Object.assign(state, deepMerge(state, newState));
  },
  updateStateFromServer(state, newState) {
    state.isServerData = true;
    Object.assign(state, newState);
  },
}

export const actions = {
  updateAndInform({ commit }, newState) {
    commit('updateStateFromServer', newState)
  }
}