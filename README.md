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

## 特性

- [x] 表单联动
- [x] 三方模板
- [x] 校验
- [x] 表单异构
- [x] 状态提升
- [x] 动态内容
- [x] 自定义组件
- [x] 自动提交
- [x] 自定义样式
