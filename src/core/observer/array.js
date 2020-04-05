/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
// 修改7个原型方法后的Array原型
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  // 数组原始的原型方法
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    // 先执行数组方法原本的逻辑
    const result = original.apply(this, args)

    // 变更通知
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 以防添加了新的对象或数组，对新添加的值进行observe
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 通知更新
    ob.dep.notify()
    return result
  })
})
