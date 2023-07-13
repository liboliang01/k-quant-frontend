import styles from '@/global.less';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Radio,
  Row,
  Space,
  Table,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { ColumnsType } from 'antd/es/table';
import React, { useMemo, useState } from 'react';
import BasicLayout from '../../layout/BasicLayout';

const layout = {
  labelCol: { span: 4 },
};

interface TableType {
  name: string;
  small: number;
  big: number;
  min: number;
  max: number;
  ic: number;
  ir: number;
}

const sorter = (a: any, b: any) => a - b;

const plainOptions = [
  'GATs',
  'GRU',
  'LSTM',
  'MLP',
  'ALSTM',
  'SFM',
  'HIST',
  'FNRSR',
];

const FinKGUpdate: React.FC = () => {
  const [form] = Form.useForm();
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const columns: ColumnsType<TableType> = useMemo(() => {
    const cols = [
      {
        title: '因子名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '最小分位数超额年化收益率',
        dataIndex: 'small',
        key: 'small',
        sorter: sorter,
      },
      {
        title: '最大分位数超额年化收益率',
        dataIndex: 'big',
        key: 'big',
        sorter: sorter,
      },
      {
        title: '最小分位数换手率',
        dataIndex: 'min',
        key: 'min',
        sorter: sorter,
      },
      {
        title: '最大分位数换手率',
        dataIndex: 'max',
        key: 'max',
        sorter: sorter,
      },
      {
        title: 'IC均值',
        dataIndex: 'ic',
        key: 'ic',
        sorter: sorter,
      },
      {
        title: 'IR均值',
        dataIndex: 'ir',
        key: 'ir',
        sorter: sorter,
      },
    ];
    return cols;
  }, []);

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };
  const onSearch = () => {
    form.validateFields().then((values) => {
      const params = {
        models: checkedList,
        ...values,
      };
      console.log(params);
    });
  };
  const onReset = () => {
    form.resetFields();
    setCheckedList([]);
    setIndeterminate(false);
    setCheckAll(false);
  };
  return (
    <BasicLayout backgroundColor="#f5f5f5">
      <Card title="因子看板" style={{ marginBottom: '30px' }}>
        <Row style={{ lineHeight: '32px', height: 32, marginBottom: 24 }}>
          <Col
            span={4}
            style={{
              textAlign: 'end',
            }}
          >
            <label title="模型" className={styles.antdLabel}>
              模型
            </label>
          </Col>
          <Col>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
              style={{ marginRight: 20 }}
            >
              all
            </Checkbox>
            <Checkbox.Group
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
          </Col>
        </Row>

        <Form form={form} {...layout}>
          <Form.Item label="股票池" name="stock">
            <Radio.Group>
              <Radio value="a">沪深300</Radio>
              <Radio value="b">中证500</Radio>
              <Radio value="c">中证800</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="回测周期" name="time">
            <Radio.Group>
              <Radio value="a">近一个月</Radio>
              <Radio value="b">近三个月</Radio>
              <Radio value="c">近半年</Radio>
              <Radio value="d">近一年</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Row>
              <Col span={4}></Col>
              <Col>
                <Space>
                  <Button type="primary" onClick={onSearch}>
                    查询
                  </Button>
                  <Button onClick={onReset}>重置</Button>
                </Space>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
      <Table columns={columns} />
    </BasicLayout>
  );
};

export default FinKGUpdate;
