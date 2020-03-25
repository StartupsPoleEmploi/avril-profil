import Vue from 'vue';

export const state = () => [];

export const getters = {
};

export const mutations = {
  updateState(state, serverState) {
    serverState.forEach(e => state.push(e));
  },
};

export const actions = {

};
