/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
// baseModules 核心的节点属性操作方法
// platformModules web平台特有的节点属性操作方法
const modules = platformModules.concat(baseModules)

// 工厂函数，将节点操作方法 和 节点属性操作方法传入
// nodeOps：节点操作方法集合
// modules：节点属性操作
export const patch: Function = createPatchFunction({ nodeOps, modules })
