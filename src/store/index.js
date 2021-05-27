import Vue from 'vue'
import Vuex from 'vuex'
import AppConfig from './modules/app-config'
import TreatmentTags from './modules/treatment-tags'
import WorkingTask from './modules/WorkingTask'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    AppConfig,
    TreatmentTags,
    WorkingTask
  }
})
