import * as React from 'react';
import Renderer, { NodeConfig } from 'formik-form-render';
import './demo.scss'; // demo style
import './custom.scss';

const rdmColor = function() {
  return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6);
};

export default () => {
  const initValues = {
    colors: ['#ff0000'],
  };

  const config: NodeConfig[] = [
    {
      type: 'array',
      name: 'colors[]', // <- ⚠️ 注意这里的"[]"
      props: {
        actions: ['copy', 'delete', 'down', 'up'],
        headExtra(values, push) {
          return <button onClick={() => push(rdmColor())}>+</button>;
        },
        renderItem({ index, helpers, child, array }) {
          const item = array[index];
          return (
            <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
              <div className="cont" style={{ display: 'flex', alignItems: 'center' }}>
                <label>颜色{index + 1}：</label>
                <div style={{ marginBottom: -10 }}>{child}</div>
              </div>
              <div>
                <button onClick={() => helpers.insert(index + 1, item)}>复制</button>
                <button onClick={() => helpers.remove(index)}>删除</button>
                <button onClick={() => helpers.swap(index, index - 1)} disabled={index === 0}>
                  上移
                </button>
                <button onClick={() => helpers.swap(index + 1, index)} disabled={index === array.length - 1}>
                  下移
                </button>
              </div>
            </div>
          );
        },
      },
      children: [{ type: 'text', name: '', props: { type: 'color' } }],
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
