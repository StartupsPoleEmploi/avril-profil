import Vue from 'vue';
import get from 'lodash.get';

import {isFilled} from '~/utils/application';

export const state = () => [];

export const getters = {
  unfinishedApplications: state => state.filter(a => !isFilled(a)),
};

export const mutations = {
  updateStateFromServer(state, serverState) {
    (serverState || []).forEach(e => state.push(e));
  },
  updateApplication(state, newApplicationData) {
    state.splice(state.findIndex(a => a.id === newApplicationData.id), 1, newApplicationData)
  }
};

export const actions = {
  updateAndInform({ commit }, data) {
    commit('updateApplication', data)
  }
}