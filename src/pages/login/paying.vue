<template>
  <div class="container">
    <msg :title="title" :description="description" :buttons="buttons" :icon="icon"></msg>
    <div v-html="payFormHtml"></div>
  </div>
</template>
<script>
  import BLL from './index'
  import { Msg, Divider, XButton } from 'vux'

  export default {
    components: {
      Msg, XButton, Divider
    },
    data () {
      return {
        title: '正在支付',
        description: '如果您已支付成功，请返回首页等待系统确认',
        icon: 'waiting',
        buttons: [{
          type: 'primary',
          text: '返回首页',
          onClick: () => {
            this.$router.replace('/homepage')
          }
        }],
        payFormHtml: ''
      }
    },
    created () {
      // 初始化
      this.BLL = new BLL(this)
      this.BLL.init()
    },
    mounted () {
      this.$nextTick(() => {
        this.sendPay()
      })
    },
    computed: {
      loanId () {
        let query = this.$route.query || {}
        return parseInt(query.loanId || 0)
      },
      payMentType () {
        let query = this.$route.query || {}
        return parseInt(query.payMentType || 0)
      }
    },
    methods: {
      async sendPay () {
        let result = await this.BLL.getLoanByPay(this.loanId, this.payMentType)
        this.payFormHtml = result.result.payFormHtml

        if (this.payFormHtml) {
          setTimeout(function () {
            document.getElementById('pay_form').submit()
          }, 100)
        }
      }
    }
  }
</script>
<style lang="less">
  @import '../../assets/styles/Global/btn.less';
</style>

<style lang="less" scoped>
  .container {
    background-color: #fff;
    height: 100%;
  }
</style>
