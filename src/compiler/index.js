/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
// 高阶函数，baseCompile为编译的核心方法，createCompilerCreator为扩展方法
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 解析：解析模板，将模板转换成AST（类似于Vnode对象，用来描述dom树）
  const ast = parse(template.trim(), options)
  // 优化：标记静态节点
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  // 生成：将AST生成render函数字符串
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
