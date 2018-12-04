import api from '../../api/index'; // eslint-disable-line
import Base from '../base/index'

const loanUseNameDist = {
  日常消费: 1,
  医疗: 2,
  旅游: 3,
  装修: 4,
  教育: 5
}

export default class extends Base {
  // constructor (vm) {
  //   super(vm)
  // }
  async init () {}

  async loadVerifyCodeImg () {
    let token = this.vm.$utils.Common.guid()
    let result = await api.getImageCode({ token })
    this.vm.verificationCodeToken = token
    this.vm.verificationCodeImg = result ? result.result.imgbase64 : ''
  }

  async login (param) {
    let result = await api.login({ ...param })
    this.vm.$store.commit('UPDATE_BTNLOADINGSTR', null)

    if (result.code === '000000' && result.result) {
      this.vm.$store.commit('SET_AUTH', result.result)
      this.vm.$router.replace(`/homepage`)
    }
  }

  async register (param) {
    let result = await api.register({ ...param })
    if (result.code === '000000') {
      this.vm.$router.replace(`/login`)
    }
  }

  async getUserLoanList (param) {
    let result = await api.getUserLoanList()

    if (result && result.result) {
      this.vm.pendLoans = result.result.pendLoans
      this.vm.validLoans = result.result.validLoans

      let loanMoney = 0
      let repayMoney = 0
      let authInfo = this.vm.$store.state.auth.authInfo
      result.result.validLoans.forEach(loan => {
        if (loan.state === 3) {
          if (loan.loanUserId === authInfo.userId) {
            loanMoney += loan.loanMoney
          }
          if (loan.masterUserId === authInfo.userId) {
            repayMoney += loan.loanMoney
          }
        }
      })

      this.vm.loanMoney = loanMoney / 100
      this.vm.repayMoney = repayMoney / 100
    }
  }

  async calculationServiceMoney (loanMoney) {
    let result = await api.calculationServiceMoney({
      loanMoney: loanMoney * 100
    })

    if (result.result && result.result.serviceMoney) {
      return parseInt(result.result.serviceMoney / 100)
    } else {
      return 0
    }
  }

  async getProof (loanId) {
    let result = await api.getUserLoan({
      loanId: loanId
    })
    return result && result.result
  }

  async createProofStep2 (param) {
    param.loanMoney = parseFloat(param.loanMoney) * 100
    param.serviceMoney = parseFloat(param.serviceMoney) * 100
    this.vm.$store.commit('SET_PROOF', param)

    let result = await api.checkPhoneIsRegister({
      phone: param.userPhone
    })

    if (result.result && result.result.state === 1) {
      this.vm.$router.push({
        path: '/cpstep3'
      })
    } else {
      let _this = this
      this.vm.$vux.confirm.show({
        title: '提示',
        content: '该手机号还未注册，是否继续？',
        confirmText: '继续',
        cancelText: '再想想',
        onShow () {},
        onHide () {},
        onCancel () {},
        onConfirm () {
          _this.vm.$router.push({
            path: '/cpstep3'
          })
        }
      })
    }
  }

  async createProofStep3 (userSign) {
    let proof = this.vm.$store.state.auth.proof
    let loanTime = this.vm.$utils.Date.getDate(proof.loanTime).getTime()
    let repayTime = this.vm.$utils.Date.getDate(proof.repayTime).getTime()

    let result = await api.setUserLoan({
      loanType: proof.loanType,
      phone: proof.userPhone,
      loanMoney: proof.loanMoney,
      loanTime: loanTime,
      repayTime: repayTime,
      rate: parseInt(proof.rate[0].replace(/%/g, '')) * 100,
      loanUse: loanUseNameDist[proof.loanUse[0]],
      remark: proof.remark,
      userSign: userSign
    })

    if (result && result.code === '000000' && result.result && result.result.id) {
      return result.result.id
    } else {
      return 0
    }
  }

  async createProofStep4 (loanId, userSign) {
    let result = await api.setConfirmLoan({
      loanId: loanId,
      userSign: userSign
    })

    if (result && result.code === '000000') {
      this.vm.$router.replace(`/homepage`)
    }
  }

  async setLoanState (loanId, loanState) {
    await api.setLoanState({
      loanId: loanId,
      loanState: loanState
    })
  }

  async getLoanByPay (loanId, payMentType) {
    let resultPay = await api.getLoanByPay({
      loanId: loanId,
      payMentType: payMentType
    })
    return resultPay
  }

  exit () {
    this.vm.$store.commit('AUTH_INIT')
    this.vm.$router.replace(`/login`)
  }
}
