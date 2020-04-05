/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 如果已经注册过的，不再继续注册
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // args：调用use传入的第1个参数后面的参数
    const args = toArray(arguments, 1)
    // 将Vue添加到参数数组的第一个
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
