import * as React from 'react';
import Renderer, { NodeConfig } from 'formik-form-render';
import './demo.scss'; // demo style
import './custom.scss';

export default () => {
  const initValues = {
    series: [
      {
        timeStamp: Date.now(),
        name: '',
        type: 'bar', // 'bar' | 'line'
        barWidth: 0, // visible when type is bar
        smooth: false, // visible when type is line
      },
    ],
  };

  const config: NodeConfig[] = [
    {
      type: 'array',
      name: 'series[]', // <- ⚠️ 注意这里的"[]"
      props: {
        itemTitle: (item, index) => (item.name ? item.name : `系列${index + 1}`),
        onBeforeAdd(oldItem, action) {
          const newItem = {
            ...oldItem,
            timeStamp: Date.now(),
          };
          if (action === 'add') {
            newItem.type = Math.random() > 0.5 ? 'bar' : 'line';
          }
          return newItem;
        },
      },
      children: [
        { type: 'text', name: 'name', label: '系列名称' },
        {
          type: 'radio',
          name: 'type',
          label: '系列类型',
          props: {
            options: [
              { label: '柱形图', value: 'bar' },
              { label: '折线图', value: 'line' },
            ],
          },
        },
        {
          type: 'text',
          name: 'barWidth',
          label: '柱条宽度',
          props: { type: 'number' },
          show: ({ parentValue }) => parentValue.type === 'bar',
        },
        {
          type: 'switch',
          name: 'smooth',
          label: '线条平滑',
          show: ({ parentValue }) => parentValue.type === 'line',
        },
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
