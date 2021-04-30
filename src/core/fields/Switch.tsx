import React from 'react';
import { withField } from '../withField';

export default withField(props => {
  return <input type="checkbox" {...props.field} />;
});
