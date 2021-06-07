import React from 'react';
import { withField } from '../withField';
import { Option } from './fieldType';
import { s2o } from './tool';

export interface ISelect {
  options: (Option | string)[];
  placeholder?: string;
}

export default withField<ISelect>(props => {
  const { field, options, placeholder } = props;
  return (
    <select {...field}>
      {placeholder ? <option value="">{placeholder}</option> : null}
      {s2o(options).map(({ label, value }) => (
        <option key={label} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});
