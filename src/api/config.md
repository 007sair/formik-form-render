---
title: config配置
nav:
  title: API
toc: menu
order: 1
---

`Renderer`组件的`config`属性，用于描述表单的结构，每个节点对应一个对象，`config`可以是`单个节点` 或 `节点数组`。

## 使用方法

````tsx | pure
import Renderer, { NodeConfig } from 'formik-form-render';

/**
 * Renderer组件的`config`属性。
 * - 使用typescript时，类型为: NodeConfig | NodeConfig[]
 * - 使用自定义组件，还需要传入自定义组件的类型，使用方法：
 * ```tsx
 * const mapping = {}
 * const config: NodeConfig<typeof mapping> = {};
 * ```
 */
const config: NodeConfig = {
  type: 'text',
  name: 'firstName',
  label: 'FirstName',
};

export default () => {
  return <Renderer {...props} config={config} />;
};
````

## API

<API src="./tsx/index.tsx" exports='["NodeConfig"]' desc="> `config`中每个节点的属性如下：" ></API>

<API src="./tsx/index.tsx" exports='["NodeFuncParam"]' desc="> `config`节点上的key为函数时的参数api，如`label`、`props`等属性。具体可参考类型声明。" ></API>
