import { Option } from './fieldType';

export const s2o = (options: (Option | string)[]): Option[] => {
  return options.map(option => {
    if (typeof option === 'string') {
      return { label: option, value: option };
    }
    return option;
  });
};
