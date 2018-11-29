<template>
  <div>
  </div>
</template>
<script>
import BLL from './index'

export default {
  data () {
    return {}
  },
  created () {
    // 初始化
    this.BLL = new BLL(this)
    this.BLL.init()
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.BLL.weixinInit()
    // })
  },
  computed: {},
  watch: {}
}
</script>
