# formik-form-render

📖 基于 formik，易配置、易扩展、灵活的 React 表单生成器

[DEMO](https://007sair.github.io/formik-form-render/demo)

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

## Changes

**`0.3.3`**

移除了`NodeCustomProps`类型中的`defaultValues`，自定义组件的 props 中不再接受`defaultValues`，详细信息见 [array](https://github.com/007sair/formik-form-render/blob/main/src/core/fields/Array.tsx)
