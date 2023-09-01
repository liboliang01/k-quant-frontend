import SubGraph from '@/components/SubGraph';
import { getSubGraph } from '@/components/SubGraph/graphData';
import { Button, Form, Input, Select, message } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useCallback, useState } from 'react';
import BasicLayout from '../../layout/BasicLayout';
import styles from './index.less';

const RelaList = [
  'all',
  'SW belongs to',
  'managed by',
  'company locate in city',
  'work for',
  'hold',
  'same_industry',
  'rise',
  'compete',
  'cooperate',
  'increase holding',
  'fall',
  'supply',
  'be reduced holding',
  'be invested',
  'reduce holding',
  'superior',
  'be increased holding',
  'subordinate',
  'invest',
  'dispute',
  'be supplied',
];

const FinKGQuery: React.FC = () => {
  const [form] = Form.useForm();
  const [nodes, setNodes] = useState<
    { source: string; target: string; type: string }[]
  >([]);

  const pushNodes = useCallback(() => {
    form.validateFields().then((values) => {
      setNodes([]);
      const { relation, node } = values;
      let nodeList = [];
      if (node || relation) {
        nodeList = getSubGraph(node || '000001.SZ', relation || 'all').map(
          (item: { rela: any }) => ({
            ...item,
            type: item.rela,
          }),
        );
      } else {
        const nodeList1 = getSubGraph('000001.SZ', 'all');
        const nodeList2 = getSubGraph('000002.SZ', 'all');
        nodeList = [...nodeList1, ...nodeList2].map((item) => ({
          ...item,
          type: item.rela,
        }));
      }
      if (nodeList.length === 0) {
        message.info('未找到节点');
      } else {
        setNodes(nodeList);
      }
    });
  }, [form, getSubGraph, setNodes]);

  return (
    <>
      <BasicLayout>
        <div className="align-items-center mb-3 row">
          <div className="col-lg-7">
            <h2 className="h6 text-primary">Our Process</h2>
            <h3 className="fw-bold h2 mb-1 text-black-50">Knowledge Graph</h3>
          </div>

          <div className="align-items-center justify-content-center row">
            <div className="col-lg-3 col-sm-6 pb-3 pt-3">
              <div className="d-flex">
                <div>
                  <h2 className="display-5 fw-bold text-primary">30,000+</h2>
                  <p className="mb-0 text-black-50">Entities</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 pb-3 pt-3">
              <div className="d-flex">
                <div>
                  <h2 className="display-5 fw-bold text-primary">20+</h2>
                  <p className="mb-0 text-black-50">Relations</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 pb-3 pt-3">
              <div className="d-flex">
                <div>
                  <h2 className="display-5 fw-bold text-primary">4,000+</h2>
                  <p className="mb-0 text-black-50">Short term Events</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 pb-3 pt-3">
              <div className="d-flex">
                <div>
                  <h2 className="display-5 fw-bold text-primary">10+</h2>
                  <p className="mb-0 text-black-50">High-frequency Events</p>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
        <Form form={form} layout="vertical">
          <Form.Item label="Relation" name="relation" initialValue={'all'}>
            <Select
              style={{ width: '100%' }}
              placeholder="Please choose a relation"
              allowClear
            >
              {RelaList.map((item) => {
                return (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Search Node" name="node" initialValue={'000001.SZ'}>
            <Input
              style={{ width: '100%' }}
              placeholder="Please input the search node"
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={pushNodes}>
              Select
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.svgContainer}>
          <SubGraph suits={nodes} />
        </div>
      </BasicLayout>
    </>
  );
};

export default FinKGQuery;
