import localStorage from '../utils/cache'
const getters = {
  getMusicLists: (state) => {
    let result = null
    let listsLen = Object.keys(state.lists)
    if (listsLen.length <= 0) {
      result = localStorage.getItem('list')
      state.lists = result
    } else {
      result = state.lists
    }
    return result
  },
  getMusicById: (state, getters) => (id) => {
    let lists = getters.getMusicLists
    return lists.hasOwnProperty(id) ? lists[id] : ''
  },
  getMusicProgress: (state, getters) => {
    return parseFloat((state.music.currentTime / state.music.duration * 100).toFixed(2))
  },
  getPlayLists: (state, getters) => {
    let result = state.playLists
    if (result.length <= 0) {
      result = localStorage.getItem('playLists') ? localStorage.getItem('playLists') : []
      state.playLists = result
    } else {
      result = state.playLists
    }
    return result
  }
}
export default getters
