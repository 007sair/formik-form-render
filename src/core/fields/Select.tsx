import React from 'react';
import { withField } from '../withField';

interface IOption {
  label: string;
  value: string | number;
}

export interface ISelect {
  options: IOption[];
  placeholder?: string;
}

export default withField<ISelect>(props => {
  const { field, options, placeholder } = props;
  return (
    <select {...field}>
      {placeholder ? <option value="">{placeholder}</option> : null}
      {options.map(({ label, value }) => (
        <option key={label} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});
