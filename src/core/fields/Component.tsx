import * as React from 'react';
import { NodeCustomProps } from '../types';

export interface IComponentProps {
  render: React.ReactNode | ((props: NodeCustomProps) => React.ReactNode);
}

export default (node: NodeCustomProps & IComponentProps) => {
  const { render, ...nodeCompProps } = node;
  return typeof render === 'function' ? render(nodeCompProps) : render;
};
