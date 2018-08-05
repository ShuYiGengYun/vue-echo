const state = {
  title: '首页',
  banners: [],
  lists: {},
  music: {
    ele: null,
    data: null,
    play: false, // 播放状态 0 停止 1 播放 2 暂停
    currentTime: 0,
    duration: 0
  },
  playMode: 'default',
  playLists: [] //  播放列表
}
export default state
