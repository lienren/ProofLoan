<template>
  <div class="container">
    <div class="box">
      <x-button type="comm">实心按钮</x-button>
      <x-button plain type="comm">空心按钮</x-button>
      <x-button type="comm" disabled>实心按钮（不可点击）</x-button>
      <x-button plain type="comm" disabled>空心按钮（不可点击）</x-button>
      <divider>Loading Button</divider>
      <x-button type="comm" :show-loading="loading" @click.native="next">{{btnTxt}}</x-button>
      <x-button type="comm" plain :show-loading="loading" @click.native="next">{{btnTxt}}</x-button>
      <br/><br>
      <divider>自定义按钮样式</divider>
      <x-button type="my">实心按钮</x-button>
      <x-button plain type="my">空心按钮</x-button>
    </div>
  </div>
</template>

<script>
import { XButton, Box, Divider } from 'vux'

export default {
  components: {
    XButton, Box, Divider
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    btnTxt () {
      return this.loading ? '加载中...' : '下一步'
    }
  },
  methods: {
    test () {
      this.$router.push('/home')
    },
    next () {
      if (!this.loading) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 2000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  min-height: 100%;
  .box {
    padding: 15px;
    // 这里注意要先加载btn.less再设置属性，否则无效
    @import "../../assets/styles/Global/btn.less";
    // 自定义按钮样式
    // 总共有6个属性可设置，如果不设置，则使用comm样式
    // 如果同一个页面有多个自定义按钮样式，不能写在同一个<style>中
    @btn-name: my;
    @button-color: #9a7250;
    @button-bg-color: linear-gradient(0deg, #fbd04c, #ffdf7d);
    @button-plain-color: #E64340;
    @button-active-color: pink;
    @button-active-bg-color: linear-gradient(0deg, #E64340, #ffdf7d);
  }
}
</style>
