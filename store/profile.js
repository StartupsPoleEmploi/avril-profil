import {isPresent} from 'avril/js/utils/boolean';
import {deepMerge} from 'avril/js/utils/object';

export const state = () => ({
  lastName: null,
  usageName: null,
  firstNames: null,
  sex: null,
  email: null,
  homePhoneNumber: null,
  cellPhoneNumber: null,
  birthday: null,
  birthPlace: {
    city: null,
    county: null,
    country: null,
    lat: null,
    lng: null,
  },
  address: {
    street: null,
    city: null,
    postalCode: null,
    country: null,
    lat: null,
    lng: null,
  },
  nationality: {
    country: null,
    country_code: null,
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
  'sex',
  'usageName',
  'homePhoneNumber',
];

export const getters = {
  mandatoryState: state => {
    const mstate = Object.keys(state).filter(k => !OPTIONAL_FIELDS.includes(k)).reduce((subState, k) => {
      return Object.assign(subState, {[k]: state[k]})
    }, {});
    return mstate;
  },
  isFilled: (state, {mandatoryState}) => Object.values(mandatoryState).every(isPresent),
  username: ({firstNames, lastName}) => `${firstNames} ${lastName}`,
}

export const mutations = {
  updateState(state, newState) {
    Object.assign(state, newState);
  },
  updateStateDeep(state, newState) {
    Object.assign(state, deepMerge(state, newState));
  },
}
