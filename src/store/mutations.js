import * as types from './mutation-types'
import localStorage from '../utils/cache'
const mutations = {
  [types.SET_TITLE] (state, data) {
    state.title = data.title
  },
  [types.SET_MUSIC] (state, data) {
    state.music = data
  },
  [types.SET_LISTS] (state, data) {
    state.lists = Object.assign(state.lists, data)
    localStorage.setItem('list', state.lists)
  },
  [types.SET_MUSIC_ELE] (state, data) {
    state.music.ele = data
  },
  [types.SET_MUSIC_CURRENTTIME] (state, data) {
    state.music.currentTime = data
  },
  [types.SET_MUSIC_PLAY] (state, data) {
    state.music.play = data
  },
  [types.SET_MUSIC_DATA] (state, data) {
    state.music.data = data
  },
  [types.SET_MUSIC_DURATION] (state, data) {
    state.music.duration = data
  },
  [types.SET_PLAYMODE] (state, data) {
    state.playMode = data
  },
  [types.SET_PLAYLISTS] (state, data) {
    state.playLists = data
    localStorage.setItem('playLists', data)
  },
  [types.SET_PLAYLISTS_BYID] (state, data) {
    let playLists = localStorage.getItem('playLists') ? localStorage.getItem('playLists') : []
    let index = playLists.findIndex(item => {
      return item.sound.id === data.sound.id
    })
    if (index <= -1) {
      playLists.push(data)
      state.playLists = playLists
    }
    localStorage.setItem('playLists', playLists)
  }
}
export default mutations
