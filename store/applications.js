import Vue from 'vue';

import {isFilled} from '~/utils/application';

export const state = () => [];

export const getters = {
  unfinishedApplications: state => state.filter(a => !isFilled(a)),
};

export const mutations = {
  updateState(state, serverState) {
    serverState.forEach(e => state.push(e));
  },
};

export const actions = {

};
