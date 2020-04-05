/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(type => {
    // 声明vue的components、filter、directive
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }

        // 如果是组件配置对象
        if (type === 'component' && isPlainObject(definition)) {
          // 声明组件的组件名
          definition.name = definition.name || id
          // 调用Vue.extend()将组件配置对象 转换成 组件构造函数
          definition = this.options._base.extend(definition)
        }

        // 指令处理
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 将声明的组件/指令/过滤器 添加到全局选项上
        // 这样当每个组件初始化时，会合并全局选项，在组件中就会添加已声明的全局组件/指令/过滤器
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
