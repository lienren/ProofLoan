<template>
  <div class="container">
    <div class="box">
      <divider>默认</divider>
      <i-login @on-success="onSuccess"></i-login>
      <br>
      <divider>弹出框</divider>
      <x-button type="comm" @click.native="show=true">弹出登录框</x-button>
      <x-button type="comm" @click.native="show2=true">自定义样式</x-button>
    </div>
    <div v-transfer-dom>
      <i-login v-model="show" @on-success="onSuccess" :dialog="true"></i-login>
      <i-login v-model="show2" @on-success="onSuccess" :dialog="true" btnClass="ye" bgColor="#fef6e4"></i-login>
    </div>
  </div>
</template>

<script>
import { XButton, Divider, TransferDomDirective as TransferDom } from 'vux'
import iLogin from '../../components/iLogin/Index.vue'

export default {
  directives: {
    TransferDom
  },
  components: {
    iLogin, XButton, Divider
  },
  data () {
    return {
      show: false,
      show2: false
    }
  },
  computed: {},
  methods: {
    onSuccess (obj) {
      this.$store.commit('UPDATE_BTNLOADINGSTR', { str: '登录中...' })
      setTimeout(() => {
        this.$store.commit('UPDATE_BTNLOADINGSTR', null)
        this.$vux.toast.show({ text: obj.phone + '<br>' + obj.verificationCode })
      }, 1000)
    }
  }
}
</script>

<style lang="less">
@import "../../assets/styles/Global/btn.less";

@btn-name: ye;
@button-color: #9a7250;
@button-bg-color: linear-gradient(0deg, #fbd04c, #ffdf7d);
@button-active-color: #9a7250;
@button-active-bg-color: linear-gradient(0deg, #fbd04c, #ffdf7d);
</style>

<style lang="less" scoped>
.container {
  .box {
    padding: 15px;
  }
}
</style>
