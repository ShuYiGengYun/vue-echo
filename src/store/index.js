import vue from 'vue'
import vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import state from './state'
import getters from './getters'
vue.use(vuex)
const store = new vuex.Store({
  mutations,
  actions,
  state,
  getters
})
export default store
