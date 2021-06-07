import React, { ReactNode } from 'react';
import { ArrayHelpers } from 'formik';
import get from 'lodash/get';
import { withField } from '../withField';

interface ItemProps {
  array: any[];
  actions: ReactNode;
  //子项索引
  index: number;
  /** 使用此对象内部的方法时，不会触发 `onAdd`、`onDelete`、`onSwap` 等方法 */
  helpers: ArrayHelpers;
  child: ReactNode;
}

type Action = 'copy' | 'up' | 'down' | 'delete' | 'add';

export interface ICustomTabs {
  itemTitle?: React.ReactNode | ((item: any, index: number) => React.ReactNode);
  headExtra?: (defaultValue: any, push: ArrayHelpers['push']) => React.ReactNode;
  onBeforeAdd?: (oldItem: any, action: Action) => any;
  onAdd?: (item: any) => void;
  onDelete?: (item: any, index: number) => void;
  onSwap?: (sourceIndex: number, targetIndex: number) => void;
  actions?: Action[];
  renderItem?: (itemProps: ItemProps) => React.ReactNode;
}

const CustomArray = withField<ICustomTabs>(node => {
  const { field, onDelete, headExtra, onBeforeAdd, onAdd, onSwap, renderItem, itemTitle } = node;
  const name = field.name;
  const fieldValue = field.value || [];
  const helpers = node.arrayHelpers as ArrayHelpers;
  const { push, insert, swap, remove } = helpers;
  const arrValue = get(node.defaultValues, name);
  const actions = node.actions || ['add', 'copy', 'up', 'down', 'delete'];
  const getItem = (old: any, action: Action) => (onBeforeAdd ? onBeforeAdd(old, action) : old);

  return (
    <>
      {actions.includes('add') ? (
        <button
          onClick={() => {
            if (!arrValue) {
              alert('当前节点没有设置默认值，无法新增一项');
              return;
            }
            const item = getItem(arrValue[0], 'add');
            push(item);
            onAdd && onAdd(item);
          }}
        >
          新增
        </button>
      ) : headExtra ? (
        headExtra(arrValue, push)
      ) : null}
      {React.Children.map(node.children, (child, index) => {
        const item = fieldValue[index];
        const actionNode = (
          <>
            {actions.includes('copy') && (
              <button
                onClick={() => {
                  const _item = getItem(item, 'copy');
                  insert(index + 1, _item);
                  onAdd && onAdd(_item);
                }}
              >
                复制
              </button>
            )}
            {actions.includes('up') && (
              <button
                disabled={index === 0}
                onClick={() => {
                  swap(index, index - 1);
                  onSwap && onSwap(index, index - 1);
                }}
              >
                上移
              </button>
            )}
            {actions.includes('down') && (
              <button
                disabled={index === field.value.length - 1}
                onClick={() => {
                  swap(index + 1, index);
                  onSwap && onSwap(index + 1, index);
                }}
              >
                下移
              </button>
            )}
            {actions.includes('delete') && (
              <button
                disabled={field.value.length <= 1}
                onClick={() => {
                  remove(index);
                  onDelete && onDelete(item, index);
                }}
              >
                删除
              </button>
            )}
          </>
        );
        return !renderItem ? (
          <div className="item" key={index}>
            <div className="head">
              <div className="head-title">{typeof itemTitle === 'function' ? itemTitle(item, index) : itemTitle}</div>
              <div className="head-action">{actionNode}</div>
            </div>
            <div className="content">{child}</div>
          </div>
        ) : (
          renderItem({
            array: field.value,
            index,
            actions: actionNode,
            child,
            helpers,
          })
        );
      })}
    </>
  );
});

export default CustomArray;
