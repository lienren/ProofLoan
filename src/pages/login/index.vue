<template>
  <div class="container">
    <vue-particles class="bg-particles" color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>
    <div class="box">
      <i-login @on-success="onSuccess" @on-register="onRegister"></i-login>
    </div>
    <div class="box-bottom">PRESENTED BY LI.R&D TEAM 2018-2020.</div>
  </div>
</template>
<script>
  import BLL from './index'
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
    methods: {
      onSuccess (obj) {
        this.$store.commit('UPDATE_BTNLOADINGSTR', { str: '登录中...' })
        this.BLL.login({
          userPhone: obj.phone,
          userPwd: obj.pwd,
          imgCode: obj.verificationCode,
          imgCodeToken: obj.verificationCodeToken
        })
      },
      onRegister () {
        this.$router.push(`/register`)
      }
    }
  }
</script>
<style lang="less">
  @import '../../assets/styles/Global/btn.less';

  @btn-name: ye;
  @button-color: #9a7250;
  @button-bg-color: linear-gradient(0deg, #fbd04c, #ffdf7d);
  @button-active-color: #9a7250;
  @button-active-bg-color: linear-gradient(0deg, #fbd04c, #ffdf7d);
</style>

<style lang="less" scoped>
  .container {
    display: flex;
    background-color: #409eff;
    height: 100%;
    .box {
      z-index: 10;
      margin: 10vh auto;
    }
    .box-bottom {
      z-index: 10;
      position: absolute;
      bottom: 10px;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
  }
  .bg-particles {
    z-index: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
