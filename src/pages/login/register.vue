<template>
  <div class="container">
    <div class="clearfix"></div>
    <group label-width="4.4em" label-margin-right=".8em" title="请填写身份信息">
      <hide-input v-model="userPhone" title="手机号码" placeholder="请输入手机号码" type="phone" title-align="right"></hide-input>
      <hide-input v-model="userName" title="真实姓名" placeholder="请输入真实姓名" type="name" :showTopLine="false" title-align="right"></hide-input>
      <hide-input v-model="userIdCard" title="身份证号" placeholder="请输入身份证号" type="idCard" title-align="right"></hide-input>
    </group>
    <group label-width="4.4em" label-margin-right=".8em" title="请填写登录密码">
      <x-input title="登录密码" type="password" placeholder="请输入登录密码" v-model="userPwd"></x-input>
      <x-input title="再输一次" type="password" placeholder="请输入再输一次登录密码" v-model="userPwdAgain"></x-input>
      <x-input title="验证码" v-model="verificationCode" :max="6" class="verification-code" placeholder="请输入图形验证码" :show-clear="false">
        <img slot="right" :src="verificationCodeImg" @click="BLL.loadVerifyCodeImg()" />
      </x-input>
    </group>
    <div class="btn-div">
      <x-button type="comm" @click.native="next" :disabled="disabled">确认无误</x-button>
    </div>
    <div class="box-bottom">PRESENTED BY LI.R&D TEAM 2018-2020.</div>
  </div>
</template>

<script>
  import BLL from './index'
  import {
    XInput, Group, XButton, Cell
  } from 'vux'
  import hideInput from '../../components/iHideInput.vue'

  export default {
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      hideInput
    },
    data () {
      return {
        userName: '',
        userPhone: '',
        userIdCard: '',
        userPwd: '',
        userPwdAgain: '',
        showInput: false,
        verificationCode: '',
        verificationCodeImg: null,
        verificationCodeToken: ''
      }
    },
    created () {
      // 初始化
      this.BLL = new BLL(this)
      this.BLL.init()
      this.BLL.loadVerifyCodeImg()
    },
    computed: {
      errMsg () {
        if (!this.$utils.Validate.chkFormat(this.userPhone, 'phone')) {
          return '请输入正确的手机号'
        }
        if (!this.$utils.Validate.chkFormat(this.userName, 'chinaName')) {
          return '请输入正确的姓名'
        }
        if (!this.$utils.Validate.chkFormat(this.userIdCard, 'idcard')) {
          return '请输入正确的身份证号'
        }
        if (this.userPwd !== this.userPwdAgain) {
          return '两次密码输入不一致'
        }
        return null
      },
      disabled () {
        if (!this.userPhone || this.userPhone.length !== 11) {
          return true
        } else if (!this.userName || this.userName.length < 2) {
          return true
        } else if (!this.userIdCard || this.userIdCard.length !== 18) {
          return true
        } else if (!this.userPwd || this.userPwd.length < 1) {
          return true
        } else if (!this.userPwdAgain || this.userPwdAgain.length < 1) {
          return true
        } else if (!this.verificationCode || this.verificationCode.length < 1) {
          return true
        }
        return false
      }
    },
    methods: {
      next () {
        if (this.errMsg) {
          this.$vux.toast.show(this.errMsg)
          return
        }
        this.BLL.register({
          userName: this.userName,
          userPhone: this.userPhone,
          userRealName: this.userName,
          userIdCard: this.userIdCard,
          userPwd: this.userPwd,
          imgCode: this.verificationCode,
          imgCodeToken: this.verificationCodeToken
        })
      }
    },
    watch: {}
  }
</script>

<style lang="less" scoped>
  .container {
    background-color: #fff;
    height: 100%;
    .btn-div {
      padding: 35px 15px 0;
    }
    .box-bottom {
      z-index: 10;
      position: absolute;
      bottom: 10px;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #777;
    }
  }
</style>
