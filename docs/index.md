---
title: formik-form-render - 易配置、易扩展的表单生成器
order: 10
hero:
  title: formik-form-render
  desc: 📖 基于 formik，易配置、易扩展、灵活的 React 表单生成器
  actions:
    - text: 快速上手
      link: /api
    - text: DEMO示例
      link: /demo
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: 易配置
    desc: 简单的组件、API定义，尽量简化、复用、整合API，使用很少的代码就能描述表单信息
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: 易扩展
    desc: 该库将关注点放在配置转表单、TS类型上。除少数内置组件外，不提供任何样式。可随意扩展自定义组件与样式。
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/b8570f4d-c1b1-45eb-a1da-abff53159967/kj9t990h_w144_h144.png
    title: 类型支持
    desc: 完全使用TypeScript编写，通过对配置项的类型推导，轻轻松松实现配置可读、智能提示。
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/b3e102cd-5dad-4046-a02a-be33241d1cc7/kj9t8oji_w144_h144.png
    title: 交互联动
    desc: 通过调用内置函数，可实现配置项之间的动态更新、数据联动，用最少的配置，写最多的业务逻辑。
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/3863e74a-7870-4874-b1e1-00a8cdf47684/kj9t7ww3_w144_h144.png
    title: 异构
    desc: 内部对表单字段进行特殊处理，轻松实现数据 vs UI 的异构、状态提升。
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/f093e060-726e-471c-a53e-e988ed3f560c/kj9t9sk7_w144_h144.png
    title: 数据驱动
    desc: 当配置了一份很全的配置，仅需要使用其中部分数据（如：Echarts）时，可以指定按照数据的结构渲染。配置一次，多处使用。
footer: Open-source MIT Licensed | Copyright © 2019-present<br />Powered by LongChan
---

## 安装

```bash
$ npm i formik-form-render
# or
$ yarn add formik-form-render
```

## 使用

```tsx | pure
import Renderer from 'formik-form-render';

export default () => {
  return (
    <Renderer
      values={{ userName: '', passWord: '' }}
      config={[
        { type: 'text', name: 'userName', label: '用户名' },
        { type: 'text', name: 'passWord', label: '密码', props: { type: 'password' } },
      ]}
      onSubmit={values => {
        alert(JSON.stringify(values, null, 2));
      }}
    />
  );
};
```
