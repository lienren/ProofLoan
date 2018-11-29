<template>
  <div id="upload-img-component">
    <input type="file" style="display: none" accept="image/*" ref="upload" @change="uploadImg" :multiple="number>1"
           :capture="capture" v-if="type==='image'">
    <input type="file" style="display: none" accept="video/*" ref="upload" @change="uploadVideo($event,videoSize)"
           capture="camcorder" v-else-if="type==='video'">
  </div>
</template>

<script>
import ImageCompressor from '@xkeshi/image-compressor'

export default {
  name: 'i-upload',
  props: {
    // 类型：image、video
    type: {
      type: String,
      default: 'image'
    },
    // 图片最大张数
    number: {
      type: Number,
      default: 1
    },
    capture: {
      type: String,
      default: null
    },
    // 可上传视频最大大小（单位：m）
    videoSize: {
      type: Number,
      default: 0
    },
    fileinfo: String,
    onSuccess: {
      type: Function,
      default: null
    }
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {
    // 上传图片点击事件
    openUploadPop () {
      // 防止选取同一个文件时不触发onchange事件
      this.$refs.upload.value = ''
      this.$refs.upload.click()
    },
    // 上传视频
    async uploadVideo (e, max = 0) {
      window.$globalHub.$vux.loading.show('上传中...')
      let formData = new FormData()
      if (this.fileinfo) {
        formData.append('fileinfo', this.fileinfo)
      }
      const file = e.target.files[0]
      if (max) {
        if (!/video\/\w+/.test(file.type)) {
          window.$globalHub.$vux.loading.hide()
          window.$globalHub.$vux.toast.show(`请上传视频文件`)
          return
        } else if (file.size / 1024 > max * 1000) {
          // 视频大小判断
          window.$globalHub.$vux.loading.hide()
          window.$globalHub.$vux.toast.show(`视频不能超过${max}M`)
          return
        }
      }
      formData.append('file', file, file.name)
      const URL = window.URL || window.webkitURL
      const fileURL = URL.createObjectURL(file)
      this.onSuccess({ formData, fileURL })
    },
    // 上传图片
    async uploadImg (e) {
      // 最大上传数量检测
      if (e.target.files.length > this.number) {
        window.$globalHub.$vux.toast.show({ text: `最多支持上传${this.number}张图片哦` })
        return
      }
      window.$globalHub.$vux.loading.show('上传中...')
      let formData = new FormData()
      let images = []
      let loadAllImg = true
      if (this.fileinfo) {
        formData.append('fileinfo', this.fileinfo)
      }
      const files = Array.from(e.target.files)
      const imageCompressor = new ImageCompressor()
      await Promise.all(
        files.map(async (file) => {
          if (!/image\/\w+/.test(file.type)) {
            window.$globalHub.$vux.toast.show({ text: `只能上传图片哦` })
            loadAllImg = false
            return false
          }
          const f = await imageCompressor.compress(file, { quality: 0.6, maxWidth: 1000 })
          // console.log('f1:', f.size)
          // console.log('f2:', file.size)
          if (f) {
            formData.append('file', f.size < file.size ? f : file, file.name)
            images.push(window.URL.createObjectURL(file))
          } else {
            loadAllImg = false
            return false
          }
        })
      )
      if (loadAllImg) {
        this.onSuccess({ images, formData })
      } else {
        window.$globalHub.$vux.loading.hide()
      }
    }
  }
}
</script>

