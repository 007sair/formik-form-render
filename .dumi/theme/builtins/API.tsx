import React, { useContext } from 'react';
import { IApiComponentProps } from 'dumi/theme';
import { context, useApiData } from 'dumi/theme';
import styled from 'styled-components';
import marked from 'marked';

const Container = styled.div`
  table {
    line-height: 1.5;
    font-size: 14px;
  }
`;

const LOCALE_TEXTS = {
  'zh-CN': {
    name: '属性名',
    description: '描述',
    type: '类型',
    default: '默认值',
    required: '(必选)',
  },
  'en-US': {
    name: 'Name',
    description: 'Description',
    type: 'Type',
    default: 'Default',
    required: '(required)',
  },
};

interface ApiProps extends IApiComponentProps {
  desc?: string;
}

export default ({ identifier, export: expt, desc }: ApiProps) => {
  const data = useApiData(identifier);
  const { locale } = useContext(context);
  const texts = /^zh|cn$/i.test(locale) ? LOCALE_TEXTS['zh-CN'] : LOCALE_TEXTS['en-US'];

  return (
    <Container>
      {desc && <div dangerouslySetInnerHTML={{ __html: marked(desc) || '--' }}></div>}
      {data && (
        <table style={{ marginTop: 24 }}>
          <thead>
            <tr>
              <th>{texts.name}</th>
              <th>{texts.description}</th>
              <th style={{ width: '30%' }}>{texts.type}</th>
              <th style={{ width: '10%' }}>{texts.default}</th>
            </tr>
          </thead>
          <tbody>
            {data[expt].map(row => (
              <tr key={row.identifier}>
                <td>{row.identifier}</td>
                <td dangerouslySetInnerHTML={{ __html: marked(row.description) || '--' }}></td>
                <td>
                  <code>{row.type}</code>
                </td>
                <td>
                  <code>{row.default || (row.required && texts.required) || '--'}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
};
