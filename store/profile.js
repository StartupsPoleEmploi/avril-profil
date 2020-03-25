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

export const getters = {
  isFilled: (state) => false,
  username: ({firstNames, lastName}) => `${firstNames} ${lastName}`,
}

export const mutations = {
  initState(state, serverState) {
    state = Object.assign(state, serverState)
  },
}
