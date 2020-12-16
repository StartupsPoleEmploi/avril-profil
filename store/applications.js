import Vue from 'vue';
import get from 'lodash.get';

import {isFilled} from '~/utils/application';

export const state = () => ({applications: []});

export const getters = {
  unfinishedApplications: ({applications}) => applications.filter(a => !isFilled(a)),
};

export const mutations = {
  updateStateFromServer(state, serverState) {
    state.applications = serverState;
  },
  updateApplication({applications}, newApplicationData) {
    applications.splice(applications.findIndex(a => a.id === newApplicationData.id), 1, newApplicationData)
  }
};

export const actions = {
  updateAndInform({ commit }, data) {
    commit('updateApplication', data)
  },
}