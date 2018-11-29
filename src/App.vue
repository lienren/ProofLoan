<template>
  <div style="height:100%;">
    <view-box ref="viewBox">
      <!--region 遮罩层-->
      <div class="weui-mask transparent" v-show="showMask"></div>
      <!--endregion-->
      <!--region 主体内容-->
      <div class="page-wrap" :class="{'wx-page-wrap':$device.isWechat}">
        <transition :name="transitionName" @after-enter="afterEnter" :css="!!direction">
          <router-view class="router-view"></router-view>
        </transition>
      </div>
      <!--endregion-->
    </view-box>
  </div>
</template>

<script>
import { ViewBox, Loading } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    ViewBox, Loading
  },
  created () {
    // support eruda
    // more info https://github.com/liriliri/eruda
    if (this.$utils.Common.getParam('debug')) {
      const script = document.createElement('script')
      script.src = '//cdn.jsdelivr.net/npm/eruda'
      document.body.appendChild(script)
      script.onload = function () { window.eruda.init({ tool: ['console', 'network', 'sources'] }) }
    }
  },
  mounted () {
  },
  beforeDestroy () { },
  data () {
    return {
      transition: 'go'
    }
  },
  computed: {
    ...mapState({
      direction: ({ global }) => global.direction,
      showMask: ({ global }) => global.showMask
    }),
    transitionName () {
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    }
  },
  methods: {
    afterEnter () {
      // 过场动画完成后
      // 去除全屏遮罩
      this.$store.commit('SHOW_MASK', false)
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import 'assets/styles/Global/close';
@import 'assets/styles/App/common';
@import 'assets/styles/App/custom';
@import 'assets/styles/Global/comm_btn';
</style>
