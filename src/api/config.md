---
title: config配置
nav:
  title: API
toc: menu
order: 1
---

`Renderer`组件的`config`属性，用于描述表单的结构，每个节点对应一个对象，`config`可以是`单个节点` 或 `节点数组`。

## 使用方法

```tsx | pure
import Renderer from 'formik-form-render';

export default () => {
  return (
    <Renderer
      values={{ firstName: '' }}
      config={[
        {
          type: 'text', // 使用 `text` 类型对应的组件，如库自带的是 input 组件
          name: 'firstName', // 数据中存在一个 firstName 的字段
          label: 'FirstName', // 表单左侧的文本，即 label 标签
        },
      ]}
      onSubmit={values => {
        alert(values);
      }}
    />
  );
};
```

## API

<API src="./tsx/index.tsx" exports='["NodeConfig"]' desc="> `config`中每个节点的属性如下：" ></API>

<API src="./tsx/index.tsx" exports='["NodeFuncParam"]' desc="> `config`节点上的key为函数时的参数api，如`label`、`props`等属性。具体可参考类型声明。" ></API>
