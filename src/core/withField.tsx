/**
 * 高阶组件，用于二次封装 formik 表单控件
 * --------------------------
 * 使用方法:
 * ```
 * interface InputTextProps {
 *   icon: React.ReactNode;
 * }
 * const InputText = withField<InputTextProps>((props) => {
 *   const { field, form, icon } = props; // props包含的属性
 *   // 自定义组件内容...
 * });
 * ```
 */

import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { NodeCustomProps } from './types';

type withFieldProps = NodeCustomProps & {
  /**
   * 是否使用 FastField 组件，默认使用。
   * -------------------------------
   * ⚠️ 引入 FastField 组件的原因：
   * 在开发自定义组件时，我们需要使用 useField 或 Field，使自定义组件有操作表单的能力。
   * 但是 useField 目前没有提供类似 FastField 的能力，需要手动使用 useMemo 做性能优化。
   * 当自定义组件被应用于大型表单时，会出现多次无效 rerender，为了避免性能消耗，才使用 FastField。
   */
  useFastField?: boolean;
};

type ComponentProps = Omit<NodeCustomProps, 'name' | 'validate'>;

type Other = Pick<withFieldProps, 'validate' | 'useFastField'>;

export function withField<P>(
  Component: React.ComponentType<P & FieldProps & ComponentProps>,
  otherProps?: ((props: P & withFieldProps) => Other) | Other,
): React.FC<P & withFieldProps> {
  return function(props) {
    const other = typeof otherProps === 'function' ? otherProps(props) : otherProps;
    const { useFastField = true, name, validate, ...rest } = props;
    const fast = typeof other?.useFastField !== 'undefined' ? other.useFastField : useFastField;
    const F = fast ? FastField : Field;
    const _validate = typeof other?.validate !== 'undefined' ? other.validate : validate;

    return (
      <F name={name} validate={_validate}>
        {(fieldProps: FieldProps) => {
          return <Component {...fieldProps} {...(rest as ComponentProps & P)} />;
        }}
      </F>
    );
  };
}
