import React from 'react';
import Renderer, { NodeConfig } from 'formik-form-render';
import './demo.scss'; // demo style

const rate = {
  CNY: { zhCN: '人民币', rate: 1 },
  USD: { zhCN: '美元', rate: 0.15 },
  JPY: { zhCN: '日元', rate: 16.64 },
  EUR: { zhCN: '欧元', rate: 0.12722 },
  GBP: { zhCN: '英镑', rate: 0.1108 },
};

const options = Object.keys(rate).map(key => {
  return {
    label: rate[key].zhCN,
    value: key,
  };
});

/**
 * 汇率计算
 * @param currency 转换币种
 * @param amount 转换前的金额
 * @return 转换后的金额
 */
type Currency = keyof typeof rate;

const getExchangeAmount = (currency: Currency, amount: number) => {
  return amount * (rate[currency].rate || 1);
};

export default () => {
  const initValues = {
    currency: 'CNY',
    amount: 0,
    exchange_amount: 0,
    more: '',
    gbp: '',
    eur: '',
  };

  const config: NodeConfig[] = [
    {
      type: 'text',
      name: 'amount',
      label: () => (
        <>
          Before<small>(人民币)</small>
        </>
      ),
      default: 0,
      props: { type: 'number' },
      validate: (val: any) => (val >= 0 ? undefined : '不能为负数哦~'),
      onChange({ value, parentValue, setValue }) {
        const amount = getExchangeAmount(parentValue.currency, value);
        setValue('exchange_amount', amount);
      },
    },
    {
      type: 'select',
      name: 'currency',
      label: '币种',
      default: 'CNY',
      props: { options },
      onChange({ value, parentValue, setValue }) {
        setValue('exchange_amount', getExchangeAmount(value, parentValue.amount));
      },
    },
    {
      type: 'text',
      name: 'exchange_amount',
      default: 0,
      props: {
        type: 'text',
        readOnly: true,
      },
      label: ({ parentValue }) => (
        <>
          After<small>({rate[parentValue.currency].zhCN || ''})</small>
        </>
      ),
    },
    {
      type: 'switch',
      name: 'more',
      label: '显示更多',
    },
    {
      type: 'fragment',
      name: '',
      show: ({ parentValue }) => parentValue.more,
      children: [
        {
          type: 'component',
          name: 'gbp',
          label: '英镑',
          props: ({ parentValue }) => {
            const val = getExchangeAmount('GBP', parentValue.amount);
            return {
              render: <input value={val} onChange={() => {}} readOnly />,
            };
          },
        },
        {
          type: 'component',
          name: 'eur',
          label: '欧元',
          props: ({ parentValue }) => {
            const val = getExchangeAmount('EUR', parentValue.amount);
            return {
              render: <input value={val} onChange={() => {}} readOnly />,
            };
          },
        },
      ],
    },
  ];

  const onSubmit = values => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Renderer
      config={config}
      values={initValues}
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
