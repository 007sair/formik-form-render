/**
 * 表单触发修改时自动提交表单
 */
import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useDebounce } from 'use-debounce';

export default () => {
  const { values, submitForm, setSubmitting, dirty } = useFormikContext();
  const [debounceValues] = useDebounce(values, 300);

  useEffect(() => {
    // 可以阻止初次加载的副作用影响，比如：提交了errors信息
    if (!dirty) {
      return;
    }
    /**
     * ⚠️ 注意：
     * 表单提交是异步操作，频繁触发`setFieldValue`时，需要将`isSubmitting`作为`useEffect`的依赖传入，
     * 否则会出现`setFieldValue`失效的问题。
     */
    submitForm().then(() => {
      setSubmitting(false);
    });
  }, [debounceValues]); // eslint-disable-line

  return null;
};
