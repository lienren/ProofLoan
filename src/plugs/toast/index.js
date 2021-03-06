import ToastComponent from '../../components/iToast.vue'

let $vm
let watcher
export default {
  install (vue, options) {
    let interval = false
    const Toast = vue.extend(ToastComponent)
    if (!$vm) {
      $vm = new Toast({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    const toast = {
      show (options) {
        if (!interval) {
          interval = true
          // destroy watcher
          watcher && watcher()
          if (typeof options === 'string') {
            $vm.text = options
          } else if (typeof options === 'object') {
            for (let i in options) {
              $vm[i] = options[i]
            }
          }
          if ((typeof options === 'object' && options.onShow) || options.onHide) {
            watcher = $vm.$watch('show', val => {
              val && options.onShow && options.onShow($vm)
              val === false && options.onHide && options.onHide($vm)
            })
          }
          $vm.show = true
          setTimeout(() => {
            interval = false
          }, 2000)
        }
      },
      hide () {
        $vm.show = false
      }
    }
    // all Vux's plugins are included in this.$vux
    if (!vue.$vux) {
      vue.$vux = {
        toast
      }
    } else {
      vue.$vux.toast = toast
    }
    vue.mixin({
      created: function () {
        this.$vux = vue.$vux
      }
    })
  }
}
