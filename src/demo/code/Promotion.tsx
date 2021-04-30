/**
 * 状态提升
 */

import * as React from 'react';
import Renderer, { NodeConfig, resolveName } from 'formik-form-render';
import './demo.scss'; // demo style
import './custom.scss';

export default () => {
  const initValues = {
    series: [
      {
        timeStamp: Date.now(),
        name: '',
        color: '#ff0000',
        barWidth: 0,
      },
      {
        timeStamp: Date.now() + 1000,
        name: '',
        color: '#ffff00',
        barWidth: 0,
      },
    ],
  };

  const config: NodeConfig[] = [
    {
      type: 'text',
      name: 'series.0.barWidth',
      label: () => (
        <>
          柱条宽度<small>(公共配置)</small>
        </>
      ),
      props: { type: 'number' },
      onChange({ name, value, getValue, setValue }) {
        // `../../` 向上查找2层，每个"."都算一层
        const series = getValue(name, '../../'); // 获取到数组的数据
        const seriesName = resolveName(name, '../../'); // 根据当前节点，解析出 系列数组 这个节点的name
        const newSeries = series.map(item => ({ ...item, barWidth: value }));
        setValue(seriesName, newSeries);
      },
    },
    {
      type: 'array',
      name: 'series[]', // <- ⚠️ 注意这里的"[]"
      props: {
        itemTitle: (item, index) => (item.name ? item.name : `系列${index + 1}`),
        actions: ['copy', 'delete', 'down', 'up'],
        onBeforeAdd(oldItem) {
          return {
            ...oldItem,
            timeStamp: Date.now(),
          };
        },
      },
      children: [
        { type: 'text', name: 'name', label: '系列名称' },
        { type: 'text', name: 'color', label: '柱条颜色', props: { type: 'color' } },
      ],
    },
  ];

  const onSubmit = values => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Renderer
      values={initValues}
      defaultValues={initValues}
      config={config}
      onSubmit={onSubmit}
      prefixcls="jdv"
      render={({ form, formik }) => {
        return (
          <div className="demo-panel">
            <div className="form">
              {form}
              <div className="actions">
                <button type="submit" onClick={() => formik.handleSubmit()}>
                  提交
                </button>
              </div>
            </div>
            <div className="code">
              <pre>{JSON.stringify(formik.values, null, 2)}</pre>
            </div>
          </div>
        );
      }}
    />
  );
};
