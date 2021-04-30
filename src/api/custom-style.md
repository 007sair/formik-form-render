---
title: 自定义样式
nav:
  title: API
toc: menu
order: 2
---

在`Renderer`组件的 props 中，提供了`prefixcls`这个属性，它的默认值为`ffr`(formik-form-render 的简写)。

通过传入这个前缀，可以实现对样式的完全掌控，不必担心样式污染，库本身不产生、不引入任何样式。

在使用自定义样式之前，可以先看看配置是如何被转换成 dom 节点的。

## 结构描述

查看`config`配置项的类型，会发现，它要么是个对象，要么是数组。

在该库内部，会对传入的 config 进行分析，如果是数组，会在最外层包裹一个`type="fragment"`的空节点。

config 中每个节点对应着一个对象，用来描述一行表单信息，这一行表单可以包含或不包含 label。结构如下：

```tsx | pure
<div class="ffr-field ffr-field_fragment sair">
  <div class="ffr-field-label"></div>
  <div class="ffr-field-component"></div>
</div>
```

以上 3 个 div，就是一个节点对象的简单描述。

- `ffr`：prefixcls 属性，后面默认使用 `-field` 进行拼接，表示一个节点字段；
- `_frament`：表示当前节点是一个`type="fragment"`的节点
- `sair`，config 配置中的 className
- `ffr-field-label`，当 config 中没有 label 时，该 div 不会渲染。
- `ffr-field-component`，真实组件的包裹 div，子节点对应着 config 中的 children 字段内的配置。

## 完整结构

或查看 [自定义样式 DEMO](/demo/custom-style)，该 DEMO 使用了`SCSS`编写样式

```tsx | pure
const config: NodeConfig[] = [
  { type: 'text', name: 'userName', label: '用户名' },
  { type: 'text', name: 'passWord', label: '密码', props: { type: 'password' } },
  { type: 'switch', name: 'more', label: '显示更多' },
  {
    type: 'select',
    name: 'gender',
    label: '性别',
    props: {
      options: [
        { label: '男性', value: 'male' },
        { label: '女性', value: 'female' },
        { label: '其他', value: 'other' },
      ],
      placeholder: '请选择下拉项...',
    },
  },
];

// ====================
// 对应 dom
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// config 是个数组，初始化时使用 fragment 包裹，初始的 fragment 没有设置label，所以下面没有 ffr-field-label
<div class="ffr-field ffr-field_fragment">
  // ⚠️ 这里没有 ffr-field-label
  <div class="ffr-field-component">
    <div class="ffr-field ffr-field_text">
      <div class="ffr-field-label">用户名</div>
      <div class="ffr-field-component">
        <input type="text" name="userName" />
      </div>
    </div>
    <div class="ffr-field ffr-field_text"></div>
    <div class="ffr-field ffr-field_switch"></div>
    <div class="ffr-field ffr-field_select"></div>
  </div>
</div>;
```
