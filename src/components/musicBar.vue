<template>
  <div class="musicBar" id="musicBar" v-if="music.data">
    <div class="sound">
      <audio :src="music.data.sound.source"   ref="musicEle" id="musicEle"></audio>
      <div class="left">
        <img :src="music.data.sound.pic_500" alt="" class="avatar">
      </div>
      <div class="center">
        <p class="sound-name">
         {{music.data.sound.name}}
        </p>
        <p class="uploader">
          {{music.data.sound.user.name}}
        </p>
      </div>
      <div class="right">
        <span class="music-lists  iconfont icon-music" @click="showMySheet"></span>
        <span class="music-play iconfont" :class="play?'icon-play1':'icon-pause1'" @click.stop="setPlay"></span>
        <span class="music-next iconfont icon-ic_song_next" @click="playMode_init"></span>
      </div>
    </div>
    <Progress :value="getMusicProgress" :bar-height="3"/>
    <Sheet ref="mysheet"/>
  </div>
</template>

<script>
import {Progress} from 'mint-ui'
import {mapGetters, mapMutations, mapState} from 'vuex'
import Sheet from '@/components/sheet'
export default {
  name: 'musicBar',
  data () {
    return {
      value: 50
    }
  },
  components: {
    Progress,
    Sheet
  },
  computed: {
    ...mapState({
      'playMode': (state) => state.playMode,
      'music': (state) => state.music,
      'playLists': (state) => state.playLists,
      'musicData': (state) => state.music.data,
      'play': (state) => state.music.play
    }),
    ...mapGetters({
      'lists': 'getMusicLists',
      'getMusicById': 'getMusicById',
      'getMusicProgress': 'getMusicProgress'
    })
  },
  watch: {
    musicData: {
      handler (newValue, oldValue) {
        if (newValue) {
          this.$nextTick(() => {
            this.musicInit()
          })
        }
      }
    },
    play: {
      handler (newValue, oldValue) {
        newValue ? this.music.ele.play() : this.music.ele.pause()
      }
    }
  },
  methods: {
  //  元素初始化
    musicInit () {
      let _musicEle = this.$refs.musicEle
      let _this = this
      this.setMusicEle(_musicEle)
      _musicEle.addEventListener('canplay', function () {
        _musicEle.play()
        _this.setMusicDuraion(_musicEle.duration)
      })
      _musicEle.addEventListener('timeupdate', function () {
        _this.setMusicCurrentTime(~~_musicEle.currentTime)
      })
      _musicEle.addEventListener('play', function () {
        _this.setMusicPlay(true)
      })
      _musicEle.addEventListener('pause', function () {
        _this.setMusicPlay(false)
      })
      _musicEle.addEventListener('ended', function () {
        _this.setMusicPlay(false)
        _this.playMode_init()
      })
    },
    setPlay () {
      let bool = !this.play
      this.setMusicPlay(bool)
    },
    playMode_init () {
      switch (this.playMode) {
        case 'random':
          this.randomPlay()
          break
        case 'singleRepeat':
          this.singleRepeat()
          break
        case 'listRepeat':
          this.listRepeat()
          break
        default:
          this.listRepeat()
      }
    },
    //  随机播放
    randomPlay () {
      let len = this.playLists.length
      let randomIndex = Math.floor(Math.random() * len)
      this.setMusicData(this.playLists[randomIndex])
    },
    //  单曲循环
    singleRepeat () {
      this.music.ele.load()
      this.music.ele.play()
    },
    //  列表循环
    listRepeat () {
    //  获取当前播放音乐的index
      let currentIndex = this.playLists.findIndex(item => item.sound.id === this.music.data.sound.id)
      let nextIndex = -1
      if (currentIndex === (this.playLists.length - 1)) {
        nextIndex = 0
      }
      nextIndex = currentIndex + 1
      if (this.playLists[nextIndex].sound.id === this.music.data.sound.id) {
        this.music.ele.load()
        this.music.ele.play()
      } else {
        this.setMusicData(this.playLists[nextIndex])
      }
    },
    showMySheet () {
      this.$refs.mysheet.toggleVisible()
    },
    ...mapMutations({
      'setMusicEle': 'SET_MUSIC_ELE',
      'setMusicCurrentTime': 'SET_MUSIC_CURRENTTIME',
      'setMusicPlay': 'SET_MUSIC_PLAY',
      'setMusicData': 'SET_MUSIC_DATA',
      'setMusicDuraion': 'SET_MUSIC_DURATION',
      'setMusicPlayMode': 'SET_MUSIC_PLAYMODE'
    })
  }
}
</script>
<style scoped lang="less">
@import "../assets/css/common";
.musicBar{
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: rgba(255,255,255,.8);
  z-index: 20141241;
  .sound{
    height:90rem/@base;
    display: flex;
    justify-content:flex-start;
    padding-left: 20rem/@base;
    padding-right: 20rem/@base;
    align-items: center;
    .left{
      width:80rem/@base;
      height:80rem/@base;
      flex-shrink: 0;
      img{
       width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding:4rem/@base;
        background-color: #fff;
      }
    }
    .center{
      font-size: 10px;
      width: 340rem/@base;
      margin-left:20rem/@base;
      flex-shrink: 1;
      height: 80rem/@base;
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;
      P{
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 40rem/@base;
        line-height: 40rem/@base;
      }
    }
    .right{
      flex-grow: 1;
      display: flex;
      justify-content:space-between;
      align-items:center;
      span{
        width: 80rem/@base;
        height: 80rem/@base;
        display: inline-block;
        &.iconfont{
          font-size: 34px;
          line-height: 80rem/@base;
        }
      }
    }
  }
  .mt-progress{
    height: 3px;
  }
}
</style>
