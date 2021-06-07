import React from 'react';
import { Button, Menu, MenuItem, Position, OptionProps, MenuItemProps, ButtonProps } from '@blueprintjs/core';
import { children2option } from './utils';
import { withField } from 'formik-form-render';
import { Popover2, Popover2Props } from '@blueprintjs/popover2';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

export interface SelectProps {
  options?: Array<OptionProps & Omit<MenuItemProps, 'text' | 'active'>>;
  children?: React.ReactNode;
  buttonProps?: ButtonProps;
  popoverProps?: Popover2Props;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

export const Select = withField<SelectProps>(props => {
  const { field, form, options, children, buttonProps, popoverProps, onChange, disabled } = props;
  const placeholder = '请选择下拉项';

  // 优先使用 options，没有时才使用 children
  const _options = options ? options : children2option(children);
  const activeOption = _options.find(option => option.value === field.value);

  return (
    <Popover2
      position={Position.BOTTOM}
      disabled={disabled}
      {...popoverProps}
      content={
        <Menu style={{ maxHeight: 240, overflow: 'auto' }}>
          {_options.length ? (
            _options.map(({ label, value, ...rest }) => (
              <MenuItem
                key={value}
                text={label}
                active={value === field.value}
                {...rest}
                onClick={() => {
                  form.setFieldValue(field.name, value);
                  form.setFieldTouched(field.name, true);
                  onChange && onChange(value);
                }}
              />
            ))
          ) : (
            <MenuItem text={'没有下拉数据'} />
          )}
        </Menu>
      }
    >
      <Button
        alignText="left"
        rightIcon="double-caret-vertical"
        disabled={disabled}
        {...buttonProps}
        text={activeOption?.label || placeholder}
      />
    </Popover2>
  );
});
