import api from '../../api/index'; // eslint-disable-line
import Base from '../base/index'

export default class extends Base {
  // constructor (vm) {
  //   super(vm)
  // }
  async init () {
    // 保存初始路径
    const fullPath = this.vm.$route.fullPath
    // 获取udcid,usermob,userkey
    const udcid = this.vm.$utils.Common.getParam('udcid')
    const usermob = this.vm.$utils.Common.getParam('usermob')
    const userkey = this.vm.$utils.Common.getParam('userkey')
    // if (!udcid) {
    //   this.vm.$vux.alert.show({content: '非法链接'})
    //   return
    // }
    // 首页清除缓存
    // this.vm.$utils.LocalStorage.clear()
    this.vm.$store.commit('service_init')
    this.vm.$store.commit('AUTH_INIT')
    this.vm.$store.commit('init_param_data', {
      userkey,
      usermob,
      udcid,
      fullPath
    })
    const path = this.vm.$route.params.path || 'login'
    this.vm.$router.replace(`/${path}`)
  }
}
