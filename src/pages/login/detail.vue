<template>
  <div v-if="isShow" class="container">
    <div class="clearfix span"></div>
    <group label-width="5em" title="借款人信息">
      <cell title="手机号码" :value="proofInfo.loanUserPhone"></cell>
      <cell v-if="proofInfo.loanUserRealName.length>0" title="姓名" :value="proofInfo.loanUserRealName"></cell>
      <cell v-if="proofInfo.loanUserSign.length>0" title="签名">
        <div slot>
          <img style="width:20%;" :src="proofInfo.loanUserSign" />
        </div>
      </cell>
    </group>
    <div class="clearfix span"></div>
    <group label-width="5em" title="出借人信息">
      <cell title="手机号码" :value="proofInfo.masterUserPhone"></cell>
      <cell v-if="proofInfo.masterUserRealName.length>0" title="姓名" :value="proofInfo.masterUserRealName"></cell>
      <cell v-if="proofInfo.masterUserSign.length>0" title="签名">
        <div slot>
          <img style="width:20%;" :src="proofInfo.masterUserSign" />
        </div>
      </cell>
    </group>
    <div class="clearfix span"></div>
    <group title="借款信息">
      <cell title="借款时间" :value="timespanToDateTime(proofInfo.loanTime)"></cell>
      <cell title="还款时间" :value="timespanToDateTime(proofInfo.repayTime)"></cell>
      <cell title="借款金额" :value="`${proofInfo.loanMoney/100}元`"></cell>
      <cell title="年化利率" :value="`${proofInfo.rate/100}%`"></cell>
      <cell title="借款用途" :value="proofInfo.loanUseName"></cell>
    </group>
    <div class="clearfix span"></div>
    <group>
      <cell title="状态" :value="getState(proofInfo)"></cell>
      <cell title="备注" :value="proofInfo.remark"></cell>
      <cell title="服务费">
        <div slot>
          <div>{{proofInfo.serviceMoney/100}}元</div>
          <div>
            <span v-if="proofInfo.isPay===1" style="font-size:12px;color:#67C23A;">已支付</span>
            <span v-if="proofInfo.isPay!==1" style="font-size:12px;color:#F56C6C;">未支付</span>
          </div>
        </div>
      </cell>
      <cell title="添加时间" :value="timespanToDateTime(proofInfo.addTime, 'yyyy-MM-dd hh:mm:ss')"></cell>
    </group>
    <div class="btn-div">
      <x-button v-if="proofInfo.state===1&&proofInfo.isPay!==1" type="comm" @click.native="isShowPayMent=true">立即支付</x-button>
      <x-button v-if="proofInfo.state===2&&proofInfo.confirmUserId===authInfo.userId" type="comm" @click.native="goToStep4">确认无误</x-button>
      <x-button v-if="proofInfo.state===3&&proofInfo.masterUserId===authInfo.userId" type="comm" @click.native="sendState">确认已还款</x-button>
    </div>
    <div v-transfer-dom>
      <popup v-model="isShowPayMent" position="bottom" max-height="60%">
        <div style="text-align:center;font-size:14px;">请支付平台服务费：
          <span style="font-size:20px;color:#F56C6C;font-weight:400;">{{proofInfo.serviceMoney/100}}</span>元</div>
        <group title="请选择支付方式">
          <radio :options="payMentTypeList" @on-change="sendPay"></radio>
        </group>
        <div style="height:15px;"></div>
      </popup>
    </div>
  </div>
</template>

<script>
  import BLL from './index'
  import {
    XInput, Group, XButton, Cell, DatetimeView, Popup, TransferDom, PopupPicker, Radio
  } from 'vux'
  import hideInput from '../../components/iHideInput.vue'

  export default {
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      hideInput,
      DatetimeView,
      Popup,
      PopupPicker,
      Radio
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        isShow: false,
        proofInfo: {},
        isShowPayMent: false,
        payMentTypeList: [
          { key: 'alipaywap', value: '支付宝' },
          { key: 'ICBC', value: '中国工商银行' },
          { key: 'ABC', value: '中国农业银行' },
          { key: 'BOCSH', value: '中国银行' },
          { key: 'CCB', value: '建设银行' },
          { key: 'CMB', value: '招商银行' },
          { key: 'SPDB', value: '浦发银行' },
          { key: 'GDB', value: '广发银行' },
          { key: 'BOCOM', value: '交通银行' },
          { key: 'PSBC', value: '邮政储蓄银行' },
          { key: 'CNCB', value: '中信银行' },
          { key: 'CMBC', value: '民生银行' },
          { key: 'CEB', value: '光大银行' },
          { key: 'HXB', value: '华夏银行' },
          { key: 'CIB', value: '兴业银行' },
          { key: 'BOS', value: '上海银行' },
          { key: 'SRCB', value: '上海农商' },
          { key: 'PAB', value: '平安银行' },
          { key: 'BCCB', value: '北京银行' }
        ]
      }
    },
    created () {
      // 初始化
      this.BLL = new BLL(this)
      this.BLL.init()
      this.getProof()
    },
    computed: {
      loanId () {
        let query = this.$route.query || {}
        return parseInt(query.loanId || 0)
      },
      authInfo () {
        return this.$store.state.auth.authInfo
      }
    },
    methods: {
      getState (item) {
        if (item.userId === this.authInfo.userId && item.state === 2) {
          return `待对方确认`
        } else {
          return `${item.stateName}`
        }
      },
      async getProof () {
        this.proofInfo = await this.BLL.getProof(this.loanId)
        this.isShow = true
      },
      timespanToDateTime (timespan, ft = 'yyyy-MM-dd') {
        return this.$utils.Date.format(parseInt(timespan / 1000), ft)
      },
      async sendPay (value, label) {
        this.isShowPayMent = false

        this.$router.replace({
          path: '/paying',
          query: { loanId: this.loanId, payMentType: value }
        })
      },
      goToStep4 () {
        this.$router.push({
          path: '/cpstep4',
          query: { loanId: this.loanId }
        })
      },
      async sendState () {
        await this.BLL.setLoanState(this.loanId, 4)
        this.getProof()
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
      padding: 35px 15px 35px;
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
