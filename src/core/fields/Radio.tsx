import React from 'react';
import { withField } from '../withField';
import { Option } from './fieldType';
import { s2o } from './tool';

export interface IRadio {
  options: (Option | string)[];
}

export default withField<IRadio>(props => {
  const { field, form, options } = props;
  return (
    <>
      {s2o(options).map(({ label, value }) => {
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
