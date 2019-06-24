import {
  UPDATE_NAME,
  RECEIVE_ACTIVE_MODULE_LISTS
} from "../mutation-types";

import {
  reqActiveModuleLists
} from "../../api/api";

const state = {
  activeName: '', // 活动名称
  activeModuleLists: [], // 活动模块列表
};

const mutations = {
  [UPDATE_NAME] (state, activeName) {
    state.activeName = activeName;
  },
  [RECEIVE_ACTIVE_MODULE_LISTS] (state, activeModuleLists) {
    state.activeModuleLists = activeModuleLists;
  }
};

const actions = {
  // 获取活动模块列表
  async getActiveModuleLists ({commit}) {
    const result = await reqActiveModuleLists();
    if (result.code === 0) {
      const activeModuleLists = result.content;
      commit(RECEIVE_ACTIVE_MODULE_LISTS, activeModuleLists)
    }
  }
};

const getters = {

};

export default {
  state,
  mutations,
  actions,
  getters
}
