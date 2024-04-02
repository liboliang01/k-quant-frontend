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
  Statistic,
  Table,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BasicLayout from '../../layout/BasicLayout';
import DoubleAxiasBarChart from './doubleAxiasBarChart';
import styles from './index.less';
import LineChart from './lineChart';

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
  // ['ensemble_no_retrain', '多模型重采样融合'],
  ['ensemble_retrain', '多模型重采样融合'],
  // ['Perfomance_based_ensemble', '多模型重采样融合3'],
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
  const [modelList, setModelList] = useState<any[]>([]);
  const [currModel, setCurrModel] = useState<string>();
  const [currModelList, setCurrModelList] = useState<string[]>([]);
  const [graphDataList, setGraphDataList] = useState<{
    data: any[];
    volume: any[];
  }>();
  const [multiGraphDataList, setMultiGraphDataList] = useState<{
    data: any[];
    volume: any[];
  }>();
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
          return (
            <div>{`${flag ? '【知识图谱输入】' : ''}${intlMap.get(
              item,
            )}(${item})`}</div>
          );
        },
        // render: (item: string) => {
        //   const list = ['HIST', 'RSR_hidy_is', 'KEnhance'];
        //   const flag = list.indexOf(item) >= 0;
        //   const stock = form.getFieldValue('stock');
        //   return (
        //     <ImagePreviewer
        //       text={`${flag ? '【知识图谱输入】' : ''}${intlMap.get(
        //         item,
        //       )}(${item})`}
        //       url={
        //         isCSI300
        //           ? `model_png/plot_${item}_score_${numOfMonths}${strategyPath}.png`
        //           : `model_png/plot_${item}_score_${numOfMonths}_${stock}.png`
        //       }
        //     />
        //   );
        // },
      },
      {
        title: '信息系数(IC)',
        dataIndex: 'IC',
        key: 'IC',
        sorter: (a: any, b: any) => a.IC - b.IC,
        render: (item: any) => Number(item).toFixed(3),
      },
      {
        title: '信息比率(ICIR)',
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
      // {
      //   title: '信息比率',
      //   dataIndex: 'information_ratio',
      //   key: 'information_ratio',
      //   sorter: (a: any, b: any) => a.information_ratio - b.information_ratio,
      //   render: (item: any) => Number(item).toFixed(2),
      // },
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
          return <div>{`${intlMap.get(item)}(${item})`}</div>;
        },
        // render: (item: string) => {
        //   return (
        //     <ImagePreviewer
        //       text={`${intlMap.get(item)}(${item})`}
        //       url={`model_png/plot_${item}_score_${numOfMonths}${strategyPath}.png`}
        //     />
        //   );
        // },
      },
      {
        title: '信息系数(Rank IC)[original]',
        dataIndex: 'IC',
        key: 'IC',
        sorter: (a: any, b: any) => a.IC - b.IC,
        render: (item: any) => Number(item).toFixed(3),
      },
      {
        title: '信息比率(Rank ICIR)[original]',
        dataIndex: 'ICIR',
        key: 'ICIR',
        sorter: (a: any, b: any) => a.ICIR - b.ICIR,
        render: (item: any) => Number(item).toFixed(3),
      },
      {
        title: '信息系数(Rank IC)[Gradient Based]',
        dataIndex: 'IC_incre',
        key: 'IC_incre',
        sorter: (a: any, b: any) => a.IC_incre - b.IC_incre,
        render: (item: any) => Number(item).toFixed(3),
      },
      {
        title: '信息比率(Rank ICIR)[Gradient Based]',
        dataIndex: 'ICIR_incre',
        key: 'ICIR_incre',
        sorter: (a: any, b: any) => a.ICIR_incre - b.ICIR_incre,
        render: (item: any) => Number(item).toFixed(3),
      },
      {
        title: '信息系数(Rank IC)[DoubleAdapt]',
        dataIndex: 'IC_DA',
        key: 'IC_DA',
        sorter: (a: any, b: any) => a.IC_DA - b.IC_DA,
        render: (item: any) => Number(item).toFixed(3),
      },
      {
        title: '信息比率(Rank ICIR)[DoubleAdapt]',
        dataIndex: 'ICIR_DA',
        key: 'ICIR_DA',
        sorter: (a: any, b: any) => a.ICIR_DA - b.ICIR_DA,
        render: (item: any) => Number(item).toFixed(3),
      },
    ];
    return actionType === 'get_update_data' ? cols2 : cols1;
  }, [actionType, duration, strategy, currModel]);

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
      let d = res.data.data.map((item: { [x: string]: any }) => {
        let key = Object.keys(item)[0];
        const val = item[key];
        // 删除ensemble_retrain和Perfomance_based_ensemble
        if (key === 'ensemble_retrain' || key === 'Perfomance_based_ensemble') {
          return 'delete';
        }
        // 将ensemble_no_retrain改名为ensemble_retrain
        if (key === 'ensemble_no_retrain') {
          key = 'ensemble_retrain';
        }
        return {
          name: key,
          ...val,
        };
      });
      d = d.filter((item: any) => item !== 'delete');
      d = d.map((item: any) => ({ ...item, key: item.name }));
      setData(d);
      // console.log(d)
      const ml = d.map((item: { name: any }) => ({
        value: item.name,
        label: `${intlMap.get(item.name)}(${item.name})`,
      }));
      setModelList(ml);
      setCurrModel(ml[0].value);
      setCurrModelList([ml[0].value]);
      getMultiGraphData(
        values.actionType,
        params.duration,
        params.strategy,
        params.stock,
        [ml[0].value],
      );
      setLoading(false);
    });
  };
  const onReset = () => {
    form.resetFields();
    setIsCSI300(true);
    setIsUpdate(false);
    onSearch();
  };

  useEffect(() => {
    onSearch();
  }, []);

  const onFieldsChange = (change: any) => {
    // 股票变换时csi300
    if (change[0].name.indexOf('stock') >= 0) {
      if (change[0].value === 'csi300') {
        setIsCSI300(true);
        form.setFieldValue('strategy', 'top30');
      } else {
        setIsCSI300(false);
        form.setFieldValue('strategy', 'top5');
      }
    }
    // actionType变化时
    if (change[0].name.indexOf('actionType') >= 0) {
      if (change[0].value === 'get_update_data') {
        setIsUpdate(true);
        form.setFieldValue('stock', 'csi300');
        setIsCSI300(true);
        form.setFieldValue('strategy', 'top30');
      } else {
        setIsUpdate(false);
      }
    }
  };

  const onModelChange = (value: string) => {
    setCurrModel(value);
    form.validateFields().then((values) => {
      getGraphData(
        values.actionType,
        values.duration,
        values.strategy,
        values.stock,
        value,
      );
    });
  };

  const onModelChangeNew = (value: string[]) => {
    setCurrModelList(value);
    form.validateFields().then((values) => {
      getMultiGraphData(
        values.actionType,
        values.duration,
        values.strategy,
        values.stock,
        value,
      );
    });
  };

  const actionMap = {
    get_model_data: 0,
    get_rensemble_data: 1,
    get_update_data: 2,
  };
  const durationMap = { THERE_MONTH: 3, SIX_MONTH: 6, ONE_YEAR: 12 };
  const strategyMap = { top5: 0, top30: 1, top50: 2, top100: 3 };

  const getGraphData = async (
    actionType: keyof typeof actionMap,
    duration: keyof typeof durationMap,
    strategy: keyof typeof strategyMap,
    stock: string,
    model: string,
  ) => {
    const res = await axios.get(`http://47.106.95.15:8000/get_graph_data/`, {
      params: {
        duration: durationMap[duration],
        strategy: strategyMap[strategy],
        action: actionMap[actionType],
        stock,
        model,
      },
    });
    setGraphDataList(res.data.data);
  };

  const getMultiGraphData = async (
    actionType: keyof typeof actionMap,
    duration: keyof typeof durationMap,
    strategy: keyof typeof strategyMap,
    stock: string,
    modelList: string[],
  ) => {
    if(modelList.length===0){
      return 
    }
    const res = await axios.get(
      `http://47.106.95.15:8000/get_multi_graph_data/`,
      {
        params: {
          duration: durationMap[duration],
          strategy: strategyMap[strategy],
          action: actionMap[actionType],
          stock,
          model_list: modelList.join(','),
        },
      },
    );
    // console.log(res);
    setMultiGraphDataList(res.data.data);
    // setGraphDataList(res.data.data);
  };

  const currRate = useMemo(() => {
    if (data.length && currModel) {
      const curr = data.filter((item) => item.name === currModel)[0];
      return curr;
    }
    return {};
  }, [data, currModel]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      onModelChangeNew(selectedRowKeys as string[]);
    },
    selectedRowKeys: currModelList,
    type: 'checkbox' as 'checkbox' | 'radio',
  };

  const startEndTime: [string, string] = useMemo(() => {
    switch (duration) {
      case 'THERE_MONTH':
        return ['2023-04-03', '2023-06-30'];
      case 'SIX_MONTH':
        return ['2023-01-03', '2023-06-30'];
      case 'ONE_YEAR':
        return ['2022-06-01', '2023-06-30'];
      default:
        return ['', ''];
    }
  }, [duration]);

  const get_multi_graph_data = useCallback(() => {}, []);

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
          <Form.Item label="股票池" name="stock" initialValue={'csi300'}>
            <Radio.Group>
              <Radio value="csi300">沪深300</Radio>
              {!isUpdate && (
                <>
                  <Radio value="dianzi">
                    电子(25支)
                    <Tooltip title="['士兰微(SH600460)', '紫光国微(SZ002049)', '澜起科技(SH688008)', '北京君正(SZ300223)', '兆易创新(SH603986)', '韦尔股份(SH603501)', '圣邦股份(SZ300661)', '卓胜微(SZ300782)', '汇顶科技(SH603160)', '长电科技(SH600584)', '北方华创(SZ002371)', '中微公司(SH688012)', '深南电路(SZ002916)', '鹏鼎控股(SZ002938)', '生益科技(SH600183)', '三环集团(SZ300408)', 'TCL科技(SZ000100)', '京东方A(SZ000725)', '传音控股(SH688036)', '闻泰科技(SH600745)', '立讯精密(SZ002475)', '领益智造(SZ002600)', '歌尔股份(SZ002241)', '蓝思科技(SZ300433)', '工业富联(SH601138)']">
                      <QuestionCircleOutlined style={{ fontSize: 10 }} />
                    </Tooltip>
                  </Radio>
                  <Radio value="yiyaoshengwu">
                    医药生物(26支)
                    <Tooltip title="['新和成(SZ002001)', '恒瑞医药(SH600276)', '复星医药(SH600196)', '华东医药(SZ000963)', '白云山(SH600332)', '同仁堂(SH600085)', '云南白药(SZ000538)', '片仔癀(SH600436)', '华兰生物(SZ002007)', '天坛生物(SH600161)', '上海莱士(SZ002252)', '智飞生物(SZ300122)', '沃森生物(SZ300142)', '康泰生物(SZ300601)', '长春高新(SZ000661)', '迈瑞医疗(SZ300760)', '欧普康视(SZ300595)', '健帆生物(SZ300529)', '乐普医疗(SZ300003)', '金域医学(SH603882)', '泰格医药(SZ300347)', '药明康德(SH603259)', '凯莱英(SZ002821)', '康龙化成(SZ300759)', '通策医疗(SH600763)', '爱尔眼科(SZ300015)']">
                      <QuestionCircleOutlined style={{ fontSize: 10 }} />
                    </Tooltip>
                  </Radio>
                  <Radio value="yinhang">
                    银行(19支)
                    <Tooltip title="['工商银行(SH601398)', '农业银行(SH601288)', '交通银行(SH601328)', '浦发银行(SH600000)', '民生银行(SH600016)', '招商银行(SH600036)', '兴业银行(SH601166)', '光大银行(SH601818)', '华夏银行(SH600015)', '中信银行(SH601998)', '浙商银行(SH601916)', '平安银行(SZ000001)', '北京银行(SH601169)', '南京银行(SH601009)', '江苏银行(SH600919)', '宁波银行(SZ002142)', '上海银行(SH601229)', '杭州银行(SH600926)', '成都银行(SH601838)']">
                      <QuestionCircleOutlined style={{ fontSize: 10 }} />
                    </Tooltip>
                  </Radio>
                  <Radio value="feiyinjinrong">
                    非银金融(23支)
                    <Tooltip title="['东方财富(SZ300059)', '光大证券(SH601788)', '华泰证券(SH601688)', '中信证券(SH600030)', '国信证券(SZ002736)', '申万宏源(SZ000166)', '方正证券(SH601901)', '浙商证券(SH601878)', '中信建投(SH601066)', '红塔证券(SH601236)', '东方证券(SH600958)', '招商证券(SH600999)', '兴业证券(SH601377)', '中国银河(SH601881)', '国泰君安(SH601211)', '广发证券(SZ000776)', '海通证券(SH600837)', '新华保险(SH601336)', '中国太保(SH601601)', '中国平安(SH601318)', '中国人保(SH601319)', '中国人寿(SH601628)', '国投资本(SH600061)']">
                      <QuestionCircleOutlined style={{ fontSize: 10 }} />
                    </Tooltip>
                  </Radio>
                  <Radio value="dianlishebei">
                    电力设备(24支)
                    <Tooltip title="['通威股份(SH600438)', '中环股份(SZ002129)', '隆基股份(SH601012)', '晶澳科技(SZ002459)', '锦浪科技(SZ300763)', '阳光电源(SZ300274)', '福斯特(SH603806)', '福莱特(SH601865)', '晶盛机电(SZ300316)', '上机数控(SH603185)', '迈为股份(SZ300751)', '金风科技(SZ002202)', '亿纬锂能(SZ300014)', '宁德时代(SZ300750)', '欣旺达(SZ300207)', '国轩高科(SZ002074)', '璞泰来(SH603659)', '天赐材料(SZ002709)', '恩捷股份(SZ002812)', '容百科技(SH688005)', '先导智能(SZ300450)', '特变电工(SH600089)', '正泰电器(SH601877)', '国电南瑞(SH600406)']">
                      <QuestionCircleOutlined style={{ fontSize: 10 }} />
                    </Tooltip>
                  </Radio>
                  <Radio value="jisuanji">
                    计算机(15支)
                    <Tooltip title="['大华股份(SZ002236)', '海康威视(SZ002415)', '中国长城(SZ000066)', '中科曙光(SH603019)', '浪潮信息(SZ000977)', '紫光股份(SZ000938)', '中科创达(SZ300496)', '宝信软件(SH600845)', '恒生电子(SH600570)', '广联达(SZ002410)', '同花顺(SZ300033)', '深信服(SZ300454)', '金山办公(SH688111)', '科大讯飞(SZ002230)', '用友网络(SH600588)']">
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
            help={
              <div>
                <div>手续费1.5‱</div>
                <div>
                  {isUpdate && (
                    <div style={{ color: 'black' }}>
                      Gradient Based增量更新方法相较于全量更新速度提高
                      <span style={{ fontWeight: 'bold' }}>60%</span>
                      ,DoubleAdapt增量更新方法相较于全量更新速度提高
                      <span style={{ fontWeight: 'bold' }}>200%</span>
                    </div>
                  )}
                </div>
              </div>
            }
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
        rowSelection={rowSelection}
        // onRow={(record) => {
        //   return {
        //     onDoubleClick: () => {
        //       onModelChange(record.name);
        //     },
        //   };
        // }}
      />
      {modelList.length &&
        multiGraphDataList?.data.length &&
        currModelList.length > 0 && (
          <Card style={{ margin: '20px 0', padding: '0 0 20px 0' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <div className={styles.title}>{`${String(
                strategy,
              ).toUpperCase()}多头策略在${startEndTime[0]}至${
                startEndTime[1]
              }的回测累积收益曲线`}</div>
              {/* <Select
              defaultActiveFirstOption={true}
              value={currModel}
              onChange={onModelChange}
              style={{ width: 400 }}
              options={modelList}
            /> */}
            </div>
            <LineChart data={multiGraphDataList} modelList={currModelList} />

            {actionType === 'get_update_data' ? (
              <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col span={6}>
                  <Statistic
                    title="信息系数（Rank IC）[original]"
                    value={Number(currRate['IC']).toFixed(3)}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="信息比率（Rank ICIR）[original]"
                    value={Number(currRate['ICIR']).toFixed(3)}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="信息系数（Rank IC）[DoubleAdapt]"
                    value={Number(currRate['IC_DA']).toFixed(3)}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="信息比率（Rank ICIR）[DoubleAdapt]"
                    value={Number(currRate['ICIR_DA']).toFixed(3)}
                  />
                </Col>
              </Row>
            ) : (
              <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col span={6}>
                  <Statistic
                    title="信息系数（Rank IC）"
                    value={Number(currRate['IC']).toFixed(3)}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="信息比率（Rank ICIR）"
                    value={Number(currRate['ICIR']).toFixed(3)}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="超额年化利率"
                    value={
                      Number(
                        Number(currRate['annualized_return']) * 100,
                      ).toFixed(2) + '%'
                    }
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="最大回撤"
                    value={
                      Number(Number(currRate['max_drawdown']) * 100).toFixed(
                        2,
                      ) + '%'
                    }
                  />
                </Col>
              </Row>
            )}
          </Card>
        )}
      <Card
        style={{ marginBottom: '20px', padding: '0 0 30px 0' }}
        title="模型对比图"
      >
        {/* <BarCharts data={data} /> */}
        <DoubleAxiasBarChart tableData={data} isUpdate={isUpdate} />
      </Card>
    </BasicLayout>
  );
};

export default FinKGUpdate;
