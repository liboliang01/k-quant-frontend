import { CopyOutlined } from '@ant-design/icons';
import { Modal, Space, Tag, message } from 'antd';
import copy from 'copy-to-clipboard';
import React, { useMemo, useState } from 'react';
import ReactJson from 'react-json-view';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { arta } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm';
import styles from './index.less';

interface PropsType {
  img: string | any;
  description: string;
  tags: string[];
  url: string;
  params: {
    name: string;
    type: string;
    desc: string;
    defaultVal: number | string;
  }[];
  response: Record<string, unknown>;
}

const tagColorList = new Map([
  ['crawler', 'blue'],
  ['pipline', 'red'],
  ['query', 'green'],
  ['rdf', 'gold'],
  ['neo4j', 'purple'],
  ['sql', 'orange'],
]);

const ApiModal: React.FC<PropsType> = (props) => {
  const { img, description, url, params, response, tags } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const requestCode = useMemo(() => {
    const paramsStr = params
      .map((item) => {
        const { name, defaultVal } = item;
        return name + '=' + defaultVal;
      })
      .join('&');
    return `curl -X 'GET' \
    'http://143.89.126.57:8001${url}?${paramsStr}' \
     -H 'accept: */*'`;
  }, [url, params]);

  const requestCode2 = useMemo(() => {
    const paramsStr = params
      .map((item) => {
        const { name, defaultVal } = item;
        return name + '=' + defaultVal;
      })
      .join('&');
    return `curl -X 'GET' \n
    'http://143.89.126.57:8001${url}?${paramsStr}' \n
     -H 'accept: */*'`;
  }, [url, params]);

  const handleCopy = () => {
    if (copy(requestCode)) {
      message.success('复制成功');
    } else message.error('复制失败，请手动复制');
  };

  return (
    <>
      <div onClick={() => setIsModalOpen(true)} className={styles.descCard}>
        <div className={styles.img}>{img}</div>
        <div className={styles.desc}>
          <div className={styles.title}>{description}</div>
          <div className={styles.url}>{url}</div>
          <Space>
            {tags.map((tag) => (
              <Tag color={tagColorList.get(tag)}>{tag}</Tag>
            ))}
          </Space>
        </div>
      </div>
      <Modal
        title={description}
        open={isModalOpen}
        width={1000}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <Space>
          {tags.map((tag) => (
            <Tag color={tagColorList.get(tag)}>{tag}</Tag>
          ))}
        </Space>
        <div>Url</div>
        <ReactMarkdown children={url} remarkPlugins={[remarkGfm]} />
        <div>参数</div>
        <div className={styles.paramsArea}>
          {params.map((item) => {
            return (
              <div className={styles.paramsCard}>
                <div className={styles.param}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.type}>
                    <span style={{ color: 'gray' }}>{item.desc}</span>{' '}
                  </div>
                </div>
                <div className={styles.desc}>
                  ({item.type})
                </div>
                <div className={styles.defaultVal}>{item.defaultVal}</div>
              </div>
            );
          })}
        </div>
        <div>
          API请求示例{' '}
          <CopyOutlined onClick={handleCopy} style={{ color: '#1677ff' }} />
        </div>
        <div className={styles.bashArea}>
          <SyntaxHighlighter language="bash" style={arta}>
            {requestCode2}
          </SyntaxHighlighter>
        </div>
        <div>API返回结果</div>
        <div className={styles.jsonArea}>
          <ReactJson
            src={response}
            enableClipboard={false}
            name={null}
            theme="monokai"
          ></ReactJson>
        </div>
      </Modal>
    </>
  );
};

export default ApiModal;
