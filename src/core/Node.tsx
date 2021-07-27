import React, { useEffect, useMemo, useCallback, useRef } from 'react';
import { useFormikContext, FieldArray } from 'formik';
import { NodeProps, NodeCustomProps, NodeFuncParam, IFormikStatus } from './types';
import { resolveName, _, validateMerge } from './utils';
import ErrorBoundary from './ErrorBoundary';
import { nodeMapping } from './fields/index';

const { get, has, isFunction } = _;

/**
 * 渲染子节点
 * @param node 当前节点，要渲染的子节点来自当前节点的`children`
 * @param parentName 当前节点`name`全称
 */
function renderChildren(props: NodeProps) {
  const { node, parentName } = props;
  if (!node.children) {
    return null;
  }
  return node.children.map((child, index) => {
    return <Node key={child.name + child.label + index} node={child} parentName={parentName} />;
  });
}

function Node(props: NodeProps) {
  const { parentName, node } = props;
  const { values, setFieldValue, status, isValid } = useFormikContext();
  const { mapping, prefixcls, syncWithData }: IFormikStatus = status;
  const fullyName = resolveName(parentName, node.name); // 当前节点的完整name
  const isArrayNode = /\[\]$/g.test(node.name); // 当前节点是数组节点
  const comps = { ...nodeMapping, ...mapping };
  const { nodeValue, shouldRender } = useMemo(() => {
    return {
      nodeValue: get(values, fullyName),
      shouldRender: !fullyName || (syncWithData ? has(values, fullyName) : true),
    };
  }, [fullyName, values]);
  const oldValue = useRef(nodeValue);

  const getValue = useCallback(
    (name, path) => {
      const _name = resolveName(name, path || '');
      return _name ? get(values, _name) : values;
    },
    [values],
  );

  const params = useMemo<NodeFuncParam>(() => {
    return {
      name: fullyName,
      parentName,
      oldValue: oldValue.current,
      value: nodeValue,
      parentValue: getValue(fullyName, '../'),
      rootValue: getValue(fullyName, '#'),
      getValue,
      setValue: setFieldValue,
    };
  }, [fullyName, getValue, nodeValue, parentName, setFieldValue]);

  const nodeCustomProps = useMemo(() => {
    const _props: NodeCustomProps = {
      name: fullyName,
      ...(isFunction(node.props) ? node.props(params) : node.props),
    };
    if (isFunction(node.validate)) {
      _props.validate = (value: any) => (isFunction(node.validate) ? node.validate(value, params) : undefined);
    } else {
      if (Array.isArray(node.validate)) {
        _props.validate = validateMerge(node.validate);
      }
    }
    return _props;
  }, [fullyName, node, params]);

  useEffect(() => {
    // form验证通过 且 值发生了变化
    if (isValid && oldValue.current !== nodeValue) {
      node.onChange && node.onChange(params);
      oldValue.current = nodeValue;
    }
  }, [nodeValue, params, node, isValid]);

  const fieldCls = `${prefixcls}-field`;

  const Label = useMemo(() => {
    const _label = isFunction(node.label) ? node.label(params) : node.label;
    return _label && <div className={`${fieldCls}-label`}>{_label}</div>;
  }, [node, params]);

  const NodeComp = comps[node.type] as any;

  // 配置项与数据结构不一致 或 设置了 show 配置，就不渲染当前节点及子节点
  if (!shouldRender || (node.show && !node.show(params))) {
    return null;
  }

  const renderNodeComp = () => {
    if (isArrayNode) {
      return (
        <FieldArray name={fullyName}>
          {arrayHelpers => {
            return (
              <NodeComp {...nodeCustomProps} arrayHelpers={arrayHelpers}>
                {nodeValue.map((item: any, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      {renderChildren({ node, parentName: `${fullyName}[${index}]` })}
                    </React.Fragment>
                  );
                })}
              </NodeComp>
            );
          }}
        </FieldArray>
      );
    }
    return (
      <NodeComp {...nodeCustomProps}>
        {renderChildren({
          node,
          parentName: fullyName,
        })}
      </NodeComp>
    );
  };

  return (
    <ErrorBoundary errorMessage={`type=${node.type as unknown}的组件发生了错误`}>
      <div className={[fieldCls, `${fieldCls}_${node.type as unknown}`, node.className || ''].join(' ')}>
        {Label}
        <div className={`${fieldCls}-component`}>{renderNodeComp()}</div>
      </div>
    </ErrorBoundary>
  );
}

export default Node;
