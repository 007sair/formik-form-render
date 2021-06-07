import * as React from 'react';
import Renderer, { NodeConfig } from 'formik-form-render';
import './demo.scss'; // demo style

export default () => {
  const initValues = {
    userName: '',
    passWord: '',
    more: '',
    gender: '',
  };

  const config: NodeConfig[] = [
    { type: 'text', name: 'userName', label: '用户名' },
    { type: 'text', name: 'passWord', label: '密码', props: { type: 'password' } },
    { type: 'switch', name: 'more', label: '显示更多' },
    {
      type: 'select',
      name: 'gender',
      label: '性别',
      props: {
        options: ['male', 'female'],
        placeholder: '请选择下拉项...',
      },
    },
    {
      type: 'radio',
      name: 'gender',
      label: '性别',
      props: {
        options: [
          { label: '男性', value: 'male' },
          { label: '女性', value: 'female' },
          { label: '其他', value: 'other' },
        ],
      },
    },
  ];

  const onSubmit = values => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Renderer
      values={initValues}
      config={config}
      onSubmit={onSubmit}
      render={({ form, formik }) => {
        return (
          <div className="demo-panel">
            <div className="form">
              {form}
              <div className="actions">
                <button type="submit" onClick={() => formik.handleSubmit()}>
                  提交
                </button>
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
