/* @flow */

import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'

// 工厂函数，传入web默认选项
const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }
