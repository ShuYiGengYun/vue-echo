<template>
  <div class="list" id="list">
    <ul>
      <li v-for="(list,index) in lists" :key="index">
        <router-link :to="{path:'detail',query:{id:list.sound.id}}">
          <div class="pic-wrap">
            <img v-lazy="list.sound.pic_500" alt="">
            <span></span>
          </div>
          <h4 class="title">{{list.sound.name}}</h4>
          <p class="sound-channel"><span class="left">{{list.sound.channel.name}}</span> <span class="right">频道</span></p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import {Lazyload} from 'mint-ui'
Vue.use(Lazyload)
export default {
  name: 'list',
  props: ['lists']
}
</script>

<style scoped lang="less">
@import "../assets/css/common";
.list{
  width: 100%;
  ul{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    li{
      width: 50%;
      box-sizing: border-box;
      padding: 0 20rem/@base;
      margin-bottom: 10rem/@base;
      img{
        width: 100%;
        height: auto;
      }
      .title{
        font-size: 12px;
        color: @txt-grey;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-top: 8rem/@base;
        margin-bottom: 8rem/@base;
      }
      .sound-channel{
        display: flex;
        justify-content:space-between;
        align-items: center;
        font-size: 10px;
        & [data-dpr='2']{
          font-size: 20px;
        }
        & [data-dpr ='3']{
          font-size: 30px;
        }
        color:@txt-green;
        .left{
          flex-grow: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

        }
        .right{
          color: @txt-grey;
          width: 80rem/@base;
          text-align: right;
          flex-shrink: 0;
        }
      }
    }
  }
}

</style>
