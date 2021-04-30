import * as React from 'react';
import { NodeCustomProps } from '../types';

export default (node: NodeCustomProps) => {
  return <>{node.children}</>;
};
