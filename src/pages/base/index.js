// BLL基类
export default class Base {
  constructor (vm) {
    this.vm = vm
    // 页面切换后自动回到顶部
    if (this.vm.$store.getters.route.path !== '/') {
      this.vm.$nextTick(() => {
        this.vm.$parent.scrollTo(0)
      })
    }
  }

  // 微信初始化
  weixinInit ({ title, desc, link, imgUrl } = {}) {
   /* if (this.vm.$device.isWechat) {
      let jsUrl = encodeURI(window.location.href.split('#')[0]) // 当前页面URL
      if (this.vm.$device['isIphone']) {
        // 微信浏览器&&苹果设备, 取出记录的第一次访问的URL
        jsUrl = encodeURI(this.vm.$store.state.global.jsUrl.split('#')[0])
      }
      this.vm.$utils.WeiXin.init(
        () => {
          this.vm.$vux.loading.show('微信初始化中')
        },
        () => {
          // const _this = this
          this.vm.$utils.WeiXin.share({
            title: title || '分享标题', // 分享标题
            desc: desc || '分享描述', // 分享描述
            link: link || 'https://poc.51pinzhi.cn/vux2/', // 分享链接
            imgUrl: imgUrl || 'http://placehold.it/100x100', // 分享图标
            success () {
              // _this.$vux.toast.show('分享成功回调')
            },
            cancel () {
              // _this.$vux.toast.show('取消分享回调')
            }
          })
          this.vm.$vux.loading.hide()
        },
        jsUrl
      )
    } */
  }
}
