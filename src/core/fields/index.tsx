import Fragment from './Fragment';
import InputText from './InputText';
import Switch from './Switch';
import Select from './Select';
import Radio from './Radio';
import Checkbox from './Checkbox';
import CustomArray from './Array';
import Component from './Component';

export const nodeMapping = {
  fragment: Fragment,
  component: Component,
  text: InputText,
  switch: Switch,
  select: Select,
  radio: Radio,
  checkbox: Checkbox,
  array: CustomArray,
};
