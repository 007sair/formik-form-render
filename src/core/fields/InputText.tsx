import React from 'react';
import { withField } from '../withField';

export interface InputProps {
  /** 这是一个测试类型，如果看到这个，说明类型推导成功 */
  testTypeScript?: boolean;
}

const Input = withField<InputProps & React.InputHTMLAttributes<any>>(props => {
  const { field, meta, form, ...attr } = props;
  return (
    <>
      <input type="text" {...field} {...attr} />
      {meta.error && meta.touched ? <div className="field-error">{meta.error}</div> : null}
    </>
  );
});

export default Input;
