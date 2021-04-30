import React, { useState, useCallback, useEffect } from 'react';
import { NumericInput, NumericInputProps, Tag, HTMLInputProps } from '@blueprintjs/core';
import { withField, validateMerge } from 'formik-form-render';
import { debounce, isUndefined } from 'lodash';

const validator = {
  min: (n: number) => (v: number) => (v < n ? `数值不能小于${n}` : undefined),
  max: (n: number) => (v: number) => (v > n ? `数值不能大于${n}` : undefined),
};

export interface InputNumberProps {
  bp?: NumericInputProps & HTMLInputProps;
  unit?: string;
}

const CLICK_DEBOUNCE_MS = 300;

export const InputNumber = withField<InputNumberProps>(
  props => {
    const { field, form, unit, bp } = props;
    const [inputValue, setInputValue] = useState(field.value);
    const meta = form.getFieldMeta(field.name);
    const err = meta.touched && meta.error;
    const intent = err ? 'danger' : 'none';

    useEffect(() => {
      setInputValue(field.value);
    }, [field.value]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceCallback = useCallback(
      debounce(value => {
        form.setFieldValue(field.name, value);
      }, CLICK_DEBOUNCE_MS),
      [field.name],
    );

    return (
      <>
        <NumericInput
          rightElement={
            unit ? (
              <Tag intent={intent} minimal={true}>
                {unit}
              </Tag>
            ) : (
              <></>
            )
          }
          style={{ width: bp?.fill ? '100%' : 100 }} // 100: 解决边框重渲染时突然增加的 35px 问题
          intent={intent}
          {...bp}
          asyncControl
          value={inputValue}
          name={field.name}
          onButtonClick={val => {
            setInputValue(val);
            debounceCallback(val);
          }}
          onBlur={e => {
            const val = Number(e.currentTarget.value) || 0;
            if (field.value !== val) {
              form.setFieldValue(field.name, val);
            }
          }}
        />
        {err && <div className="error">{meta.error}</div>}
      </>
    );
  },
  props => {
    const _validator: any[] = [];
    if (props.bp) {
      if (!isUndefined(props.bp.min)) {
        _validator.push(validator.min(props.bp.min));
      }
      if (!isUndefined(props.bp.max)) {
        _validator.push(validator.max(props.bp.max));
      }
    }
    return {
      validate: validateMerge([props.validate, ..._validator]),
    };
  },
);
