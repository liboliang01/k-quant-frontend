import { Button, Card, Col, Form, Radio, Row, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import BasicLayout from '../../layout/BasicLayout';
import './index.less';

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

const intlMap = new Map([
  ['MLP', '多层感知机'],
  ['LSTM', '长短期记忆神经网络'],
  ['ALSTM', '注意力机制长短期记忆神经网络'],
  ['GRU', '门控循环单元网络'],
  ['SFM', '离散状态频率记忆神经网络'],
  ['GATs', '图注意力网络'],
  ['average', '平均集成'],
  ['blend', '线性拟合'],
  ['dynamic_ensemble', '动态拟合'],
  ['ensemble_no_retrain', '多模型重采样融合1'],
  ['ensemble_retrain', '多模型重采样融合2'],
  ['Perfomance_based_ensemble', '多模型重采样融合3'],
  ['KEnhance', '多层临时图注意力模型'],
  ['RSR', '关系注意力股票排序模型'],
  ['HIST', '概念导向共享信息预测模型'],
  ['RSR_hidy_is', '关系注意力股票排序模型（使用K-quant知识图谱）'],
]);

const FinKGUpdate: React.FC = () => {
  const [form] = Form.useForm();
  const [actionType, setActionType] = useState('get_model_data');
  const [data, setData] = useState<any[]>([]);
  const columns: ColumnsType<TableType> = useMemo(() => {
    const cols1 = [
      {
        title: '模型名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '信息系数',
        dataIndex: 'IC',
        key: 'IC',
        sorter: (a: any, b: any) => a.IC - b.IC,
        render: (item: any) => Number(item).toFixed(2) + '%',
      },
      {
        title: '信标准差',
        dataIndex: 'ICIR',
        key: 'ICIR',
        sorter: (a: any, b: any) => a.ICIR - b.ICIR,
        render: (item: any) => Number(item).toFixed(2) + '%',
      },
      {
        title: '超额年化利率',
        dataIndex: 'annualized_return',
        key: 'annualized_return',
        sorter: (a: any, b: any) => a.annualized_return - b.annualized_return,
        render: (item: any) => Number(item).toFixed(2) + '%',
      },
      {
        title: '信息比率',
        dataIndex: 'information_ratio',
        key: 'information_ratio',
        sorter: (a: any, b: any) => a.information_ratio - b.information_ratio,
        render: (item: any) => Number(item).toFixed(2) + '%',
      },
      {
        title: '最大回撤',
        dataIndex: 'max_drawdown',
        key: 'max_drawdown',
        sorter: (a: any, b: any) => a.max_drawdown - b.max_drawdown,
        render: (item: any) => Number(item).toFixed(2) + '%',
      },
    ];
    const cols2 = [
      {
        title: '模型名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '信息系数(Incre)',
        dataIndex: 'IC_incre',
        key: 'IC_incre',
        sorter: (a: any, b: any) => a.IC_incre - b.IC_incre,
        render: (item: any) => Number(item).toFixed(2) + '%',
      },
      {
        title: '信标准差(Incre)',
        dataIndex: 'ICIR_incre',
        key: 'ICIR_incre',
        sorter: (a: any, b: any) => a.ICIR_incre - b.ICIR_incre,
        render: (item: any) => Number(item).toFixed(2) + '%',
      },
      {
        title: '信息系数(DoubleAdapt)',
        dataIndex: 'IC_DA',
        key: 'IC_DA',
        sorter: (a: any, b: any) => a.IC_DA - b.IC_DA,
        render: (item: any) => Number(item).toFixed(2) + '%',
      },
      {
        title: '信标准差(DoubleAdapt)',
        dataIndex: 'ICIR_DA',
        key: 'ICIR_DA',
        sorter: (a: any, b: any) => a.ICIR_DA - b.ICIR_DA,
        render: (item: any) => Number(item).toFixed(2) + '%',
      },
    ];
    return actionType === 'get_update_data' ? cols2 : cols1;
  }, [actionType]);

  const onSearch = () => {
    form.validateFields().then(async (values) => {
      const params = {
        ...values,
      };
      setActionType(params.actionType);
      const res = await axios.get(
        `http://47.106.95.15:8000/${values.actionType}/`,
        {
          params: {
            duration: params.duration,
          },
        },
      );
      const d = res.data.data.map((item: { [x: string]: any }) => {
        const key = Object.keys(item)[0];
        const val = item[key];
        return {
          name: intlMap.get(key) || key,
          ...val,
        };
      });
      setData(d);
    });
  };
  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <BasicLayout backgroundColor="#f5f5f5">
      <Card title="因子看板" style={{ marginBottom: '30px' }}>
        <Form form={form} {...layout}>
          <Form.Item
            label="操作类型"
            name="actionType"
            initialValue={'get_model_data'}
          >
            <Radio.Group>
              <Radio value="get_model_data">深度学习模型和知识赋能模型</Radio>
              <Radio value="get_rensemble_data">集成模型</Radio>
              <Radio value="get_update_data">增量更新</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="股票池" name="stock" initialValue={'csi300'}>
            <Radio.Group>
              <Radio value="csi300">沪深300</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="回测周期"
            name="duration"
            initialValue={'THERE_MONTH'}
          >
            <Radio.Group>
              <Radio value="THERE_MONTH">近三个月</Radio>
              <Radio value="SIX_MONTH">近半年</Radio>
              <Radio value="ONE_YEAR">近一年</Radio>
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
      <Table columns={columns} dataSource={data} pagination={false} />
    </BasicLayout>
  );
};

export default FinKGUpdate;
