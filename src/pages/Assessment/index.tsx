import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Image,
  List,
  Radio,
  Row,
  Space,
  Tree,
  Typography,
} from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import BasicLayout from '../../layout/BasicLayout';
import companyName from '../Explainer/company_full_name.json';
import CredibilityRadarChart from './credibilityRadarChart';
import styles from './index.less';
import Indicator from './indicator';
import input_mock_data from './inputGradientExplainer_result.json';
import InvestModal from './investModal';
import InvestRadarChart from './investRadarChart';
import recommend_mock_data from './recommend_result_new.json';
import StockModal from './stockModal.tsx';
import xpath_mock_data from './xpathExplainer_result.json';
const { Title, Paragraph } = Typography;

const model_list = ['LSTM', 'GRU', 'MLP', 'NRSR', 'relation_GATs'];
const explanation_list = ['inputGradientExplainer', 'xpathExplainer'];
const explanation_model = 'inputGradientExplainer';

const { RangePicker } = DatePicker;

const select_dict_list = [
  {
    '600061.SH': 0.1,
    '601009.SH': 0.2,
    '601066.SH': 0.1,
    '600519.SH': 0.3,
    '600606.SH': 0.3,
  },
  {
    '600061.SH': 0.2,
    '601009.SH': 0.2,
    '600887.SH': 0.4,
    '600132.SH': 0.2,
  },
  {
    '600010.SH': 0.8,
    '600132.SH': 0.1,
    '600489.SH': 0.1,
  },
  {
    '600760.SH': 0.3,
    '600000.SH': 0.2,
    '600600.SH': 0.2,
    '601088.SH': 0.3,
  },
  {
    '600837.SH': 0.7,
    '601009.SH': 0.2,
    '601066.SH': 0.1,
  },
  {
    '601009.SH': 0.1,
    '601066.SH': 0.5,
    '600132.SH': 0.4,
  },
];

const indicator1 = {
  可靠性:
    '评价量化投资模型的预测准确程度。模型选择时间段内预测结果与真实结果的平均差异。',

  稳定性:
    '评价量化投资模型在规定时间内提供持续可靠服务的程度。模型选择时间段内预测结果与真实结果差异的方差。',

  鲁棒性: '评价量化投资模型在面对异常情况时保持正常运行的能力。',

  透明性:
    '评价量化投资模型内部运行机制是否透明。量化投资模型中的任一模块使用了如如下任意一款模型，如线性回归、逻辑回归、GLM、决策树、决策规则、KNN等被认为是自带可解释的模型，透明性输出为1，不透明则输出为0。',

  可解释性:
    '评价模型组合解释能力的指标。用解释模型的输出结果可以保留多少决策信息来衡量模型组合的可解释性能力。',
};

const indicator2 = {
  用户收益偏好: '对投资策略是否满足用户的收益偏好进行打分。',

  用户风险偏好: '对投资策略是否满足用户的风险偏好进行打分。',

  用户投资体验感: '对投资策略的最大回撤率是否小于风险偏好进行打分。',

  沪深300指数对比得分:
    'Log(投资组合夏普比率 - 沪深300夏普比率 + 1)（夏普比率）对投资策略相较无风险投资的超额回报率是否“跑赢”市场指数或基准进行打分。（信息比率）对投资策略相较市场指数或基准的超额回报率进行计算和展示，暂不进行打分。',

  中证500指数对比得分:
    'Log(投资组合夏普比率 - 沪深300夏普比率 + 1)（夏普比率）对投资策略相较无风险投资的超额回报率是否“跑赢”市场指数或基准进行打分。（信息比率）对投资策略相较市场指数或基准的超额回报率进行计算和展示，暂不进行打分。',

  业绩基准:
    'Log(投资组合夏普比率 - 业绩基准夏普比率 + 1)（夏普比率）对投资策略相较无风险投资的超额回报率是否“跑赢”市场指数或基准进行打分。（信息比率）对投资策略相较市场指数或基准的超额回报率进行计算和展示，暂不进行打分。',

  同行业股票表现对比:
    '对所选股票在近一个月、两个月、三个月、四个月、六个月、九个月、一年等的年化收益率、年化波动率是否处于同类股票的top n%进行打分。（注:时间值可以在函数内部自定义，且只考虑交易日数为最佳）',
};

const Assessment: React.FC = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();
  const [form4Data, setForm4Data] = useState<any>({});
  const [candleList, setCandleList] = useState<any[]>([]);
  const [candleLoading, setCandleLoading] = useState<boolean>(false);
  const [explainer, setExplainer] = useState('inputGradient');
  const [currentModel, setCurrentModel] = useState('NRSR');
  const [scoreList, setScoreList] = useState([]);
  const [stockList, setStockList] = useState({});
  const [stock, setStock] = useState({});
  const [stockRecommendList, setStockRecommendList] = useState([]);
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };
  const credibility_assessment_initial_data = [
    {
      date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
      explanation_model: 'inputGradientExplainer',
      prediction_model: 'LSTM',
      seq_len: 30,
    },
    {
      date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
      explanation_model: 'inputGradientExplainer',
      prediction_model: 'GRU',
      seq_len: 30,
    },
    {
      date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
      explanation_model: 'inputGradientExplainer',
      prediction_model: 'MLP',
      seq_len: 30,
    },
    {
      date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
      explanation_model: 'inputGradientExplainer',
      prediction_model: 'NRSR',
      seq_len: 30,
    },
    {
      date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
      explanation_model: 'inputGradientExplainer',
      prediction_model: 'relation_GATs',
      seq_len: 30,
    },
  ];
  const model_pairs = {
    without_k: ['LSTM', 'GRU', 'MLP'],
    with_k: ['NRSR', 'relation_GATs'],
  };
  const stock_recommend = {
    date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
    explanation_model: 'inputGradientExplainer',
    prediction_model: 'NRSR',
    seq_len: 30,
    num_recommendation_stocks: 3,
  };
  const invest_initial_data = {
    duration: 'three_month',
    return_preference: '1',
    risk_preference: '60',
  };

  const invest_comb_data = select_dict_list.map((item) => {
    const keys = Object.keys(item);
    return {
      list: keys.map((key) => {
        const code = key.split('.');
        const stock = String(code[1]) + String(code[0]);
        return {
          stockName: stock,
          number: item[key],
        };
      }),
    };
  });

  const setFieldsValue = (value: any) => {
    form.setFieldsValue(value);
  };
  const setFieldsValue2 = (value: any) => {
    form2.setFieldsValue(value);
  };

  const setFieldsValue3 = (value: any) => {
    form3.setFieldsValue(value);
  };

  const setFieldsValue4 = (value: any) => {
    form4.setFieldsValue(value);
    setOutPre(value);
  };

  const setOutPre = (value: any) => {
    const data = value.select_dict_list.map((item: any, idx: number) => {
      const list = item.list;
      const obj: any = {};
      list.forEach((s: any) => {
        const key = `${s['stockName']}(${stockNameMap.get(
          s['stockName'].substring(2, 8),
        )})`;
        obj[key] = s['number'];
      });
      const name = `投资组合${idx + 1}`;
      const res: any = {};
      res[name] = obj;
      return res;
    });
    setForm4Data(data);
  };

  const get_candle_data = async (stockList) => {
    console.log('stock_list', stockList);
    setStock(stockList);
    const res: any[] = [];
    for (let item of stockList) {
      const r = await axios.get(
        `http://47.106.95.15:8000/get_pic_data/?stock=${item.substring(
          0,
          6,
        )}&date=2024-06-28`,
      );
      res.push(r.data);
    }
    console.log('candle', res);
    setCandleList(res);
  };
  useEffect(() => {
    setFieldsValue({
      credibility_assessment: credibility_assessment_initial_data,
      date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
      seq_len: '15',
      duration: 'three_month',
      explainer: 'inputGradient',
    });
    setFieldsValue2(stock_recommend);
    setFieldsValue3(invest_initial_data);
    setFieldsValue4({ select_dict_list: invest_comb_data });
    onSearch();
    chooseInvestGroup();
  }, []);
  const stockNameMap = useMemo(() => {
    const map = new Map();
    companyName.forEach((item) => {
      const code = item.code.split('.')[0];
      map.set(code, item.name);
    });
    return map;
  }, [companyName]);
  const layout = {
    labelCol: { span: 4 },
  };

  const onSearch = () => {
    form.validateFields().then(async (values) => {
      const params = {
        ...values,
      };
      setExplainer(params.explainer);
      const mock_data =
        params.explainer === 'inputGradient'
          ? input_mock_data
          : xpath_mock_data;
      const curr_data = mock_data[params.seq_len][params.duration];
      const curr_score = Object.keys(curr_data).map((item) => {
        return curr_data[item]['score'];
      });
      console.log('curr_data', curr_data);

      setScoreList(curr_score);
      setStockList(curr_data);
      setCandleLoading(true);
      get_candle_data(curr_data['KEnhance']['stocks']);
      setCandleLoading(false);
    });
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const treeData = useMemo(() => {
    if (!Array.isArray(form4Data)) {
      return [];
    }
    const tree = [];
    form4Data.forEach((item) => {
      const name = Object.keys(item)[0];
      const child = item[name];
      const temp = {
        key: name,
        title: name,
        children: [],
      };
      Object.keys(child).forEach((c) => {
        temp.children.push({
          key: `${name}-${c}-${child[c] * 100}%`,
          title: `${c}-${child[c] * 100}%`,
        });
      });
      tree.push(temp);
    });
    console.log(tree);
    return tree;
  }, [form4Data]);

  const chooseModel = (item) => {
    setCurrentModel(item);
    get_candle_data(stockList[item]['stocks']);
  };

  const chooseInvestGroup = () => {
    form3.validateFields().then(async (values) => {
      console.log(values);
      const risk = values.risk_preference;
      const return_preference = values.return_preference;
      const duration = values.duration;
      const mockData = recommend_mock_data[return_preference][risk][duration];
      const mockList = [];
      Array(6)
        .fill(0)
        .forEach((item, idx) => {
          mockList.push(mockData[String(idx + 1)].score);
        });
      console.log(mockList);
      setStockRecommendList(mockList);
    });
  };
  return (
    <BasicLayout backgroundColor="#f5f5f5">
      <>
        <Card
          style={{
            marginBottom: '20px',
            // textAlign: 'center',
            padding: '0 0 30px 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Title
              level={2}
              style={{ marginTop: 0, display: 'block', textAlign: 'center' }}
            >
              多角度智能量化投资模型的综合评价体系
            </Title>
            <Paragraph style={{ width: '400px' }}>
              <ul>
                <li>针对不同预测与解释模型的组合进行多维度性能评价</li>
                <li>针对不同投资组合进行表现评估</li>
              </ul>
            </Paragraph>

            <Image src={'images/assessment.png'} preview={false} />
          </div>
        </Card>

        <Card style={{ marginBottom: '20px' }} title={'生成模型组合'}>
          <Form form={form} {...layout}>
            <Form.Item
              label="时间段"
              name="duration"
              initialValue={'three_month'}
            >
              <Radio.Group>
                <Radio value="three_month">近10天</Radio>
                <Radio value="six_month">近20天</Radio>
                <Radio value="one_year">近30天</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="时间窗口" name="seq_len" initialValue={'15'}>
              <Radio.Group>
                <Radio value="15">15天</Radio>
                <Radio value="30">30天</Radio>
                <Radio value="60">60天</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="解释模型"
              name="explainer"
              initialValue={'inputGradient'}
            >
              <Radio.Group>
                <Radio value="inputGradient">inputGradient</Radio>
                <Radio value="xPath">xPath</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={4}></Col>
                <Col>
                  <Space>
                    <Button type="primary" onClick={onSearch}>
                      生成组合
                    </Button>
                    <Button onClick={() => {}}>重置</Button>
                  </Space>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Card>

        <Card style={{ marginBottom: '20px' }} title={'模型组合评价'}>
          <div className={styles.radar}>
            <CredibilityRadarChart
              id="credibility_radar_chart"
              rawData={scoreList}
            />
            <Indicator desc={indicator1} />
          </div>
        </Card>

        <Card style={{ marginBottom: '20px', paddingBottom: 20 }}>
          {/* <Divider orientation="left">未使用知识的模型组合</Divider> */}
          <Row>
            <Col span={6}>
              <div style={{ fontSize: 20 }}>未使用知识的模型组合:</div>
            </Col>
            <Col span={18}>
              <List
                bordered
                size={'small'}
                dataSource={model_pairs.without_k}
                renderItem={(item) => (
                  <List.Item style={{ width: '100%', display: 'block' }}>
                    <Row>
                      <Col span={8}>
                        <Typography.Text>[预测模型]:</Typography.Text> {item}
                      </Col>
                      <Col span={8}>
                        <Typography.Text>[解释模型]:</Typography.Text> 无
                      </Col>
                      <Col span={8}>
                        {stockList['GRU']!=undefined && (
                          <StockModal
                            modalName={item}
                            stockList={stockList[item]['stocks']}
                          />
                        )}

                        {/* <Button
                          size={'small'}
                          onClick={() => chooseModel(item)}
                        >
                          查看推荐股票
                        </Button> */}
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Col>
          </Row>

          <Divider />
          <Row>
            <Col span={6}>
              <div style={{ fontSize: 20 }}>使用知识的模型组合:</div>
            </Col>
            <Col span={18}>
              <List
                bordered
                size={'small'}
                dataSource={model_pairs.with_k}
                renderItem={(item) => (
                  <List.Item style={{ width: '100%', display: 'block' }}>
                    <Row>
                      <Col span={8}>
                        <Typography.Text>[预测模型]:</Typography.Text>{' '}
                        {item === 'NRSR' ? 'KEnhance' : item}
                      </Col>
                      <Col span={8}>
                        <Typography.Text mark>[解释模型]:</Typography.Text>
                        {explainer}
                      </Col>
                      <Col span={8}>
                      {stockList['KEnhance']!=undefined && (
                          <StockModal
                            modalName={item}
                            stockList={stockList[item === 'NRSR' ? 'KEnhance' : item]['stocks']}
                          />
                        )}
                        {/* <Button
                          size={'small'}
                          onClick={() => chooseModel(item)}
                        >
                          查看推荐股票
                        </Button> */}
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Card>

        {/* <Card
          style={{ marginBottom: '20px' }}
          title={`Top3 推荐股票 [${
            currentModel === 'NRSR' ? 'KEnhance' : currentModel
          }]`}
        >
          <Spin spinning={candleLoading}>
            {candleList.length !== 0 &&
              stock.map((item, idx) => {
                return (
                  <div key={item}>
                    <div className={styles.title}>{`${item}(${stockNameMap.get(
                      item.substring(0, 6),
                    )})`}</div>
                    <KChart rawData={candleList[idx]} id={`${item}-k-chart`} />
                  </div>
                );
              })}
          </Spin>
        </Card> */}

        <Card title={'投资组合评价'}>
          <Form
            name="invest_form"
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
            autoComplete="off"
            form={form3}
            // {...layout}
          >
            <Form.Item
              label="时间段"
              name="duration"
              initialValue={'three_month'}
            >
              <Radio.Group>
                <Radio value="three_month">近10天</Radio>
                <Radio value="six_month">近20天</Radio>
                <Radio value="one_year">近30天</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="回报偏好"
              name="return_preference"
              initialValue={'1'}
            >
              <Radio.Group>
                <Radio value="1">1%</Radio>
                <Radio value="5">5%</Radio>
                <Radio value="10">10%</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="风险偏好"
              name="risk_preference"
              initialValue={'60'}
            >
              <Radio.Group>
                <Radio value="60">60%</Radio>
                <Radio value="70">70%</Radio>
                <Radio value="80">80%</Radio>
              </Radio.Group>
            </Form.Item>
            <Space
              style={{
                display: 'flex',
                margin: '10px 0 20px 0',
                // height: 300,
                alignItems: 'flex-end',
              }}
              align="baseline"
            >
              <div>投资组合:</div>
              <Tree
                showLine
                defaultExpandAll={true}
                // defaultExpandedKeys={['投资组合 1']}
                onSelect={onSelect}
                treeData={treeData}
              />
              <InvestModal outForm={form4} setData={setOutPre} />
              <Button type="primary" onClick={chooseInvestGroup}>
                查询
              </Button>
            </Space>
          </Form>
          <div className={styles.radar}>
            <InvestRadarChart
              id="invest_radar_chart"
              rawData={stockRecommendList}
            />
            <Indicator desc={indicator2} />
          </div>
        </Card>
      </>
    </BasicLayout>
  );
};

export default Assessment;
