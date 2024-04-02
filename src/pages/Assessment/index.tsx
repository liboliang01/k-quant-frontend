import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  DatePicker,
  Form,
  InputNumber,
  Select,
  Space,
  Typography,
} from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import BasicLayout from '../../layout/BasicLayout';
import KChart from '../Explainer/KChart';
import companyName from '../Explainer/company_full_name.json';
import CredibilityRadarChart from './credibilityRadarChart';
import { credibility, invest, stock } from './data';
import styles from './index.less';
import Indicator from './indicator';
import InvestModal from './investModal';
import InvestRadarChart from './investRadarChart';

const model_list = ['LSTM', 'GRU', 'MLP', 'NRSR', 'relation_GATs'];
const explanation_list = ['inputGradientExplainer', 'xpathExplainer'];
const explanation_model = 'inputGradientExplainer';

const { RangePicker } = DatePicker;

const select_dict_list = [
  {
    '002460.SZ': 3,
  },
  {
    '600009.SH': 1,
  },
  {
    '600000.SH': 100,
  },
  {
    '600015.SH': 1,
  },
  {
    '600703.SH': 1,
  },
  {
    '300072.SZ': 1,
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
  const [candleList, setCandleList] = useState<any[]>();
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
    // {
    //   date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
    //   explanation_model: 'inputGradientExplainer',
    //   prediction_model: 'LSTM',
    //   seq_len: 60,
    // },
    // {
    //   date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
    //   explanation_model: 'inputGradientExplainer',
    //   prediction_model: 'GRU',
    //   seq_len: 60,
    // },
    // {
    //   date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
    //   explanation_model: 'inputGradientExplainer',
    //   prediction_model: 'MLP',
    //   seq_len: 60,
    // },
    // {
    //   date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
    //   explanation_model: 'inputGradientExplainer',
    //   prediction_model: 'NRSR',
    //   seq_len: 60,
    // },
    // {
    //   date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
    //   explanation_model: 'inputGradientExplainer',
    //   prediction_model: 'relation_GATs',
    //   seq_len: 60,
    // },
  ];
  const stock_recommend = {
    date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
    explanation_model: 'inputGradientExplainer',
    prediction_model: 'NRSR',
    seq_len: 30,
    num_recommendation_stocks: 3,
  };
  const invest_initial_data = {
    date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
    return_preference: 0,
    risk_preference: 90,
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

  const get_candle_data = async () => {
    const res: any[] = [];
    for (let item of stock) {
      const r = await axios.get(
        `http://47.106.95.15:8000/get_pic_data/?stock=${item.substring(
          0,
          6,
        )}&date=2019-06-15`,
      );
      res.push(r.data);
    }
    setCandleList(res);
  };
  useEffect(() => {
    setFieldsValue({
      credibility_assessment: credibility_assessment_initial_data,
      date: [dayjs('2019-06-01'), dayjs('2019-06-15')],
    });
    setFieldsValue2(stock_recommend);
    get_candle_data();
    setFieldsValue3(invest_initial_data);
    setFieldsValue4({ select_dict_list: invest_comb_data });
  }, []);
  const stockNameMap = useMemo(() => {
    const map = new Map();
    companyName.forEach((item) => {
      const code = item.code.split('.')[0];
      map.set(code, item.name);
    });
    return map;
  }, [companyName]);
  return (
    <BasicLayout backgroundColor="#f5f5f5">
      <>
        <Card style={{ marginBottom: '20px' }} title={'模型组合评价'}>
          <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              name={'date'}
              label="时间段"
              rules={[{ required: true, message: '请选择时间段' }]}
              style={{ position: 'absolute' }}
            >
              <RangePicker />
            </Form.Item>
            <Form.List name="credibility_assessment">
              {(fields, { add, remove }) => (
                <>
                  <Form.Item
                    style={{
                      marginBottom: 10,
                      marginLeft: 400,
                    }}
                  >
                    <Space
                      style={{
                        display: 'flex',
                        width: '100%',
                      }}
                      align="baseline"
                    >
                      <Button
                        type="dashed"
                        style={{ display: 'block', width: '100%' }}
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加模型组合
                      </Button>
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                    </Space>
                  </Form.Item>

                  {fields.map(({ key, name, ...restField }) => {
                    return (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: -25 }}
                        align="baseline"
                      >
                        <div>{`组合${key + 1}`}</div>
                        <Form.Item
                          {...restField}
                          name={[name, 'prediction_model']}
                          label="预测模型"
                          rules={[
                            { required: true, message: '请选择预测模型' },
                          ]}
                        >
                          <Select
                            placeholder="请选择预测模型"
                            style={{ width: 200 }}
                            size="small"
                          >
                            {model_list.map((item) => {
                              return (
                                <Select.Option key={item} name={item}>
                                  {item}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'explanation_model']}
                          label="解释模型"
                          rules={[
                            { required: true, message: '请选择解释模型' },
                          ]}
                        >
                          <Select
                            placeholder="请选择解释模型"
                            style={{ width: 200 }}
                            size="small"
                          >
                            {explanation_list.map((item) => {
                              return (
                                <Select.Option key={item} name={item}>
                                  {item}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'seq_len']}
                          label="时间窗口"
                          rules={[
                            { required: true, message: '请输入时间窗口' },
                          ]}
                        >
                          <InputNumber
                            addonAfter="天"
                            placeholder="60天"
                            size="small"
                            style={{ width: 200 }}
                          />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    );
                  })}
                </>
              )}
            </Form.List>
          </Form>
          <div className={styles.radar}>
            <CredibilityRadarChart
              id="credibility_radar_chart"
              rawData={credibility}
            />
            <Indicator desc={indicator1} />
          </div>
        </Card>

        <Card style={{ marginBottom: '20px' }} title={'推荐股票'}>
          <Form
            name="stock_forecast_form"
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
            autoComplete="off"
            form={form2}
          >
            <Space
              style={{ display: 'flex', marginBottom: -20 }}
              align="baseline"
            >
              <Form.Item
                name={'prediction_model'}
                label="预测模型"
                rules={[{ required: true, message: '请选择预测模型' }]}
              >
                <Select placeholder="请选择预测模型" style={{ width: 200 }}>
                  {model_list.map((item) => {
                    return (
                      <Select.Option key={item} name={item}>
                        {item}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name={'explanation_model'}
                label="解释模型"
                rules={[{ required: true, message: '请选择解释模型' }]}
              >
                <Select placeholder="请选择解释模型" style={{ width: 200 }}>
                  {explanation_list.map((item) => {
                    return (
                      <Select.Option key={item} name={item}>
                        {item}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name={'seq_len'}
                label="时间窗口"
                rules={[{ required: true, message: '请输入时间窗口' }]}
              >
                <InputNumber
                  addonAfter="天"
                  placeholder="60天"
                  style={{ width: 100 }}
                />
              </Form.Item>
              <Form.Item
                name={'date'}
                label="时间段"
                rules={[{ required: true, message: '请选择时间段' }]}
              >
                <RangePicker />
              </Form.Item>
            </Space>
            <Space style={{ display: 'flex' }} align="baseline">
              <Form.Item
                name={'num_recommendation_stocks'}
                label="推荐股票数"
                rules={[{ required: true, message: '请输入推荐股票数' }]}
              >
                <InputNumber
                  addonAfter="股"
                  placeholder="3"
                  style={{ width: 100 }}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Form.Item>
            </Space>
          </Form>
          {candleList?.length &&
            stock.map((item, idx) => {
              return (
                <>
                  <div className={styles.title}>{`${item}(${stockNameMap.get(
                    item.substring(0, 6),
                  )})`}</div>
                  <KChart rawData={candleList[idx]} id={`${item}-k-chart`} />
                </>
              );
            })}
        </Card>

        <Card title={'投资组合评价'}>
          <Form
            name="invest_form"
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
            autoComplete="off"
            form={form3}
          >
            <Space
              style={{ display: 'flex', marginBottom: -20 }}
              align="baseline"
            >
              <Form.Item
                name={'return_preference'}
                label="回报偏好"
                rules={[{ required: true, message: '请输入回报偏好' }]}
              >
                <InputNumber
                  addonAfter="%"
                  placeholder="0"
                  style={{ width: 100 }}
                  max={100}
                  min={0}
                />
              </Form.Item>
              <Form.Item
                name={'risk_preference'}
                label="风险偏好"
                rules={[{ required: true, message: '请输入风险偏好' }]}
              >
                <InputNumber
                  addonAfter="%"
                  placeholder="90"
                  style={{ width: 100 }}
                  max={100}
                  min={0}
                />
              </Form.Item>
              <Form.Item
                name={'date'}
                label="时间段"
                rules={[{ required: true, message: '请选择时间段' }]}
              >
                <RangePicker />
              </Form.Item>
            </Space>
            <Space
              style={{
                display: 'flex',
                margin: '10px 0 20px 0',
                height: 300,
                alignItems: 'flex-end',
              }}
              align="baseline"
            >
              <div>投资组合:</div>
              <Form.Item label={'投资组合'} noStyle shouldUpdate>
                {() => (
                  <Typography>
                    <pre
                      style={{
                        height: 300,
                        width: 500,
                        overflowY: 'scroll',
                        margin: 0,
                      }}
                    >
                      {JSON.stringify(form4Data, null, 2)}
                    </pre>
                  </Typography>
                )}
              </Form.Item>
              <InvestModal outForm={form4} setData={setOutPre} />
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Space>
          </Form>
          <div className={styles.radar}>
            <InvestRadarChart id="invest_radar_chart" rawData={invest} />
            <Indicator desc={indicator2} />
          </div>
        </Card>
      </>
    </BasicLayout>
  );
};

export default Assessment;
