import {
  UPDATE_NAME,
  RECEIVE_ACTIVE_MODULE_LISTS
} from "../mutation-types";

import {
  reqActiveModuleLists
} from "../../api/api";

const state = {
  activeName: '', // 活动名称
};

const mutations = {
  [UPDATE_NAME] (state, activeName) {
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
