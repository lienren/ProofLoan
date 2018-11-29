<template>
  <div class="login-dialog" :style="bgStyle">
    <div class="head">诚友信凭证管理平台</div>
    <div class="sub-head">CYL. Voucher Management Platform</div>
    <group class="input">
      <x-input v-model="phone" :max="11" keyboard="number" type="tel" placeholder="请输入您的手机号" :show-clear="false"
               :style="bgStyle">
      </x-input>
    </group>
    <group class="input">
      <x-input v-model="pwd" type="password" placeholder="请输入您的密码" :show-clear="false" :style="bgStyle">
      </x-input>
    </group>
    <group class="input">
      <x-input v-model="verificationCode" :max="6" class="verification-code" placeholder="请输入图形验证码" :show-clear="false" :style="bgStyle">
        <img slot="right" :src="verificationCodeImg" @click="BLL.loadVerifyCodeImg()" />
      </x-input>
    </group>
    <div class="btn">
      <x-button :type="btnClass" @click.native="BLL.next()" :text="loading.str" :show-loading="loading.state"></x-button>
      <div @click="BLL.register()" class="btn-register">立即注册</div>
    </div>
  </div>
</template>

<script>
import BLL from './Index'
import { XInput, Group, XButton } from 'vux'

export default {
  name: 'login-item',
  components: {
    XInput, Group, XButton
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    loginStr: {
      type: String,
      default: '登录'
    },
    hideClear: {
      type: Boolean,
      default: true
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    btnClass: {
      type: String,
      default: 'comm'
    }
  },
  data () {
    return {
      phone: null,
      pwd: null,
      verificationCode: null,
      verificationCodeImg: null,
      verificationCodeToken: null
    }
  },
  computed: {
    loading () {
      if (this.$store.getters.btnLoading.str && !this.$store.getters.btnLoading.id) {
        return { state: true, str: this.$store.getters.btnLoading.str }
      }
      return { state: false, str: this.loginStr }
    },
    sendBtnLoading () {
      if (this.$store.getters.btnLoading.str && this.$store.getters.btnLoading.id === 'sendBtn') {
        return { state: true }
      }
      return { state: false }
    },
    bgStyle () {
      return {
        backgroundColor: this.bgColor
      }
    }
  },
  created () {
    // 初始化
    this.BLL = new BLL(this)
  },
  beforeDestroy () {
    this.clear()
  },
  mounted () {},
  methods: {
    clear () {
      this.phone = null
      this.pwd = null
      this.verificationCode = null
    }
  }
}
</script>

<style lang="less" scoped>
@import './Index';
</style>
