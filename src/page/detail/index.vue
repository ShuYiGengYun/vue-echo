<template>
    <div id="detail" v-if="music.data">
      <!--顶部tab-->
      <div class="user-tab">
        <div class="user">
          <div class="user-avatar"><img :src="music.data.sound.user.avatar_50" alt="" class="avatar"></div>
          <div class="user-name">{{music.data.sound.user.name}}</div>
        </div>
        <div class="fans">
          粉丝<span class="follows">{{music.data.sound.user.followed_count}}</span>
        </div>
      </div>
      <div class="sound_cover">
        <img :src="music.data.sound.pic_500" alt="">
          <span class="progress-show" @click.stop="seek">{{music.currentTime | sec2his}} / {{music.duration | sec2his}}</span>
          <mt-progress :value="getMusicProgress" :bar-height="16"></mt-progress>
        <div class="controls">
          <div class="btn" :class="[music.play === true ? 'pause' : 'play']" @click="music.play = !music.play"></div>
          <div class="info">
            <p class="info-name">
              {{music.data.sound.name}}
            </p>
            <p class="info-channel">
              <span class="uploader">{{music.data.sound.user.name}}</span>
              发布在
              <span class="channel">{{music.data.sound.channel.name}}</span>
            </p>
          </div>
          <div class="danmu_btn" :class="{on: isDanmuOn}" @click="isDanmuOn =!isDanmuOn"></div>
        </div>
      </div>
      <!--基本信息-->
      <div class="sound_info">
        <div class="info-left">
          <div class="play_num">{{music.data.sound.view_count}}播放</div>
          <div class="likes_num">{{music.data.sound.like_count}}喜欢</div>
        </div>
        <div class="info-right">
          设为手机铃声
        </div>
      </div>
      <div class="info_lyric">
        <template v-if='music.data.sound.song_info'>
          <p v-if='music.data.sound.song_info.album_name'>{{music.data.sound.song_info.album_name.type}} : {{music.data.sound.song_info.album_name.name}}</p>
          <p v-if='music.data.sound.song_info.author'>{{music.data.sound.song_info.author.type}} : {{music.data.sound.song_info.author.name}}</p>
          <p v-if='music.data.sound.song_info.name'>{{music.data.sound.song_info.name.type}} : {{music.data.sound.song_info.name.name}}</p>
        </template>
        <div v-if="music.data.sound.lyrics" v-html="music.data.sound.lyrics"></div>
        <div v-if="!music.data.sound.song_info && !music.data.sound.lyric" class="noLyric">没有相关的歌词T T~ </div>
      </div>
      <!--相关推荐-->
      <div class="relative_recommed">
        <List :lists="lists"/>
      </div>
    </div>
</template>

<script>
import List from '@/components/list'
import {getOtherLists} from '@/config/fetch'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  name: 'detail',
  components: {
    List
  },
  data () {
    return {
      isDanmuOn: false,
      lists: [],
      playLists: []
    }
  },
  computed: {
    ...mapState(['music', 'duration']),
    ...mapGetters(['getMusicLists', 'getPlayLists', 'getMusicProgress'])
  },
  watch: {
    '$route': 'fetchData'
  },
  mounted () {
    this.fetchData()
    this.getOtherLists()
  },
  methods: {
    fetchData (to, from) {
      this.getSoundById()
      this.playLists = this.getPlayLists
    },
    getSoundById () {
      if (this.$route.path.includes('detail')) {
        let id = this.$route.query.id
        let musicLists = this.getMusicLists
        let music = null
        if (musicLists.hasOwnProperty(id)) {
          music = musicLists[id]
          this.setMusicData(music)
          this.setPlayListsById(music)
        }
      }
    },
    getOtherLists () {
      getOtherLists().then(res => {
        if (res.code === 0) {
          this.lists = res.data
          this.setListsById(this.lists)
        }
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
    //  调节进度条
    seek (e) {
      let event = e || window.event
      let percent = (event.pageX / window.innerWidth).toFixed(2)
      let currentTime = this.music.duration * percent
      this.music.ele.currentTime = currentTime
      this.setMusicCurrentTime(currentTime)
    },
    ...mapActions(['setLists']),
    ...mapMutations({
      'setMusicData': 'SET_MUSIC_DATA',
      'setPlayLists': 'SET_PLAYLISTS',
      'setPlayListsById': 'SET_PLAYLISTS_BYID',
      'setMusicCurrentTime': 'SET_MUSIC_CURRENTTIME'
    })
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/common.less";
.user-tab{
  width: 100%;
  height:120rem/@base;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 30rem/@base;
  display: flex;
  justify-content:space-between;
  align-items: center;
  font-size: 12px;
  .user{
    display: flex;
    justify-content: center;
    align-items: center;
    .user-avatar{
      width: 80rem/@base;
      height: 80rem/@base;
      .avatar{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-name{
      margin-left: 20rem/@base;
      font-size: 14px;
    }
  }
  .follows{
    color: #639E5E;
    padding-left: 10rem/@base;
  }
}
.sound_cover{
  width: 100%;
  position: relative;
  .progress-show{
    position: absolute;
    bottom: 120rem/@base;
    left: 0;
    height: 16px;
    font-size: 14px;
    color: #fff;
    z-index: 10;
    line-height: 16px;
    width: 100%;
  }
  .mt-progress{
    position: absolute;
    bottom: 120rem/@base;
    width: 100%;
    height: 16px;
    line-height: 16px;
  }
  img{
    width: 100%;
    height: 700rem/@base;
  }
  .controls{
    height: 120rem/@base;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content:space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    .btn{
      width: 80rem/@base;
      height: 80rem/@base;
      margin-left: 10rem/@base;
      margin-right: 10rem/@base;
      &.play{
        background: url('~@/assets/img/play.png') no-repeat center center;
        background-size: cover;
      }
      &.pause{
        background: url('~@/assets/img/pause.png') no-repeat center center;
        background-size: cover;
      }
    }
    .info{
      font-size: 12px;
      flex: 1;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      .info-name{
        font-size: 14px;
        text-align: left;
        color: #fff;
      }
      .info-channel{
        color: #fff;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .uploader,.channel{
        color: #6ed56c;
      }
    }
    .danmu_btn{
      width: 120rem/@base;
      height: 50rem/@base;
      background-image: url("~@/assets/img/danmu_off.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      margin-right: 40rem/@base;
      &.on{
        background-image: url("~@/assets/img/danmu_on.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
      }
    }
  }
}
.sound_info{
  padding: 0 40rem/@base;
  height: 100rem/@base;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #a9a9a9;
  border-bottom: 1px solid #e8e8e8;
  .info-left{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .play_num{
      padding-left: 30rem/@base;
      position: relative;
      &::after{
        display: block;
        content: '';
        width: 20rem/@base;
        height: 21rem/@base;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background-image: url("~@/assets/img/play_num.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        z-index: 10;
      }
    }
    .likes_num{
      margin-left: 30rem/@base;
      padding-left: 30rem/@base;
      position: relative;
      &::after{
        display: block;
        content: '';
        width: 20rem/@base;
        height: 21rem/@base;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background-image: url("~@/assets/img/like_num.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        z-index: 10;
      }
    }
  }
  .info-right{
    color:#6ed56c;
    position: relative;
    padding-left: 42rem/@base;
  }
  .info-right::after{
    display: block;
    content: '';
    width: 40rem/@base;
    height: 42rem/@base;
    position: absolute;
    background-image: url("~@/assets/img/bell.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    left: 0;
  }
}
.info_lyric{
  font-size: 14px;
  padding-top: 20rem/@base;
  padding-left: 20rem/@base;
  padding-right: 20rem/@base;
  padding-bottom: 30rem/@base;
  white-space: pre-wrap;
  text-align: left;
}

</style>
<style lang="less">
  .mt-progress-runway{
    background-color: rgba(0,0,0,0.2);
  }
</style>
