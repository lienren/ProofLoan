<template>
  <div class="container">
    <card class="card-box">
      <div slot="header" class="card-demo-header vux-1px-b">
        <div class="card-demo-header-img">
          <img src="../../assets/images/headimg.png" />
        </div>
        <div class="card-demo-header-name">
          <div>{{authInfo.userRealName}}</div>
          <div style="font-size:12px;">{{authInfo.userPhone?authInfo.userPhone.substring(0, 3):''}}****{{authInfo.userPhone?authInfo.userPhone.substring(7):''}}</div>
        </div>
        <div class="card-demo-header-funs">
          <span @click="exit">安全退出</span>
        </div>
      </div>
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>{{repayMoney}}</span>
          <br/>待收总额（元）
        </div>
        <div class="vux-1px-r">
          <span>{{loanMoney}}</span>
          <br/>待还总额（元）
        </div>
      </div>
    </card>
    <tab :line-width=2 v-model="tabSelectIndex">
      <tab-item class="vux-center" :selected="tabSelect === item" v-for="(item, index) in tabList" @click="tabSelect = item" :key="index">{{item}}</tab-item>
    </tab>
    <swiper v-model="tabSelectIndex" direction="horizontal" :height="`${contentHeight}px`" :show-dots="false">
      <swiper-item :key="0">
        <scroller lock-x scrollbar-y use-pulldown enable-horizontal-swiping @on-pulldown-loading="loadUserLoan" ref="scrollerPendLoan" :height="`${contentHeight}px`" :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新'}">
          <div class="box1">
            <div>
              <group>
                <cell v-for="(item, index) in pendLoans" :key="index" :title="pendLoanTitle(item)" :value="pendLoanValue(item)" :inline-desc="pendLoanDesc(item)" :link="pendLoanLink(item)" is-link></cell>
              </group>
            </div>
          </div>
        </scroller>
      </swiper-item>
      <swiper-item :key="1">
        <scroller lock-x scrollbar-y use-pulldown enable-horizontal-swiping @on-pulldown-loading="loadUserLoan" ref="scrollerValidLoan" :height="`${contentHeight}px`" :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新'}">
          <div class="box2">
            <div>
              <group>
                <cell v-for="(item, index) in validLoans" :key="index" :title="pendLoanTitle(item)" :value="pendLoanValue(item)" :inline-desc="pendLoanDesc(item)" :link="pendLoanLink(item)" is-link></cell>
              </group>
            </div>
          </div>
        </scroller>
      </swiper-item>
    </swiper>

    <div class="btn-div">
      <x-button type="comm" @click.native="createProof">创建凭证</x-button>
    </div>
  </div>
</template>

<script>
  import BLL from './index'
  import { Divider, Card, Tab, TabItem, Swiper, SwiperItem, XButton, Group, Cell, Scroller } from 'vux'

  export default {
    components: {
      Divider,
      Card,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      XButton,
      Group,
      Cell,
      Scroller
    },
    data () {
      return {
        tabList: ['待确认', '已生效'],
        tabSelect: '',
        tabSelectIndex: 0,
        pendLoans: [],
        validLoans: [],
        loanMoney: 0,
        repayMoney: 0
      }
    },
    created () {
      // 初始化
      this.BLL = new BLL(this)
      this.BLL.init()
      this.loadUserLoan()
    },
    computed: {
      contentHeight () {
        return this.$utils.Common.getWidthHeight().height - 44 - 149 - 67
      },
      authInfo () {
        return this.$store.state.auth.authInfo
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.scrollerPendLoan.reset()
        this.$refs.scrollerValidLoan.reset()
      })
    },
    methods: {
      createProof () {
        this.$router.push('/cpstep1')
      },
      async loadUserLoan () {
        await this.BLL.getUserLoanList()
        if (this.$refs.scrollerPendLoan) {
          this.$refs.scrollerPendLoan.donePulldown()
          this.$refs.scrollerValidLoan.donePulldown()
        }
      },
      pendLoanTitle (item) {
        if (item.loanUserId > 0) {
          return `【${item.loanUserRealName}】借款${parseFloat(item.loanMoney / 100)}元`
        } else {
          return `【借款人】借款${parseFloat(item.loanMoney / 100)}元`
        }
      },
      pendLoanValue (item) {
        if (item.userId === this.authInfo.userId && item.state === 2) {
          return `待对方确认`
        } else {
          return `${item.stateName}`
        }
      },
      pendLoanDesc (item) {
        return `${item.loanUseName}借款 ${this.$utils.Date.format(item.repayTime / 1000, 'yyyy年MM月dd日')}还款`
      },
      pendLoanLink (item) {
        return { path: '/detail', query: { loanId: item.id } }
      },
      exit () {
        this.BLL.exit()
      }
    },
    watch: {}
  }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  .container {
    background-color: #fff;
    height: 100%;
  }
  .card-box {
    background-color: #409eff;
    color: #fff;

    .vux-1px-b:after {
      border-bottom-color: #99ccff;
    }

    .vux-1px-r:after {
      border-right-color: #99ccff;
    }
  }
  .card-demo-header {
    display: flex;
    padding: 40px 30px;
    .card-demo-header-img {
      background-color: #fff;
      width: 100px;
      border-radius: 100px;
      padding: 2px;
      margin-right: 20px;
      img {
        width: 100px;
      }
    }
    .card-demo-header-funs {
      flex: 1;
      text-align: right;
    }
  }
  .card-demo-flex {
    display: flex;
  }
  .card-demo-content01 {
    padding: 10px 0;
  }
  .card-padding {
    padding: 15px;
  }
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 24px;
  }
  .card-demo-flex span {
    color: #fff;
    font-size: 36px;
  }
</style>
