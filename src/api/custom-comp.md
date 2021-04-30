---
title: 自定义组件
nav:
  title: API
toc: menu
order: 2
---

`formik-form-render`的宗旨是通过配置化的方式生成表单内容，将关注点从编写组件、表单逻辑的操作抽象到库中。写一次配置可在任何地方复用。

本着尽量减少该库代码量的原则，目前只提供了基础的几个 type 的组件。业务中需要使用自定义组件时，可以参考如下方法创建：

### 创建一个 Switch 组件

```tsx | pure
import React from 'react';

// 1. 引入三方库，这里使用 blueprint
import { Switch as BPSwitch, Checkbox, SwitchProps, CheckboxProps } from '@blueprintjs/core';

// 2. 引入 formik-form-render 的高阶组件 withField，向自定义组件传递操作表单的API
import { withField } from 'formik-form-render';

/**
 * 3. 声明自定义组件的Props类型（非 TS 可以忽略这一步）
 * 声明类型后，在 config 中可以联想到定义好的类型
 */
export interface ISwitch {
  /** blueprint 的 switch 组件属性 */
  bp?: Omit<SwitchProps | CheckboxProps, 'onChange' | 'checked' | 'value'>;
  /** 使用 checkbox 组件 */
  useCheckbox?: boolean;
}

/**
 * 导出该组件，外部通过 mapping 引入该组件。可参考 三方库Demo
 */
export const Switch = withField<ISwitch>(props => {
  /**
   * 使用 withField 包裹后，props会携带除bp、useCheckbox外的其他表单API
   */
  const { bp, useCheckbox, field, form } = props;
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
```
