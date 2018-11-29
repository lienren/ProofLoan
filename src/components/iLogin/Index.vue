<template>
  <div>
    <x-dialog v-model="showLogin" :scroll="false" :hide-on-blur="true" v-if="dialog">
      <login-item :loginStr="loginStr" :hideClear="hideClear" :bgColor="bgColor" :btnClass="btnClass"
                  @on-success="onSuccess" @on-register="onRegister" ref="it1"></login-item>
      <span class="vux-close" @click="showLogin=false"></span>
    </x-dialog>
    <login-item :loginStr="loginStr" :hideClear="hideClear" :bgColor="bgColor" :btnClass="btnClass"
                @on-success="onSuccess" @on-register="onRegister" v-else></login-item>
  </div>
</template>

<script>
import { XDialog } from 'vux'
import loginItem from './loginItem.vue'

export default {
  name: 'login',
  components: {
    XDialog, loginItem
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    },
    loginStr: {
      type: String,
      default: '登录'
    },
    hideClear: {
      type: Boolean,
      default: true
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    btnClass: {
      type: String,
      default: 'comm'
    }
  },
  data () {
    return {
      showLogin: false
    }
  },
  computed: {},
  created () {
    if (this.value) {
      this.showLogin = true
    }
  },
  beforeDestroy () { },
  mounted () { },
  methods: {
    onSuccess (obj) {
      this.$emit('on-success', obj)
      setTimeout(() => {
        this.showLogin = false
      }, 200)
    },
    onRegister () {
      this.$emit('on-register')
    }
  },
  watch: {
    value (val) {
      this.showLogin = val
    },
    showLogin (val) {
      if (!val && this.hideClear) {
        this.$refs.it1.clear()
      }
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
