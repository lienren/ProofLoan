<template>
  <div class="index-contain" :style="{height: `${height}px`}">
    <div class="title">
      <h2>VUX2</h2>
    </div>
    <group title="控件">
      <cell title="按钮" :link="{path:'/demo/button'}"></cell>
      <cell title="弹窗" :link="{path:'/dialog'}"></cell>
      <cell title="上拉加载下拉刷新" :link="{path:'/load'}"></cell>
      <cell title="无限加载" :link="{path:'/infiniteLoading'}"></cell>
      <cell title="常用输入组件" :link="{path:'/input'}"></cell>
      <cell title="登录组件" :link="{path:'/login'}"></cell>
      <cell title="媒体组件" :link="{path:'/camera'}"></cell>
    </group>
    <group title="接口">
      <cell title="调用接口" :link="{path:'/http'}"></cell>
    </group>
    <group title="Utils">
      <cell title="常用辅助方法" :link="{path:'/utils'}"></cell>
      <cell title="Sku Demo" :link="{path:'/sku'}"></cell>
    </group>
    <group title="微信">
      <cell title="测试微信jssdk" :link="{path:'/wx'}"></cell>
    </group>
    <group title="布局">
      <cell title="测试flexible适配" :link="{path:'/flexible'}"></cell>
    </group>
    <group title="404">
      <cell title="测试404页面" :link="{path:'/XXX'}"></cell>
    </group>
  </div>
</template>
<script>
import { Cell, Group } from 'vux'
import BLL from '../base'

export default {
  components: {
    Cell, Group
  },
  data () {
    return {
      height: window.innerHeight
    }
  },
  created () {
    // 初始化
    this.BLL = new BLL(this)
    console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
  },
  mounted () {
    this.$nextTick(() => {
      this.BLL.weixinInit({ title: 'yeye' })
    })
  }
}
</script>

<style lang="less" rel="stylesheet/less">
.index-contain {
  background-color: #fff;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  .title {
    letter-spacing: 15px;
    text-align: center;
    padding: 40px 0 0;
    font-weight: bold;
    font-size: 60px;
    color: white;
    text-shadow: 0 1px hsl(0, 0%, 85%), 0 2px hsl(0, 0%, 80%), 0 3px hsl(0, 0%, 75%), 0 4px hsl(0, 0%, 70%),
    0 5px hsl(0, 0%, 65%), 0 5px 10px black;
  }
}
</style>
