import * as types from './mutation-types'
const actions = {
  setTitle (context, data) {
    context.commit(types.SET_TITLE, data)
  },
  setMusic (context, data) {
    context.commit(types.SET_MUSIC, data)
  },
  setLists (context, data) {
    context.commit(types.SET_LISTS, data)
  }
}
export default actions
