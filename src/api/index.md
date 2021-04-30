---
title: Renderer
nav:
  title: API
toc: menu
order: 0
---

该库的入口组件，接收`config`、`values`、`onSubmit`等 [props](#api)属性。

## 使用方法

调用方式有两种：

**方式 1：**

```tsx | pure
import Renderer from 'formik-form-render';

export default () => {
  // 直接调用，组件返回的就是表单内容
  return <Renderer {...props} />;
};
```

**方式 2：**

```tsx | pure
import Renderer from 'formik-form-render';

export default () => {
  return (
    <Renderer
      {...props}
      render={props => {
        // props.form: 表单内容，是一个 ReactNode，可以被放置在任意位置
        // props.formik: 表单内部状态，可以做其他操作，如：获取校验状态、预览表单数据等
        return <>{props.form}</>;
      }}
    />
  );
};
```

<API src="../core/Renderer.tsx" desc="> `Renderer`组件" ></API>

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
