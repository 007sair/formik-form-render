import * as React from 'react';
import { Button } from '@blueprintjs/core'; // 三方组件库
import '@blueprintjs/core/lib/css/blueprint.css'; // 三方组件库样式
import './demo.scss'; // demo style
import Renderer, { NodeConfig } from 'formik-form-render';
import * as fields from './blueprint/index'; // 自定义三方组件
import './custom.scss'; // 自定义样式

/**
 * 自定义组件映射对象
 * key => config配置中的type字段
 * value => 对应一个自定义组件。
 */
const mapping = {
  text: fields.InputText,
  textarea: fields.Textarea,
  switch: fields.Switch,
  number: fields.InputNumber,
  collapse: fields.Collapse,
  select: fields.Select,
};

// config配置项的类型，泛型部分传入自定义组件映射对象的类型
type CustomConfig = NodeConfig<typeof mapping>[];

export default () => {
  const initValues = {
    name: '',
    age: '',
    married: '',
    gender: '',
    info: {
      email: '',
      address: '',
    },
  };

  const config: CustomConfig = [
    { type: 'text', name: 'name', label: '姓名', props: { bp: { leftIcon: 'user' } } },
    { type: 'number', name: 'age', label: '年龄' },
    {
      type: 'select',
      name: 'gender',
      label: '性别',
      props: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
          { label: '其他', value: 'other' },
        ],
      },
    },
    { type: 'switch', name: 'married', label: '已婚' },
    {
      type: 'collapse',
      name: 'info',
      props: { label: '更多信息' },
      children: [
        { type: 'text', name: 'email', label: '邮箱' },
        { type: 'textarea', name: 'address', label: '地址' },
      ],
    },
  ];

  const onSubmit = values => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Renderer
      values={initValues}
      mapping={mapping}
      config={config}
      onSubmit={onSubmit}
      prefixcls="jdv"
      render={({ form, formik }) => {
        return (
          <div className="demo-panel">
            <div className="form">
              {form}
              <div className="actions">
                <Button intent="primary" onClick={() => formik.handleSubmit()}>
                  提 交
                </Button>
              </div>
            </div>
            <div className="code">
              <pre>{JSON.stringify(formik.values, null, 2)}</pre>
            </div>
          </div>
        );
      }}
    />
  );
};
