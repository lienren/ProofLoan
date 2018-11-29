<template>
  <div class="container">
    <div class="weui-uploader" style="padding:15px;">
      <div class="weui-uploader__bd">
        <ul class="weui-uploader__files" v-show="imageUrlUpload">
          <li class="weui-uploader__file" :style="backgroundDiv"></li>
        </ul>
        <div class="weui-uploader__input-box" v-show="!imageUrlUpload">
          <div class="weui-uploader__input" @click="chooseImage">
          </div>
        </div>
      </div>
      <p class="weui-uploader__title" style="word-break: break-all">图片地址：{{imageUrlUpload}}</p>
      <box gap="10px 0">
        <x-button type="comm" mini @click.native="uploadImage()">上传到服务器</x-button>
      </box>
      <div class="weui-uploader__bd">
        <ul class="weui-uploader__files" v-show="imageUrlServer">
          <li class="weui-uploader__file" :style="backgroundDiv2"></li>
        </ul>
      </div>
      <div class="weui-uploader__title" style="word-break: break-all">服务器地址：{{imageUrlServer}}</div>
    </div>
  </div>
</template>

<script>
import { XButton, Box } from 'vux'
import BLL from '../base'

export default {
  components: {
    XButton, Box
  },
  data () {
    return {
      imageUrlUpload: '',
      imageUrlUploadBase64: '',
      imageUrlServer: ''
    }
  },
  computed: {
    backgroundDiv () {
      return {
        backgroundImage: 'url(' + (this.imageUrlUploadBase64 || this.imageUrlUpload) + ')'
      }
    },
    backgroundDiv2 () {
      return {
        backgroundImage: 'url(' + this.imageUrlServer + ')'
      }
    }
  },
  created () {
    // 初始化
    this.BLL = new BLL(this)
  },
  mounted () {
    this.$nextTick(() => {
      this.BLL.weixinInit({ title: 'haha' })
    })
  },
  methods: {
    chooseImage () {
      this.$utils.WeiXin.chooseImage(({ ids, base64 }) => {
        this.imageUrlUpload = ids[0]
        this.imageUrlUploadBase64 = base64
      })
    },
    uploadImage () {
      if (this.imageUrlUpload) {
        this.$utils.WeiXin.uploadImage(this.imageUrlUpload, 'wx_test', (path) => {
          this.imageUrlServer = path
        })
      } else {
        this.$vux.toast.show('请先选择图片')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  @import '~vux/src/styles/weui/widget/weui-uploader/index.less';
}
</style>
