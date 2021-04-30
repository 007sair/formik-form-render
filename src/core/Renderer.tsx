import React from 'react';
import { Formik, FormikValues } from 'formik';
import { IFormikStatus, RendererProps } from './types';
import { c2n } from './utils';
import AutoSubmit from './AutoSubmit';
import Node from './Node';

export default function<C, V = FormikValues>(props: RendererProps<C, V>) {
  const { render, defaultValues, mapping, prefixcls, syncWithData } = props;
  const initStatus = {
    defaultValues,
    mapping,
    prefixcls: prefixcls || 'ffr', // formik-form-render
    syncWithData,
  } as IFormikStatus;
  return (
    <Formik
      enableReinitialize
      {...props.formikProps}
      initialValues={props.values}
      initialStatus={initStatus}
      onSubmit={props.onSubmit}
    >
      {formik => {
        const form = (
          <>
            {props.autoSubmit ? <AutoSubmit /> : null}
            <Node parentName={props.rootName || ''} node={c2n(props.config as any)} />
          </>
        );
        if (!render || typeof render !== 'function') {
          return form;
        }
        return render({
          form,
          formik,
        });
      }}
    </Formik>
  );
}
