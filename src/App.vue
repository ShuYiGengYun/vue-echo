<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <MusicBar/>
  </div>
</template>

<script>
import Banner from '@/components/banner.vue'
import MusicBar from '@/components/musicBar.vue'
export default {
  name: 'App',
  components: {
    Banner,
    MusicBar
  }
}
</script>

<style lang="less" scoped>
</style>
