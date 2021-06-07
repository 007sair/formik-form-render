---
title: Renderer
nav:
  title: API
toc: menu
order: 0
---

表单渲染组件，接收`config`、`values`、`onSubmit`等 [RendererProps](#api-rendererprops) 属性。

## 使用方法

调用方式有如下两种：

```tsx | pure
import Renderer from 'formik-form-render';

// 方式1：直接调用，组件返回的就是表单内容
export default () => {
  return <Renderer {...someProps} />;
};

// 方式2：`render props` 用法
export default () => {
  /**
   * 使用 `render` 函数，该函数提供的参数包含两个属性：form 和 formik：
   * - form 可以将表单内容更灵活的插入到任何地方
   * - formik 可以获取表单的内部状态
   */
  return <Renderer {...someProps} render={props => <>{props.form}</>} />;
};
```

## API

<API src="./tsx/index.tsx" exports='["RendererProps"]' desc="> `Renderer`组件中的`props`" ></API>

<API src="./tsx/index.tsx" exports='["RendererRenderParam"]' desc="> `Renderer`组件中的`render函数`" ></API>

## TypeScript

`Renderer`组件也是个泛型组件<Badge>TS v2.9+支持</Badge>：

```tsx | pure
import Renderer, { NodeConfig } from 'formik-form-render';

// 自定义组件映射
const customMapping = {
  text: ...,
  dateTime: ...
}

const config: NodeConfig<typeof customMapping>[] = [];

export default () => {
  return <Renderer {...props} config={config} />
}
```

效果等同于：

```tsx | pure
export default () => {
  // 当 config
  return <Renderer<typeof customMapping> config={[]} />;
};
```
