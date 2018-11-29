import Vue from 'vue'

export default {
  getImageCode (body, op = {}) {
    return Vue.$api.xHttp.post(`/base/getimagecode`, body, op)
  },
  login (body, op = {}) {
    return Vue.$api.xHttp.post(`/proof/login`, body, op)
  },
  register (body, op = {}) {
    return Vue.$api.xHttp.post(`/proof/register`, body, op)
  },
  getUserLoanList (body, op = {}) {
    return Vue.$api.xHttp.post(`/proof/getUserLoanList`, body, op)
  },
  getUserLoan (body, op = {}) {
    return Vue.$api.xHttp.post(`/proof/getUserLoan`, body, op)
  },
  checkPhoneIsRegister (body, op = {}) {
    return Vue.$api.xHttp.post(`/proof/checkPhoneIsRegister`, body, op)
  },
  calculationServiceMoney (body, op = {}) {
    return Vue.$api.xHttp.post(`/proof/calculationServiceMoney`, body, op)
  },
  setUserLoan (body, op = {}) {
    return Vue.$api.xHttp.post(`/proof/setUserLoan`, body, op)
  },
  getLoanByPay (body, op = {}) {
    return Vue.$api.xHttp.post(`/proof/getLoanByPay`, body, op)
  },
  setConfirmLoan (body, op = {}) {
    return Vue.$api.xHttp.post(`/proof/setConfirmLoan`, body, op)
  },
  setLoanState (body, op = {}) {
    return Vue.$api.xHttp.post(`/proof/setLoanState`, body, op)
  }
}
