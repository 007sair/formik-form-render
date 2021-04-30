/**
 * 表单控件展开收起组件
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { Collapse as BPCollapse, CollapseProps, Position, Icon, Colors } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';

export interface ITextTip {
  text: JSX.Element | string;
}

const TextTip: React.FC<ITextTip> = ({ text }) => {
  return (
    <Tooltip2
      content={typeof text === 'string' ? <div style={{ maxWidth: 200 }}>{text}</div> : text}
      position={Position.RIGHT_TOP}
    >
      <Icon style={{ verticalAlign: 'middle', margin: '-1px 0 0 3px' }} icon="help" iconSize={12} />
    </Tooltip2>
  );
};

const CLASS_NAME = 'field-collapse';

const Container = styled.div.attrs(() => {
  return {
    className: CLASS_NAME,
  };
})<{ isOpen: boolean }>`
  z-index: ${props => (props.isOpen ? 10000 : 0)};

  .fc-head {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    padding: 10px 0;
    cursor: pointer;

    .lt {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .rt {
      display: flex;
      align-items: center;
      .arrow {
        transition: transform 0.3s ease;
      }
      .extra {
        margin-right: 5px;
      }
    }
  }

  .fc-body {
    width: 100%;
    /* overflow: hidden;  不能设置超出隐藏，有些组件是悬浮的下拉框 */
    .bp3-collapse-body {
      position: relative;
      padding: 10px;
      > * {
        margin: 0 0 10px 0;
        margin-bottom: 10px;
        &:last-child {
          margin: 0;
        }
      }
    }
  }

  /* 相邻的下一个自身元素时，减去自身重叠的边线 */
  & + & {
    margin-top: -1px;
  }

  /* 嵌套自身 */
  & & {
    background-color: ${props => props.theme.gray3};
    border-width: 0px;
    border-radius: 2px;
  }
  & & & {
    background-color: ${props => props.theme.gray2};
  }
  & & & & {
    background-color: ${props => props.theme.gray3};
  }
  & & & & & {
    background-color: ${props => props.theme.gray2};
  }
`;

export interface ICollapse {
  label: React.ReactNode;
  help?: JSX.Element | string;
  extra?: React.ReactNode;
  isOpen?: boolean; // 是否展开
  collapseProps?: CollapseProps;
}

export const Collapse: React.FC<ICollapse> = props => {
  const { help, label, extra, collapseProps } = props;
  const [isOpen, setIsOpen] = useState(props.isOpen || false);

  return (
    <Container className="field-collapse" isOpen={isOpen}>
      <div className="fc-head" onClick={() => setIsOpen(!isOpen)}>
        <div className="lt">
          {label}
          {help ? <TextTip text={help} /> : null}
        </div>
        <div className="rt">
          <div className="extra" onClick={e => e.stopPropagation()}>
            {extra}
          </div>
          <Icon className="arrow" icon="chevron-right" style={{ transform: `rotate(${isOpen ? 90 : 0}deg)` }} />
        </div>
      </div>
      {
        // 关于 keepChildrenMounted：
        // 当表单配置过多时，不要开启 keepChildrenMounted，否则会有严重的性能消耗。
      }
      <BPCollapse className="fc-body" isOpen={isOpen} {...collapseProps}>
        {props.children}
      </BPCollapse>
    </Container>
  );
};
