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
    <div v-html="payFormHtml"></div>
  </div>
</template>

<script>
  import BLL from './index'
  import Draw from '../../assets/utils/draw'
  import { XButton } from 'vux'
  import { setTimeout } from 'timers'

  export default {
    data () {
      return {
        degree: 0,
        payFormHtml: ''
      }
    },
    components: {
      Draw,
      XButton
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
        const image = this.draw.getPNGImage()
        this.payFormHtml = await this.BLL.createProofStep3(image)

        if (this.proofInfo.serviceMoney === 0) {
          this.$router.replace('/paysucc')
        } else {
          if (this.payFormHtml) {
            setTimeout(function () {
              document.getElementById('pay_form').submit()
            }, 200)
          }
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
