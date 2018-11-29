<template>
  <div class="container">
    <div class="btn-selects">
      <div class="btn-select m1" @click="next(1)">
        <div>
          <img src="../../assets/images/loanuser.png" />
        </div>
        <span>我是借款人</span>
      </div>
      <div class="btn-select m2" @click="next(2)">
        <div>
          <img src="../../assets/images/masteruser.png" />
        </div>
        <span>我是出借人</span>
      </div>
      <div class="btn-back" @click="back">
        <span>返回首页</span>
      </div>
    </div>
  </div>
</template>

<script>
  import BLL from './index'

  export default {
    components: {},
    data () {
      return {}
    },
    created () {
      // 初始化
      this.BLL = new BLL(this)
      this.BLL.init()
    },
    computed: {},
    methods: {
      next (loadType) {
        this.$router.push({
          path: '/cpstep2',
          query: { loadType: loadType }
        })
      },
      back () {
        this.$router.replace('/homepage')
      }
    },
    watch: {}
  }
</script>

<style lang="less" scoped>
  .container {
    background-color: #fff;
    height: 100%;

    .btn-selects {
      width: 300px;
      margin: 0 auto;
      padding-top: 200px;
    }

    .btn-select {
      width: 200px;
      padding: 50px;
      border-radius: 5px;
      color: #fff;
      text-align: center;
      font-weight: 400;
      margin-bottom: 100px;
      img {
        width: 100px;
        margin-bottom: 20px;
      }
    }

    .btn-back {
      text-align: center;
    }

    .m1 {
      background-color: #409eff;
    }

    .m2 {
      background-color: #e6a23c;
    }
  }
</style>
