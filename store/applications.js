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
    state[state.findIndex(a => a.id === newApplicationData.id)] = newApplicationData;
  }
};

export const actions = {

};
