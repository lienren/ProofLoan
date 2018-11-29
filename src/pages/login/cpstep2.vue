<template>
  <div class="container">
    <div v-if="loadType===1" class="clearfix span"></div>
    <group v-if="loadType===1" title="出借人信息">
      <hide-input v-model="userPhone" title="手机号码" placeholder="请输入出借人手机号码" type="phone" text-align="right"></hide-input>
    </group>
    <div v-if="loadType===2" class="clearfix span"></div>
    <group v-if="loadType===2" title="借款人信息">
      <hide-input v-model="userPhone" title="手机号码" placeholder="请输入借款人手机号码" type="phone" text-align="right"></hide-input>
    </group>
    <div class="clearfix span"></div>
    <group title="借款信息">
      <cell title="借款时间" :value="loanTime" @click.native="loanTimePopupShow=true"></cell>
      <cell title="还款时间" :value="repayTime" @click.native="repayTimePopupShow=true"></cell>
      <x-input title="借款金额" v-model="loanMoney" placeholder="请输入借款金额" keyboard="number" type="tel" text-align="right" @on-blur="calculationServiceMoney"></x-input>
      <popup-picker title="年化利率" :data="rateList" v-model="rate" placeholder="请选择年化利率"></popup-picker>
      <popup-picker title="借款用途" :data="loanUseList" v-model="loanUse" placeholder="请选择借款用途"></popup-picker>
    </group>
    <div class="clearfix span"></div>
    <group>
      <x-input title="备注" v-model="remark" placeholder="（选填）请输入备注" text-align="right"></x-input>
      <cell title="服务费">
        <div>
          <span style="color: #ff0000;">{{serviceMoney}}元</span>
        </div>
      </cell>
    </group>
    <div class="btn-div">
      <x-button type="comm" @click.native="next" :disabled="disabled">下一步</x-button>
    </div>
    <div v-transfer-dom>
      <popup v-model="loanTimePopupShow">
        <datetime-view v-model="loanTime"></datetime-view>
      </popup>
      <popup v-model="repayTimePopupShow">
        <datetime-view v-model="repayTime"></datetime-view>
      </popup>
    </div>
  </div>
</template>

<script>
  import BLL from './index'
  import {
    XInput, Group, XButton, Cell, DatetimeView, Popup, TransferDom, PopupPicker
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
      PopupPicker
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        userPhone: '',
        loanTime: '请选择借款时间',
        loanTimePopupShow: false,
        repayTime: '请选择还款时间',
        repayTimePopupShow: false,
        loanMoney: '',
        rate: [],
        loanUseList: [['日常消费', '医疗', '旅游', '装修', '教育']],
        loanUse: [],
        remark: '',
        serviceMoney: 0
      }
    },
    created () {
      // 初始化
      this.BLL = new BLL(this)
      this.BLL.init()
    },
    computed: {
      loadType () {
        let query = this.$route.query || {}
        return parseInt(query.loadType || 1)
      },
      rateList () {
        let list = [[]]
        for (let i = 0, j = 25; i < j; i++) {
          list[0].push(`${i}%`)
        }
        return list
      },
      errMsg () {
        if (!this.$utils.Validate.chkFormat(this.userPhone, 'phone')) {
          return '请输入正确的手机号'
        }
        if (this.loanTime === '请选择借款时间') {
          return '请选择借款时间'
        }
        if (this.repayTime === '请选择还款时间') {
          return '请选择还款时间'
        }
        if (this.loanMoney === '' || parseInt(this.loanMoney) < 1) {
          return '请填写借款金额'
        }
        if (this.rate.length === 0) {
          return '请选择年化利率'
        }
        if (this.loanUse.length === 0) {
          return '请选择借款用途'
        }
        return null
      },
      disabled () {
        return false
      }
    },
    methods: {
      next () {
        if (this.errMsg) {
          this.$vux.toast.show(this.errMsg)
          return
        }
        this.BLL.createProofStep2({
          loadType: this.loadType,
          userPhone: this.userPhone,
          loanTime: this.loanTime,
          repayTime: this.repayTime,
          loanMoney: this.loanMoney,
          rate: this.rate,
          loanUse: this.loanUse,
          remark: this.remark,
          serviceMoney: this.serviceMoney
        })
      },
      async calculationServiceMoney () {
        this.serviceMoney = await this.BLL.calculationServiceMoney(this.loanMoney)
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
