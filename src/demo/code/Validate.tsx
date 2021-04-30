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
    {
      type: 'text',
      name: 'userName',
      label: '用户名',
      validate: val => (val && val.length ? undefined : '用户名不能为空！'),
      props: { placeholder: '用户名不能为空哦~' },
    },
    {
      type: 'text',
      name: 'passWord',
      label: '密码',
      props: { type: 'password', placeholder: '密码不能少于6位数哦~' },
      validate: val => {
        if (!val) return '密码不能为空！';
        return val.length >= 6 ? undefined : '密码不能小于6位数！';
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
      formikProps={{ validateOnBlur: true }}
      prefixcls="jdv"
      render={({ form, formik }) => {
        return (
          <div className="demo-panel">
            <div className="form">
              {form}
              <div className="actions">
                <button type="submit" disabled={!formik.dirty || !formik.isValid} onClick={() => formik.handleSubmit()}>
                  提交
                </button>
              </div>
            </div>
            <div className="code">
              <pre>{JSON.stringify(formik, null, 2)}</pre>
            </div>
          </div>
        );
      }}
    />
  );
};
