import {isPresent} from 'avril/js/utils/boolean';
import {deepMerge} from 'avril/js/utils/object';
import {include} from 'avril/js/utils/array';

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
];

const UNSAVABLE_FIELDS = [
  'isServerData',
]

const getSubstate = (state, filteredKeysArray) => {
  return Object.entries(state).filter(([k, v]) => !include(filteredKeysArray, k)).reduce((object, [k, v]) => {
    return {...object, [k]: v};
  }, {})
}

export const getters = {
  mandatoryState: state => getSubstate(state, OPTIONAL_FIELDS.concat(UNSAVABLE_FIELDS)),
  savableState: state => getSubstate(state, UNSAVABLE_FIELDS),
  isFilled: (state, {mandatoryState}) => Object.values(mandatoryState).every(isPresent),
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