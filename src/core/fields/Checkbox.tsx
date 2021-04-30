import React from 'react';
import { withField } from '../withField';

interface IOption {
  label: string;
  value: string;
}

export interface ICheckboxGroup {
  options: IOption[];
}

const CheckboxGroup = withField<ICheckboxGroup>(props => {
  const { field, form, options } = props;
  const fieldValue: string[] = field.value;
  return (
    <>
      {options.map(({ label, value }) => {
        const id = [field.name, label].join('-');
        const checked = fieldValue.includes(value);
        return (
          <div key={id}>
            <input
              type="checkbox"
              id={id}
              name={field.name}
              onChange={() => {
                let val = [...fieldValue];
                if (checked) {
                  val = val.filter((v: any) => v !== value);
                } else {
                  val.push(value);
                }
                form.setFieldValue(field.name, val);
                form.setFieldTouched(field.name, true);
              }}
              checked={checked}
            />
            <label htmlFor={id}>{label}</label>
          </div>
        );
      })}
    </>
  );
});

export default CheckboxGroup;
