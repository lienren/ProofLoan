<template>
  <div class="container">
    <msg :title="title" :description="description" :buttons="buttons" :icon="icon"></msg>
  </div>
</template>
<script>
  import { Msg, Divider, XButton } from 'vux'

  export default {
    components: {
      Msg, XButton, Divider
    },
    data () {
      return {
        title: '支付成功',
        description: '恭喜您已支付成功，请联系对方尽快确认，谢谢！',
        icon: 'success',
        buttons: [{
          type: 'primary',
          text: '返回首页',
          onClick: () => {
            this.$router.replace('/homepage')
          }
        }]
      }
    },
    created () { },
    mounted () { },
    computed: {},
    methods: {}
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
