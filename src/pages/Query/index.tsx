import SubGraph from '@/components/SubGraph';
import UpdateData from '@/components/SubGraph/updateData';
import { Button, Form, Input, Select } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useMemo } from 'react';
import BasicLayout from '../../layout/BasicLayout';

const RelaList = [
  'all',
  'SW belongs to',
  'managed by',
  'company locate in city',
  'work for',
  'hold',
  'same industry',
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

  const suits = useMemo(
    () =>
      UpdateData[1].origin.map((item) => ({
        ...item,
        type: item.rela,
      })),
    [],
  );

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
          <Form.Item label="Relation" name="rela" initialValue={'all'}>
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
          <Form.Item label="Search Node" name="node">
            <Input
              style={{ width: '100%' }}
              placeholder="Please input the search node"
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Select</Button>
          </Form.Item>
        </Form>
        <SubGraph suits={suits} />
      </BasicLayout>
    </>
  );
};

export default FinKGQuery;
