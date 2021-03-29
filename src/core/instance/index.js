import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// vue构造函数实现
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // vue初始化options
  this._init(options)
}

initMixin(Vue) // 混入init方法

// 实现多个的实例方法
stateMixin(Vue) // 定义$data和$props的引用，实现$set、$delete和$watch三个实例方法
eventsMixin(Vue) // $on $once $off $emit的实现
lifecycleMixin(Vue) // _update $forceUpdate $destroy方法的实现
renderMixin(Vue) // $nextTick _render方法的实现

export default Vue
