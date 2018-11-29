import api from '../../../api/index'
import Base from '../../base/index'

export default class extends Base {
  async test1 ({ longtitude, lantitude }, op) {
    const res = await api.getLocationInfo({ longtitude, lantitude }, { ...op })
    if (res) {
      this.vm.$vux.toast.show({ text: res.Msg.result.formatted_address })
    }
  }

  async test2 (id) {
    const res = await api.getLocationInfo(
      { longtitude: 118.7569226148501, lantitude: 31.97793035793655 },
      { load: 'btn', loadMsg: '计算中', loadID: id })
    if (res) {
      this.vm.$vux.toast.show({ text: res.Msg.result.formatted_address })
    }
  }

  async test3 ({ longtitude, lantitude }) {
    const validator = res => res.State !== 'success'
    const res = await api.getLocationInfo({ longtitude, lantitude }, { validator, defFail: false })
    if (validator(res)) {
      this.vm.$vux.toast.show({ text: res.Msg.result.formatted_address })
    } else {
      this.vm.$vux.toast.show({ text: '出错啦！！！' })
    }
  }

  async test4 ({ longtitude, lantitude }) {
    try {
      const res = await api.getLocationInfo404({ longtitude, lantitude }, { defEx: false })
      if (res) {
        this.vm.$vux.toast.show({ text: res.Msg.result.formatted_address })
      }
    } catch (error) {
      this.vm.$vux.alert.show({ content: '自定义异常处理' })
    }
  }

  async test5 ({ longtitude, lantitude, udcid }, op) {
    this.vm.$vux.loading.show('加载中...')
    const res = await this.vm.$api.xHttp.all([
      api.getLocationInfo({ longtitude, lantitude }, { load: false, ...op }),
      api.loanCredit(udcid, { load: false, ...op })
    ])
    this.vm.$vux.loading.hide()
    if (res.every(x => x)) {
      this.vm.$vux.alert.show({
        content: res.reduce((acc, cur) => acc + JSON.stringify(cur) + '<br><br>', '')
      })
    }
  }

  async test6 ({ longtitude, lantitude, udcid }, op) {
    this.vm.$vux.loading.show('加载中...')
    // 调用接口1
    const res1 = await api.getLocationInfo({ longtitude, lantitude }, { load: false, ...op })
    if (res1) {
      // 调用接口2
      const res2 = await api.loanCredit(udcid, { load: false, ...op })
      this.vm.$vux.loading.hide()
      if (res2) {
        this.vm.$vux.alert.show({ content: `res1:${JSON.stringify(res1)}<br><br>res2:${JSON.stringify(res2)}` })
      }
    } else {
      this.vm.$vux.loading.hide()
    }
  }

  // 根据经纬度计算位置
  async getLocationInfo (addressList, longtitude, lantitude) {
    const res = await api.getLocationInfo({ longtitude, lantitude })
    if (res) {
      let province = res.Msg.result.addressComponent.province
      let city = res.Msg.result.addressComponent.city
      let district = res.Msg.result.addressComponent.district
      province = addressList.find(item => {
        return item.name === province ? item : false
      })
      city = addressList.find(item => {
        return item.name === city ? item : false
      })
      district = addressList.find(item => {
        return item.name === district ? item : false
      })
      if (province && city && district) {
        this.vm.address = res.Msg.result.addressComponent.street
        this.vm.addressValue = [province.value, city.value, district.value]
      }
    }
  }
}
