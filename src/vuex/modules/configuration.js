import {UPDATE_NAME} from "../mutation-types";

const state = {
  activeName: ''
};

const mutations = {
  [UPDATE_NAME] (state,activeName) {
    state.activeName = activeName;
  }
};

const actions = {

};

const getters = {

};

export default {
  state,
  mutations,
  actions,
  getters
}
