<template>
  <div id="banner" class="banner">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(banner,index) in banners" :key="index">
        <router-link :to="{path:'detail',query:{id:banner.sound.id}}">
          <img :src="banner.sound.pic_640" alt="">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'mint-ui'
export default {
  name: 'banner',
  props: ['banners'],
  components: {
    'mt-swiper': Swiper,
    'mt-swiper-item': SwiperItem
  }
}
</script>

<style scoped lang="less">
  @import "../assets/css/common";
  .banner{
    height: 400rem/@base;
    width: 100%;
    padding-top: 10rem/@base;
    padding-right:10rem/@base;
    padding-left:10rem/@base;
    padding-bottom: 20rem/@base;
    background-color: #e8e8e8;
    box-sizing: border-box;

    & img{
      max-height: 100%;
    }
  }
</style>
