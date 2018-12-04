<template>
  <div id="canvasBox" :style="getHorizontalStyle">
    <div class="greet">
      请您在灰色位置签名
    </div>
    <canvas id="canvasContext"></canvas>
    <div class="greet" style="color:#409EFF;font-weight:400;">
      签名要求正楷，请保持书写清晰、工整
    </div>
    <div class="btn-div">
      <x-button type="comm" @click.native="next">确认无误</x-button>
      <x-button plain type="comm" @click.native="clear">清除签名</x-button>
    </div>
    <div v-transfer-dom>
      <popup v-model="isShowPayMent" position="bottom" max-height="50%">
        <group title="请选择支付方式">
          <radio :options="payMentTypeList" @on-change="sendPay"></radio>
        </group>
        <div style="height:15px;"></div>
      </popup>
    </div>
    <div v-html="payFormHtml"></div>
  </div>
</template>

<script>
  import BLL from './index'
  import Draw from '../../assets/utils/draw'
  import { XButton, Group, Popup, TransferDom, Radio } from 'vux'
  import { setTimeout } from 'timers'

  export default {
    components: {
      Draw,
      XButton,
      Group,
      Popup,
      Radio
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        degree: 0,
        loanId: 0,
        isShowPayMent: false,
        payMentTypeList: [
          { key: '1006', value: '支付宝' },
          { key: '1007', value: '微信' },
          { key: '963', value: '中国银行' },
          { key: '964', value: '农业银行' },
          { key: '965', value: '建设银行' },
          { key: '967', value: '工商银行' },
          { key: '981', value: '交通银行' },
          { key: '970', value: '招商银行' },
          { key: '971', value: '邮政储蓄' },
          { key: '962', value: '中信银行' },
          { key: '972', value: '兴业银行' },
          { key: '978', value: '平安银行' },
          { key: '980', value: '民生银行' },
          { key: '986', value: '光大银行' },
          { key: '982', value: '华夏银行' },
          { key: '979', value: '南京银行' },
          { key: '975', value: '上海银行' },
          { key: '989', value: '北京银行' },
          { key: '983', value: '杭州银行' },
          { key: '968', value: '浙商银行' },
          { key: '974', value: '深圳发展银行' },
          { key: '977', value: '浦东发展银行' },
          { key: '985', value: '广东发展银行' },
          { key: '987', value: '东亚银行' },
          { key: '988', value: '渤海银行' }
        ],
        payFormHtml: ''
      }
    },
    mounted () {
      this.canvasBox = document.getElementById('canvasBox')
      this.initCanvas()
    },
    created () {
      // 初始化
      this.BLL = new BLL(this)
      this.BLL.init()
    },
    computed: {
      getHorizontalStyle () {
        const d = document
        const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth
        const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight
        let length = (h - w) / 2
        let width = w
        let height = h

        switch (this.degree) {
          case -90:
            length = -length
            break
          case 90:
            width = h
            height = w
            break
          default:
            length = 0
            break
        }
        if (this.canvasBox) {
          this.canvasBox.removeChild(document.querySelector('canvas'))
          this.canvasBox.appendChild(document.createElement('canvas'))
          setTimeout(() => {
            this.initCanvas()
          }, 200)
        }
        return {
          transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
          width: `${width}px`,
          height: `${height}px`,
          transformOrigin: 'center center'
        }
      },
      proofInfo () {
        return this.$store.state.auth.proof
      }
    },
    methods: {
      initCanvas () {
        const canvas = document.querySelector('canvas')
        this.draw = new Draw(canvas, -this.degree)
      },
      clear () {
        this.draw.clear()
      },
      async next () {
        if (this.loanId === 0) {
          const image = this.draw.getPNGImage()
          this.loanId = await this.BLL.createProofStep3(image)
        }

        if (this.loanId > 0) {
          if (this.proofInfo.serviceMoney === 0) {
            this.$router.replace('/paysucc')
          } else {
            this.isShowPayMent = true
          }
        }
      },
      async sendPay (value, label) {
        this.isShowPayMent = false
        let result = await this.BLL.getLoanByPay(this.loanId, parseInt(value))
        this.payFormHtml = result.result.payFormHtml
        if (this.payFormHtml) {
          setTimeout(function () {
            document.getElementById('pay_form').submit()
          }, 200)
        }
      }
    }
  }
</script>

<style lang="less">
  .container {
    background-color: #fff;
  }
  #canvasBox {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fff;
    .greet {
      padding: 20px;
      font-size: 28px;
      text-align: center;
      user-select: none;
    }
    .btn-div {
      padding: 35px 15px 0;
    }
  }
  #canvasContext {
    width: 100%;
    height: 300px;
    background-color: #ccc;
    cursor: crosshair;
  }
</style>
