<template>
  <div class="container">
    <div class="clearfix"></div>
    <group title="单个接口">
      <cell title="调用单个接口" @click.native="BLL.test1({longtitude: 118.7569226148501, lantitude: 31.97793035793655})"
            is-link></cell>
      <cell title="业务失败处理" @click.native="BLL.test1({longtitude: -118.7569226148501, lantitude: 31.97793035793655})"
            is-link></cell>
      <cell title="接口异常处理"
            @click.native="BLL.test1({longtitude: 118.7569226148501, lantitude: 31.97793035793655},{options: {timeout: 1}})"
            is-link></cell>
      <cell title="设置成功条件" @click.native="BLL.test3({longtitude: 118.7569226148501, lantitude: 31.97793035793655})"
            is-link></cell>
      <cell title="自定义异常处理" @click.native="BLL.test4({longtitude: 118.7569226148501, lantitude: 31.97793035793655})"
            is-link></cell>
    </group>
    <group title="并发接口">
      <cell title="并发调用多个接口"
            @click.native="BLL.test5({longtitude: 118.7569226148501, lantitude: 31.97793035793655,udcid:'HTJPMHEci2KbKzIrkI7whA=='})"
            is-link></cell>
      <cell title="并发调用多个接口(业务失败)"
            @click.native="BLL.test5({longtitude: -118.7569226148501, lantitude: 31.97793035793655,udcid:'HTJPMHEci2KbKzIrkI7whA=='})"
            is-link></cell>
      <cell title="并发调用多个接口(接口异常)"
            @click.native="BLL.test5({longtitude: 118.7569226148501, lantitude: 31.97793035793655,udcid:'HTJPMHEci2KbKzIrkI7whA==222'})"
            is-link></cell>
    </group>
    <group title="连续接口">
      <cell title="连续调用多个接口"
            @click.native="BLL.test6({longtitude: 118.7569226148501, lantitude: 31.97793035793655,udcid:'HTJPMHEci2KbKzIrkI7whA=='})"
            is-link></cell>
      <cell title="连续调用多个接口(业务失败)"
            @click.native="BLL.test6({longtitude: -118.7569226148501, lantitude: 31.97793035793655,udcid:'HTJPMHEci2KbKzIrkI7whA=='})"
            is-link></cell>
      <cell title="连续调用多个接口(接口异常)"
            @click.native="BLL.test6({longtitude: 118.7569226148501, lantitude: 31.97793035793655,udcid:'HTJPMHEci2KbKzIrkI7whA==222'})"
            is-link></cell>
    </group>
    <group title="按钮加载状态">
      <div class="btn-div">
        <x-button type="comm" plain @click.native="BLL.test2(null)" :show-loading="btnLoading.state"
                  :text="btnLoading.str">
        </x-button>
        <x-button type="comm" plain @click.native="BLL.test2('test2')" :show-loading="btnLoading2.state"
                  :text="btnLoading2.str">
        </x-button>
      </div>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XButton } from 'vux'
import BLL from './index'

export default {
  components: {
    Group, Cell, XButton
  },
  data () {
    return {}
  },
  created () {
    // 初始化
    this.BLL = new BLL(this)
  },
  computed: {
    btnLoading () {
      if (this.$store.getters.btnLoading.str && !this.$store.getters.btnLoading.id) {
        return { state: true, str: this.$store.getters.btnLoading.str }
      }
      return { state: false, str: '下一步' }
    },
    btnLoading2 () {
      if (this.$store.getters.btnLoading.str && this.$store.getters.btnLoading.id === 'test2') {
        return { state: true, str: this.$store.getters.btnLoading.str + '222' }
      }
      return { state: false, str: '下一步' }
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@import "index";
</style>
