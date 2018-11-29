import api from '../../api/index'

export default class {
  constructor (vm) {
    this.vm = vm
    this.loadVerifyCodeImg()
  }

  async loadVerifyCodeImg () {
    let token = this.vm.$utils.Common.guid()
    let result = await api.getImageCode({ token })
    this.vm.verificationCodeToken = token
    this.vm.verificationCodeImg = result ? result.result.imgbase64 : ''
  }

  errMsg () {
    if (!this.vm.$utils.Validate.chkFormat(this.vm.phone, 'phone')) {
      return '请输入正确的手机号'
    }
    return null
  }

  disabled () {
    if (!this.vm.phone) {
      return '请输入手机号'
    } else if (this.vm.phone.length !== 11) {
      return '请完整输入11位手机号'
    } else if (!this.vm.pwd) {
      return '请输入密码'
    } else if (!this.vm.verificationCode) {
      return '请输入验证码'
    }
    return null
  }

  next () {
    if (this.disabled() || this.errMsg()) {
      this.vm.$vux.toast.show(this.disabled() || this.errMsg())
      return
    }
    this.vm.$emit('on-success', {
      phone: this.vm.phone,
      pwd: this.vm.pwd,
      verificationCodeToken: this.vm.verificationCodeToken,
      verificationCode: this.vm.verificationCode
    })
  }

  register () {
    this.vm.$emit('on-register')
  }
}
