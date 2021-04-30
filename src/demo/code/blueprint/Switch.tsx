import React from 'react';
import { Switch as BPSwitch, Checkbox, SwitchProps, CheckboxProps } from '@blueprintjs/core';
import { withField } from 'formik-form-render';

export interface ISwitch {
  bp?: Omit<SwitchProps | CheckboxProps, 'onChange' | 'checked' | 'value'>;
  /** 使用 checkbox 组件 */
  useCheckbox?: boolean;
}

export const Switch = withField<ISwitch>(props => {
  const { field, form, bp, useCheckbox } = props;
  const Comp = useCheckbox ? Checkbox : BPSwitch;
  return (
    <Comp
      style={{ marginBottom: 0 }}
      inline
      {...bp}
      checked={field.value}
      onChange={() => form.setFieldValue(field.name, !field.value)}
    />
  );
});
