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
    prediction_model: 'NSRS',
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
        obj[s['stockName']] = s['number'];
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
          <CredibilityRadarChart
            id="credibility_radar_chart"
            rawData={credibility}
          />
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
                  addonAfter="支"
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
              <div>投资组合：</div>
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
          <InvestRadarChart id="invest_radar_chart" rawData={invest} />
        </Card>
      </>
    </BasicLayout>
  );
};

export default Assessment;
