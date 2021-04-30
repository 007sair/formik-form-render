import React from 'react';
import { withField } from '../withField';

interface IOption {
  label: string;
  value: string | number;
}

export interface IRadio {
  options: IOption[];
}

export default withField<IRadio>(props => {
  const { field, form, options } = props;
  return (
    <>
      {options.map(({ label, value }) => {
        const id = [field.name, label].join('-');
        return (
          <div key={id}>
            <input
              type="radio"
              id={id}
              name={field.name}
              value={field.value}
              onChange={() => form.setFieldValue(field.name, value)}
              checked={value === field.value}
            />
            <label htmlFor={id}>{label}</label>
          </div>
        );
      })}
    </>
  );
});
