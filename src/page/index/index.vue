<template>
  <div id="index" class="index" v-infinite-scroll = "loadmore" infinite-scroll-immediate-check="check" infinite-scroll-disabled="enable">
    <Banner :banners="banners"></Banner>
    <!--echo每日推荐-->
    <h3>echo每日推荐</h3>
    <Lists :lists="lists"></Lists>
    <div class="play-one-key"   id="audio" @click="playAll"><span class="play-circle"></span>一键播放</div>
    <spinner :type="3" class="spinner" v-show="isSpinnerShow"></spinner>
    <div class="nomoredata" v-if="isnomoredata">没有更多数据了</div>
  </div>
</template>

<script>
import Banner from '@/components/banner'
import Lists from '@/components/list'
import {InfiniteScroll, Spinner} from 'mint-ui'
import {getBanner, getLists} from '@/config/fetch'
import {mapActions, mapMutations, mapGetters, mapState} from 'vuex'
import Vue from 'vue'
Vue.use(InfiniteScroll)
export default {
  name: 'index',
  components: {
    Banner,
    Lists,
    Spinner
  },
  computed: {
    ...mapGetters({
      'musicLists': 'getMusicLists'
    }),
    ...mapState(['music', 'playLists'])
  },
  data () {
    return {
      banners: [],
      lists: [],
      page: 1,
      check: true,
      enable: false,
      isSpinnerShow: true,
      isnomoredata: false,
      isResultBack: true //  是否有返回数据
    }
  },
  created () {
    getBanner().then(res => {
      this.banners = res.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    loadmore () {
      if (!this.isResultBack) {
        return
      }
      this.isResultBack = false
      getLists(this.page).then(res => {
        this.isResultBack = true
        if (res.code === 0) {
          if (res.data) {
            this.lists = this.lists.concat(res.data)
            this.setListsById(res.data)
            this.isSpinnerShow = false
            this.page++
          } else {
            this.isnomoredata = true
          }
        } else {
          this.enable = true
        }
      }).catch(error => {
        console.log(error)
      })
    },
    //  将lists改为键为id的json格式
    setListsById (lists) {
      let json = {}
      for (let i = 0; i < lists.length; i++) {
        json[lists[i].sound.id] = lists[i]
      }
      this.setLists(json)
    },
    playAll () {
      this.setPlayLists(this.lists)
      //  当前音乐是否等于即将要播放的音乐?重新加载播放:播放即将播放的音乐
      if (this.music.data) {
        if (this.lists[0].sound.id === this.music.data.sound.id) {
          this.music.ele.load()
          this.music.ele.play()
        } else {
          this.setMusicData(this.lists[0])
        }
      } else {
        this.setMusicData(this.lists[0])
      }
    },
    ...mapActions(['setLists']),
    ...mapMutations({
      'setPlayMode': 'SET_PLAYMODE',
      'setMusicPlay': 'SET_MUSIC_PLAY',
      'setPlayLists': 'SET_PLAYLISTS',
      'setMusicData': 'SET_MUSIC_DATA'
    })
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/common.less";
.index{
  position: relative;
  h3{
    width: 240rem/@base;
    height:52rem/@base;
    line-height:52rem/@base;
    background-color:@bg-green;
    color: @txt-green;
    font-size: 12px;
    text-align: center;
    border-radius: 13px;
    margin-top: 40rem/@base;
    margin-bottom: 40rem/@base;
    margin-left: auto;
    margin-right: auto;
    & [data-dpr = '2']{
      font-size: 24px;
    }
    & [data-dpr = '3']{
      font-size: 36px;
    }
  }
  .spinner{
    margin: auto;
    display: block;
    width: 28rem/@base;
  }
  .nomoredata{
    text-align: center;
    font-size: 14px;
    color: @txt-green;
    padding: 20rem/@base 0;
  }
  .play-one-key{
    position: absolute;
    left: 0rem/@base;
    height: 56rem/@base;
    line-height: 56rem/@base;
    top: 600rem/@base;
    font-size: 14px;
    color: #fff;
    width: 200rem/@base;
    background-color:rgb(110, 213, 108);
    border-radius: 40rem/@base;
    text-align: right;
    padding-right: 20rem/@base;
    .play-circle{
      display: inline-block;
      width: 40rem/@base;
      height: 40rem/@base;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      left:16rem/@base;
      top: 50%;
      transform: translateY(-50%);
      &::after{
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-left: 16rem/@base solid rgba(110, 213, 108,1);
        border-top: 10rem/@base solid transparent;
        border-bottom: 10rem/@base solid transparent;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }

  }
}

</style>
