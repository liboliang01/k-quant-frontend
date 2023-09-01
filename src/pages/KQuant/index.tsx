import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Radio,
  Row,
  Space,
  Table,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import BasicLayout from '../../layout/BasicLayout';
import ImagePreviewer from './ImagePreviewer';
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

const csi300: any = {
  THERE_MONTH: {
    annualized_return: -0.204992,
    information_ratio: -1.602319,
    max_drawdown: -0.092574,
  },
  SIX_MONTH: {
    annualized_return: -0.006858,
    information_ratio: -0.05266,
    max_drawdown: -0.100111,
  },
  ONE_YEAR: {
    annualized_return: -0.044674,
    information_ratio: -0.288192,
    max_drawdown: -0.243555,
  },
};

const FinKGUpdate: React.FC = () => {
  const [form] = Form.useForm();
  const [actionType, setActionType] = useState('get_model_data');
  const [duration, setDuration] = useState('THERE_MONTH');
  const [strategy, setStrategy] = useState('top30');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // 当前股票池是否为csi300
  const [isCSI300, setIsCSI300] = useState<boolean>(true);
  // 当前actionType是否为增量更新
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const columns: ColumnsType<TableType> = useMemo(() => {
    let numOfMonths = 3;
    let strategyPath = '';
    switch (duration) {
      case 'THERE_MONTH':
        numOfMonths = 3;
        break;
      case 'SIX_MONTH':
        numOfMonths = 6;
        break;
      case 'ONE_YEAR':
        numOfMonths = 12;
        break;
    }
    switch (strategy) {
      case 'top30':
        strategyPath = '';
        break;
      case 'top50':
        strategyPath = '_2';
        break;
      case 'top100':
        strategyPath = '_3';
        break;
    }
    const cols1 = [
      {
        title: '模型名称',
        dataIndex: 'name',
        key: 'name',
        render: (item: string) => {
          const list = ['HIST', 'RSR_hidy_is', 'KEnhance'];
          const flag = list.indexOf(item) >= 0;
          const stock = form.getFieldValue('stock');
          return (
            <ImagePreviewer
              text={`${flag ? '【知识图谱输入】' : ''}${intlMap.get(
                item,
              )}(${item})`}
              url={
                isCSI300
                  ? `model_png/plot_${item}_score_${numOfMonths}${strategyPath}.png`
                  : `model_png/plot_${item}_score_${numOfMonths}_${stock}.png`
              }
            />
          );
        },
      },
      {
        title: '信息系数',
        dataIndex: 'IC',
        key: 'IC',
        sorter: (a: any, b: any) => a.IC - b.IC,
        render: (item: any) => Number(item).toFixed(3),
      },
      {
        title: '信息标准差',
        dataIndex: 'ICIR',
        key: 'ICIR',
        sorter: (a: any, b: any) => a.ICIR - b.ICIR,
        render: (item: any) => Number(item).toFixed(3),
      },
      {
        title: '超额年化利率',
        dataIndex: 'annualized_return',
        key: 'annualized_return',
        sorter: (a: any, b: any) => a.annualized_return - b.annualized_return,
        render: (item: any) => Number(Number(item) * 100).toFixed(2) + '%',
      },
      {
        title: '信息比率',
        dataIndex: 'information_ratio',
        key: 'information_ratio',
        sorter: (a: any, b: any) => a.information_ratio - b.information_ratio,
        render: (item: any) => Number(item).toFixed(2),
      },
      {
        title: '最大回撤',
        dataIndex: 'max_drawdown',
        key: 'max_drawdown',
        sorter: (a: any, b: any) => a.max_drawdown - b.max_drawdown,
        render: (item: any) => Number(Number(item) * 100).toFixed(2) + '%',
      },
    ];
    const cols2 = [
      {
        title: '模型名称',
        dataIndex: 'name',
        key: 'name',
        render: (item: string) => {
          return (
            <ImagePreviewer
              text={`${intlMap.get(item)}(${item})`}
              url={`model_png/plot_${item}_score_${numOfMonths}${strategyPath}.png`}
            />
          );
        },
      },
      {
        title: '信息系数(original)',
        dataIndex: 'IC',
        key: 'IC',
        sorter: (a: any, b: any) => a.IC - b.IC,
        render: (item: any) => Number(item).toFixed(3),
      },
      {
        title: '信息标准差(original)',
        dataIndex: 'ICIR',
        key: 'ICIR',
        sorter: (a: any, b: any) => a.ICIR - b.ICIR,
        render: (item: any) => Number(item).toFixed(3),
      },
      {
        title: '信息系数(Gradient Based)',
        dataIndex: 'IC_incre',
        key: 'IC_incre',
        sorter: (a: any, b: any) => a.IC_incre - b.IC_incre,
        render: (item: any) => Number(item).toFixed(3),
      },
      {
        title: '信息标准差(Gradient Based)',
        dataIndex: 'ICIR_incre',
        key: 'ICIR_incre',
        sorter: (a: any, b: any) => a.ICIR_incre - b.ICIR_incre,
        render: (item: any) => Number(item).toFixed(3),
      },
      {
        title: '信息系数(DoubleAdapt)',
        dataIndex: 'IC_DA',
        key: 'IC_DA',
        sorter: (a: any, b: any) => a.IC_DA - b.IC_DA,
        render: (item: any) => Number(item).toFixed(3),
      },
      {
        title: '信息标准差(DoubleAdapt)',
        dataIndex: 'ICIR_DA',
        key: 'ICIR_DA',
        sorter: (a: any, b: any) => a.ICIR_DA - b.ICIR_DA,
        render: (item: any) => Number(item).toFixed(3),
      },
    ];
    return actionType === 'get_update_data' ? cols2 : cols1;
  }, [actionType, duration, strategy]);

  const onSearch = () => {
    form.validateFields().then(async (values) => {
      const params = {
        ...values,
      };
      setActionType(params.actionType);
      setDuration(params.duration);
      setStrategy(params.strategy);
      setLoading(true);
      const res = await axios.get(
        `http://47.106.95.15:8000/${values.actionType}/`,
        {
          params: {
            duration: params.duration,
            strategy: params.strategy,
            stock: params.stock,
          },
        },
      );
      const d = res.data.data.map((item: { [x: string]: any }) => {
        const key = Object.keys(item)[0];
        const val = item[key];
        return {
          name: key,
          ...val,
        };
      });
      setData(d);
      setLoading(false);
    });
  };
  const onReset = () => {
    form.resetFields();
    onSearch();
  };

  useEffect(() => {
    onSearch();
  }, []);

  const onFieldsChange = (__: any, allFields: any) => {
    // 策略变换时csi300
    if (allFields[1].value === 'csi300') {
      setIsCSI300(true);
      form.setFieldValue('strategy', 'top30');
    } else {
      setIsCSI300(false);
      form.setFieldValue('strategy', 'top5');
    }
    // actionType变化时
    if (allFields[0].value === 'get_update_data') {
      setIsUpdate(true);
      form.setFieldValue('stock', 'csi300');
      setIsCSI300(true);
      form.setFieldValue('strategy', 'top30');
    } else {
      setIsUpdate(false);
    }
  };

  return (
    <BasicLayout backgroundColor="#f5f5f5">
      <Card title="模型看板" style={{ marginBottom: '20px' }}>
        <Form form={form} {...layout} onFieldsChange={onFieldsChange}>
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
          <Form.Item
            label="股票池"
            name="stock"
            initialValue={'csi300'}
            help={
              isUpdate &&
              'Gradient Based增量更新方法相较于全量更新速度提高60%,DoubleAdapt增量更新方法相较于全量更新速度提高200%'
            }
          >
            <Radio.Group>
              <Radio value="csi300">沪深300</Radio>
              {!isUpdate && (
                <>
                  <Radio value="dianzi">
                    电子(25支)
                    <Tooltip title="'SH600460', 'SZ002049', 'SH688008', 'SZ300223', 'SH603986', 'SH603501', 'SZ300661', 'SZ300782', 'SH603160', 'SH600584', 'SZ002371', 'SH688012', 'SZ002916', 'SZ002938', 'SH600183', 'SZ300408', 'SZ000100', 'SZ000725', 'SH688036', 'SH600745', 'SZ002475', 'SZ002600', 'SZ002241', 'SZ300433', 'SH601138'">
                      <QuestionCircleOutlined style={{ fontSize: 10 }} />
                    </Tooltip>
                  </Radio>
                  <Radio value="yiyaoshengwu">
                    医药生物(26支)
                    <Tooltip title="'SZ002001', 'SH600276', 'SH600196', 'SZ000963', 'SH600332', 'SH600085', 'SZ000538', 'SH600436', 'SZ002007', 'SH600161', 'SZ002252', 'SZ300122', 'SZ300142', 'SZ300601', 'SZ000661', 'SZ300760', 'SZ300595', 'SZ300529', 'SZ300003', 'SH603882', 'SZ300347', 'SH603259', 'SZ002821', 'SZ300759', 'SH600763', 'SZ300015'">
                      <QuestionCircleOutlined style={{ fontSize: 10 }} />
                    </Tooltip>
                  </Radio>
                  <Radio value="yinhang">
                    银行(19支)
                    <Tooltip title="'SH601398', 'SH601288', 'SH601328', 'SH600000', 'SH600016', 'SH600036', 'SH601166', 'SH601818', 'SH600015', 'SH601998', 'SH601916', 'SZ000001', 'SH601169', 'SH601009', 'SH600919', 'SZ002142', 'SH601229', 'SH600926', 'SH601838'">
                      <QuestionCircleOutlined style={{ fontSize: 10 }} />
                    </Tooltip>
                  </Radio>
                  <Radio value="feiyinjinrong">
                    非银金融(23支)
                    <Tooltip title="'SZ300059', 'SH601788', 'SH601688', 'SH600030', 'SZ002736', 'SZ000166', 'SH601901', 'SH601878', 'SH601066', 'SH601236', 'SH600958', 'SH600999', 'SH601377', 'SH601881', 'SH601211', 'SZ000776', 'SH600837', 'SH601336', 'SH601601', 'SH601318', 'SH601319', 'SH601628', 'SH600061'">
                      <QuestionCircleOutlined style={{ fontSize: 10 }} />
                    </Tooltip>
                  </Radio>
                  <Radio value="dianlishebei">
                    电力设备(24支)
                    <Tooltip title="'SH600438', 'SZ002129', 'SH601012', 'SZ002459', 'SZ300763', 'SZ300274', 'SH603806', 'SH601865', 'SZ300316', 'SH603185', 'SZ300751', 'SZ002202', 'SZ300014', 'SZ300750', 'SZ300207', 'SZ002074', 'SH603659', 'SZ002709', 'SZ002812', 'SH688005', 'SZ300450', 'SH600089', 'SH601877', 'SH600406'">
                      <QuestionCircleOutlined style={{ fontSize: 10 }} />
                    </Tooltip>
                  </Radio>
                  <Radio value="jisuanji">
                    计算机(15支)
                    <Tooltip title="'SZ002236', 'SZ002415', 'SZ000066', 'SH603019', 'SZ000977', 'SZ000938', 'SZ300496', 'SH600845', 'SH600570', 'SZ002410', 'SZ300033', 'SZ300454', 'SH688111', 'SZ002230', 'SH600588'">
                      <QuestionCircleOutlined style={{ fontSize: 10 }} />
                    </Tooltip>
                  </Radio>
                </>
              )}
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
          <Form.Item
            label="策略"
            name="strategy"
            initialValue={'top30'}
            help="手续费1.5‱"
          >
            <Radio.Group>
              <Radio value="top5" disabled={isCSI300}>
                Top5多头策略
                <Tooltip title="【行业专属】每日买入推荐的top5股票">
                  <QuestionCircleOutlined style={{ fontSize: 10 }} />
                </Tooltip>
              </Radio>
              <Radio value="top30" disabled={!isCSI300}>
                Top30多头策略
                <Tooltip title="买入每日推荐前30只股票，且每日至少换手五只股票">
                  <QuestionCircleOutlined style={{ fontSize: 10 }} />
                </Tooltip>
              </Radio>
              <Radio value="top50" disabled={!isCSI300}>
                Top50多头策略
                <Tooltip title="每日买入推荐的top50股票，不强制换手">
                  <QuestionCircleOutlined style={{ fontSize: 10 }} />
                </Tooltip>
              </Radio>
              <Radio value="top100" disabled={!isCSI300}>
                Top100多头策略
                <Tooltip title="每日买入推荐的top100股票，不强制换手">
                  <QuestionCircleOutlined style={{ fontSize: 10 }} />
                </Tooltip>
              </Radio>
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
      <Card title="沪深300指数" style={{ marginBottom: '20px' }}>
        <Descriptions>
          <Descriptions.Item label="超额年化利率">
            {Number(csi300[duration].annualized_return * 100).toFixed(2) + '%'}
          </Descriptions.Item>
          <Descriptions.Item label="信息比率">
            {Number(csi300[duration].information_ratio * 100).toFixed(2) + '%'}
          </Descriptions.Item>
          <Descriptions.Item label="最大回撤">
            {Number(csi300[duration].max_drawdown * 100).toFixed(2) + '%'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
      />
    </BasicLayout>
  );
};

export default FinKGUpdate;
