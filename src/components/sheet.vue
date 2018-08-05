<template>
  <div id="sheet" class="sheet">
   <!--播放列表-->
    <mu-bottom-sheet :open.sync="open" @close="open = false">
      <!--头部提示-->
      <div class="playlist-header">
        <div class="left">播放列表 <span>({{playLists.length}})首</span></div>
        <div class="right" @click="showPlayMode">
          <mu-button icon color="success">
            <mu-icon right value="more_vert"></mu-icon>
          </mu-button>
        </div>
      </div>
      <!--列表-->
      <mu-list>
        <mu-list-item button :ripple="true" v-for="(item,index) in playLists" :key="index" @click="selectItem(item)" :class="{active:item.sound.id === music.data.sound.id}">
          <mu-list-item-action>
            <div class="item-action-container">
               <span class="item-action-left">
                 <mu-icon size="20" value="play_circle_filled" v-if="item.sound.id === music.data.sound.id"></mu-icon>
                 <mu-icon size="20" value="album" v-else></mu-icon>
            </span>
              <span class="item-action-center">
               {{item.sound.name}}
            </span>
              <span class="item-action-right" @click.stop="deleteItem(item)">
              <mu-icon size="20" value="cancel"></mu-icon>
            </span>
            </div>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
    <!--播放模式列表-->
    <mu-bottom-sheet :open.sync="show" @close="show = false" class="playModeLists">
      <mu-list>
        <mu-list-item button :ripple="true" v-for="(item, index) in playModeLists" :key="index" :class="{active:item.val === playMode}" @click="selectPlayMode(item)">
          <mu-list-item-action>
            <span class="item-action-left">
              {{item.title}}
            </span>
            <span class="item-action-right">
              <mu-icon size="20" :value="item.icon"></mu-icon>
            </span>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      open: false,
      actions: [
        {
          name: 'title',
          subname: 'subtitle',
          className: 'enene'
        }
      ],
      playModeLists: [
        {title: '默认', val: 'default', icon: 'more_vert'},
        {title: '随机播放', val: 'random', icon: 'all_inclusive'},
        {title: '单曲循环', val: 'singleRepeat', icon: 'repeat_one'},
        {title: '列表循环', val: 'listRepeat', icon: 'repeat'}
      ],
      show: false
    }
  },
  computed: {
    ...mapState(['playLists', 'music', 'playMode'])
  },
  methods: {
    toggleVisible () {
      this.open = !this.open
    },
    selectItem (item) {
      this.setMusicData(item)
    },
    deleteItem (item) {
      let index = this.playLists.findIndex(value => value.sound.id === item.sound.id)
      this.playLists.splice(index, 1)
    },
    //  选择播放模式
    showPlayMode () {
      this.show = true
    },
    selectPlayMode (item) {
      this.setPlayMode(item.val)
    },
    ...mapMutations({
      'setMusicData': 'SET_MUSIC_DATA',
      'setPlayLists': 'SET_PLAYLISTS',
      'setPlayMode': 'SET_PLAYMODE'
    })
  }
}
</script>

<style lang="less" scoped>
@import "../assets/css/common";
.playlist-header{
  height:90rem/@base;
  font-size: 12px;
  position: relative;
  border-top: 1px solid #f4f4f4;
  .left{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
    z-index: 50;
    color: #4caf50;
  }
  .right{
    position: absolute;
    right: 0;
  }
}
.mu-list{
  max-height: 400rem/@base;
  li{
    font-size: 15px;
    border-bottom: 1px solid #f4f4f4;
    &.active{
      .item-action-container{
        color: #4caf50;
      }
    }
  }
  .mu-item-action{
    width: 100%;
  }
  .item-action-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .item-action-left{
      width: 20px;
      flex-shrink: 0;
      line-height: 0;
    }
    .item-action-right{
      width:40px;
      flex-shrink: 0;
      line-height: 0;
      padding: 10px;
      text-align: center;
      position: absolute;
      right: 10px;
    }
    .item-action-center{
      flex: 1;
      padding-left: 20px;
      box-sizing: border-box;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
.playModeLists {
  .mu-list{
    .active{
      .mu-item-action{
        color: #4caf50;
      }
    }
  }
  .mu-item-action {
    display: flex;
    justify-content:space-between;
    align-items: center;
    flex-direction: row;
  }
}
</style>
