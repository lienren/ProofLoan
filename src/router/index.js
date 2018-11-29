import Vue from 'vue'
import Router from 'vue-router'
import config from '../../config/index'
// 生产/测试环境，使用路由懒加载
const view =
  process.env.NODE_ENV === 'development'
    ? file => require(`@/pages/${file}.vue`).default
    : file => () => System.import(`@/pages/${file}.vue`).then(m => m.default)
if (process.env.NODE_ENV === 'development') {
  Vue.use(Router)
}
// meta 特殊标记
// 通用
//  title：网页title
// 埋点用
//  name：页面名称，modeName：流程名，noRouterLog：不记录路由卖点（404使用）
export const defaultTitle = '诚友信凭证管理平台'
export const router = new Router({
  mode: 'history', // 后端支持可开
  base: config.build.assetsPublicPath,
  routes: [
    { path: '*', component: view('404/index'), name: '404', meta: { noRouterLog: true } },
    { path: '/', component: view('index/index'), meta: { name: '/index' } },
    // { path: '/go/:path', component: view('index/index'), meta: { name: '/index' } },
    { path: '/login', component: view('login/index') },
    { path: '/register', component: view('login/register') },
    { path: '/homepage', component: view('login/homepage') },
    { path: '/cpstep1', component: view('login/cpstep1') },
    { path: '/cpstep2', component: view('login/cpstep2') },
    { path: '/cpstep3', component: view('login/cpstep3') },
    { path: '/cpstep4', component: view('login/cpstep4') },
    { path: '/detail', component: view('login/detail') },
    { path: '/paysucc', component: view('login/paysucc') }
    // { path: '/input', component: view('demos/Input') }
    /* { path: '/home', component: view('demos/Home') },
    { path: '/demo/button', component: view('demos/Button'), meta: { title: '按钮' } },
    { path: '/dialog', component: view('demos/Dialog') },
    { path: '/utils', component: view('demos/Utils') },
    { path: '/load', component: view('demos/PulldownPullup') },
    { path: '/http', component: view('demos/business/index') },
    { path: '/camera', component: view('demos/camera/index') },
    { path: '/input', component: view('demos/Input') },
    { path: '/wx', component: view('demos/Wexin') },
    { path: '/infiniteLoading', component: view('demos/InfiniteLoading') },
    { path: '/flexible', component: view('demos/flexible/index/index') },
    { path: '/sku', component: view('demos/sku/index') },
    { path: '/login', component: view('demos/Login') } */
  ]
})
