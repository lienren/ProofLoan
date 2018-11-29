import Vue from 'vue'
import axios from 'axios'
import wait from './delay'
// 多种类型接口处理(根据各自项目进行修改)
const DEF = [
  {
    validator: res => res.code === '000000',
    fail_handling: res => Vue.$vux.alert.show({ content: res.message || '传输异常，请稍后再试' })
  },
  {
    validator: res => res.code === '000000',
    fail_handling: res => Vue.$vux.alert.show({ content: res.message || '传输异常，请稍后再试' })
  }
]
// 默认接口延迟300毫秒
const DEF_DELAY = 300

// 根据项目实际情况修改
function requestUrl (url) {
  // 测试/生成环境
  if (process.env.NODE_ENV !== 'development') {
    if (url.startsWith('/sameOriginApi')) {
      // 同域名下还原请求地址
      url = url.replace('/sameOriginApi', '')
    } else if (!url.startsWith('http')) {
      // 测试环境
      if (process.env.NODE_ENV === 'testing') {
        // 测试环境，访问test接口
        if (url.startsWith('/appApi')) {
          url = url.replace('v2', 'test')
        } else if (url.startsWith('/pocApi')) {
          url = url.replace('/pocApi', '/pocTestApi')
        }
      }
      // node接口
      if (url.startsWith('/nodeApi')) {
        url = url.replace('/nodeApi', '')
      }
      url = '/' + url.substring(1)
    }
  } else {
    // 开发环境
    if (url.startsWith('/pocApi')) {
      url = url.replace('/pocApi', '/pocTestApi')
    } else if (url.startsWith('/appApi')) {
      url = url.replace('v2', 'test')
    } else if (url.startsWith('/nodeApi')) {
      // node接口
      url = url.replace('/nodeApi', '/test_nodeApi')
    }
  }
  return url
}

function send (url, method, body, options, load, loadMsg, loadID, validator, delay, defFail, defEx, apiType, tokenCrashHandling) {
  const opts = { ...options }
  // 生成请求url
  url = requestUrl(url)
  if (load) {
    if (load === 'btn') {
      window.$globalHub.$store.commit('UPDATE_BTNLOADINGSTR', { str: loadMsg, id: loadID })
    } else {
      Vue.$vux.loading.show(loadMsg)
    }
  }
  opts.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...opts.headers
  }
  // get、delete接口参数params化
  if ((method === 'get' || method === 'delete') && body) {
    opts.params = body
  }
  // poc接口增加Authentication
  opts.headers.Authentication = window.$globalHub.$store.state.auth.authInfo.token || ''
  return axios({ method, url, data: body, ...opts }).then(async res => {
    const obj = res.data
    // 避免loading动画一闪而过，增加0.3秒延迟
    let time = load ? delay : 0
    if (delay > DEF_DELAY) {
      time = delay
    }
    await wait(time)
    if (load) {
      window.$globalHub.$store.commit('UPDATE_BTNLOADINGSTR', null)
      Vue.$vux.loading.hide()
    }
    // 验证接口结果
    if (validator(obj)) {
      return obj
    } else {
      // 验证失败，关闭loading
      if (!load) {
        window.$globalHub.$store.commit('UPDATE_BTNLOADINGSTR', null)
        Vue.$vux.loading.hide()
      }
      if (defFail) {
        // 通用业务失败处理
        DEF[apiType].fail_handling(obj)
      } else {
        // 返回前台处理
        return obj
      }
    }
  }).catch(error => {
    let errorMsg = ''
    try {
      if (error.response) {
        errorMsg = JSON.stringify(error.response)
      } else if (error.request) {
        errorMsg = JSON.stringify(error.request)
      } else {
        errorMsg = JSON.stringify(error.message)
      }
    } catch (e) {
    }
    window.$globalHub.$store.commit('UPDATE_BTNLOADINGSTR', null)
    Vue.$vux.loading.hide()
    // token失效特殊处理
    if (tokenCrashHandling && error.response && error.response.status === 401) {
      Vue.$vux.alert.show({
        content: '您的帐号已失效请重新下单',
        onHide () {
          // 返回进入的历史首页
          window.$globalHub.$router.replace(window.$globalHub.$store.getters.fullPath)
          // window.$globalHub.$router.replace('/')
        }
      })
      return null
    } else {
      // 接口异常处理
      if (defEx) {
        // 通用异常处理
        Vue.$vux.alert.show({ content: '传输异常，请稍后再试' })
      } else {
        // 返回前台处理
        return Promise.reject(new Error(errorMsg))
      }
    }
  })
}

export default {
  /**
   * 调用Get接口
   * @param url 接口地址
   * @param body 接口参数
   * @param options axios的options设置（参考https://github.com/mzabriskie/axios）
   * @param load  是否展示loading (true：默认，展示全屏loading框，false：不展示，btn：展示按钮loading)
   * @param loadMsg loading展示文字
   * @param loadID loading按钮标识（用以多个loadingBtn的情况，默认为null）
   * @param validator 业务成功逻辑判断
   * @param delay 接口延迟时间，默认300
   * @param defFail 是否使用默认业务失败处理
   * @param defEx 是否使用默认接口失败处理
   * @param apiType 接口类别 0：app接口 1：poc接口
   * @param tokenCrashHandling token失效处理（默认true）
   */
  get (url, body,
       {
         options = null, load = true, loadMsg = '加载中...', loadID = null, validator = null,
         delay = DEF_DELAY, defFail = true, defEx = true, apiType = 0, tokenCrashHandling = true
       } = {}) {
    if (!validator) {
      validator = DEF[apiType].validator
    }
    return send(url, 'get', body, options, load, loadMsg, loadID, validator, delay, defFail, defEx, apiType, tokenCrashHandling)
  },
  /**
   * 调用Post接口
   * @param url 接口地址
   * @param body 接口参数
   * @param options axios的options设置（参考https://github.com/mzabriskie/axios）
   * @param load  是否展示loading (true：默认，展示全屏loading框，false：不展示，btn：展示按钮loading)
   * @param loadMsg loading展示文字
   * @param loadID loading按钮标识（用以多个loadingBtn的情况，默认为null）
   * @param validator 业务成功逻辑判断
   * @param delay 接口延迟时间，默认300
   * @param defFail 是否使用默认业务失败处理
   * @param defEx 是否使用默认接口失败处理
   * @param apiType 接口类别 0：app接口 1：poc接口
   * @param tokenCrashHandling token失效处理（默认true）
   */
  post (url, body,
        {
          options = null, load = true, loadMsg = '加载中...', loadID = null, validator = null,
          delay = DEF_DELAY, defFail = true, defEx = true, apiType = 0, tokenCrashHandling = true
        } = {}) {
    if (!validator) {
      validator = DEF[apiType].validator
    }
    return send(url, 'post', body, options, load, loadMsg, loadID, validator, delay, defFail, defEx, apiType, tokenCrashHandling)
  },
  delete (url, body,
          {
            options = null, load = true, loadMsg = '加载中...', loadID = null, validator = null,
            delay = DEF_DELAY, defFail = true, defEx = true, apiType = 0, tokenCrashHandling = true
          } = {}) {
    if (!validator) {
      validator = DEF[apiType].validator
    }
    return send(url, 'delete', body, options, load, loadMsg, loadID, validator, delay, defFail, defEx, apiType, tokenCrashHandling)
  },
  put (url, body,
       {
         options = null, load = true, loadMsg = '加载中...', loadID = null, validator = null,
         delay = DEF_DELAY, defFail = true, defEx = true, apiType = 0, tokenCrashHandling = true
       } = {}) {
    if (!validator) {
      validator = DEF[apiType].validator
    }
    return send(url, 'put', body, options, load, loadMsg, loadID, validator, delay, defFail, defEx, apiType, tokenCrashHandling)
  },
  all (list) {
    return axios.all(list).then(axios.spread((...args) => { return args }))
  }
}
