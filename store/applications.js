import Vue from 'vue';

export const state = () => [];

export const getters = {
};

export const mutations = {
  initState(state, serverState) {
    serverState.forEach(e => state.push(e));
  },
};

export const actions = {

};
