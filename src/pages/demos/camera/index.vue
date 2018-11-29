<template>
  <div class="container">
    <div class='clearfix span'></div>
    <group title='拍照'>
      <cell title="上传照片" @click.native='BLL.uploadImg($event)' is-link></cell>
      <div style="padding: 10px" v-if="imgList">
        <p>{{imgList}}</p>
        <div v-for="item in imgList" :key="item" style="float: left;margin:0 5px 5px 0">
          <img :src="item" style="width: 150px">
        </div>
      </div>
    </group>
    <div class='clearfix span'></div>
    <group title='视频'>
      <cell title="拍摄视频" @click.native='BLL.uploadVideo($event)' is-link></cell>
      <video width="100%" :src="video" controls height="60%" webkit-playsinline="true" playsinline="true"
             v-if="video"></video>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import BLL from './index'

export default {
  components: {
    Group, Cell
  },
  data () {
    return {
      imgList: null,
      video: null
    }
  },
  computed: {},
  created () {
    // 初始化
    this.BLL = new BLL(this)
  },
  beforeDestroy () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import "index";
</style>
