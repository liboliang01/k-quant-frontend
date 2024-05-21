import KGContainer from '@/components/KG/custom';
import BasicLayout from '@/layout/BasicLayout';
import {
  Button,
  Card,
  Form,
  Select,
  Space,
  Spin,
  Tree,
  TreeProps,
  message,
} from 'antd';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import companyName from './company_full_name.json';
import DownloadModal from './downloadModal';
import styles from './index.less';
import LineChart from './lineChart';

const HencexDateList = ['2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05'];

export const stockList = [
  'SH600000',
  'SH600009',
  'SH600010',
  'SH600011',
  'SH600015',
  'SH600016',
  'SH600018',
  'SH600019',
  'SH600025',
  'SH600028',
  'SH600029',
  'SH600030',
  'SH600031',
  'SH600036',
  'SH600048',
  'SH600050',
  'SH600061',
  'SH600079',
  'SH600085',
  'SH600104',
  'SH600109',
  'SH600111',
  'SH600115',
  'SH600132',
  'SH600143',
  'SH600150',
  'SH600161',
  'SH600176',
  'SH600183',
  'SH600196',
  'SH600276',
  'SH600309',
  'SH600332',
  'SH600346',
  'SH600352',
  'SH600362',
  'SH600383',
  'SH600406',
  'SH600426',
  'SH600436',
  'SH600438',
  'SH600489',
  'SH600519',
  'SH600547',
  'SH600570',
  'SZ002958',
  'SH600585',
  'SH600588',
  'SH600600',
  'SH600606',
  'SH600655',
  'SH600660',
  'SH600690',
  'SH600741',
  'SH600760',
  'SH600795',
  'SH600809',
  'SH600837',
  'SH600848',
  'SH600886',
  'SH600887',
  'SH600893',
  'SH600900',
  'SH600919',
  'SH600926',
  'SH600958',
  'SH600989',
  'SH600999',
  'SH601006',
  'SH601009',
  'SH601012',
  'SH601021',
  'SH601066',
  'SH601088',
  'SH601108',
  'SH601111',
  'SH601138',
  'SH601155',
  'SH601162',
  'SH601166',
  'SH601169',
  'SH601186',
  'SH601211',
  'SH601216',
  'SH601225',
  'SH601229',
  'SH601231',
  'SH601236',
  'SH601238',
  'SH601288',
  'SH601318',
  'SH601319',
  'SH601328',
  'SH601336',
  'SH601360',
  'SH601377',
  'SH601390',
  'SH601398',
  'SH601600',
  'SH601601',
  'SH601607',
  'SH601618',
  'SH601628',
  'SH601633',
  'SH601668',
  'SH601669',
  'SH601688',
  'SH601698',
  'SH601766',
  'SH601788',
  'SH601800',
  'SH601808',
  'SH601818',
  'SH601838',
  'SH601857',
  'SH601877',
  'SH601878',
  'SH601881',
  'SH601888',
  'SH601898',
  'SH601899',
  'SH601901',
  'SH601919',
  'SH601933',
  'SH601939',
  'SH601966',
  'SH601985',
  'SH601988',
  'SH601989',
  'SH601998',
  'SH603019',
  'SH603160',
  'SH603259',
  'SH603260',
  'SH603288',
  'SH603501',
  'SH603799',
  'SH603833',
  'SH603899',
  'SH603986',
  'SH603993',
  'SZ000001',
  'SZ000002',
  'SZ000063',
  'SZ000066',
  'SZ000069',
  'SZ000100',
  'SZ000157',
  'SZ000166',
  'SZ000301',
  'SZ000333',
  'SZ000338',
  'SZ000425',
  'SZ000538',
  'SZ000568',
  'SZ000596',
  'SZ000625',
  'SZ000651',
  'SZ000661',
  'SZ000703',
  'SZ000708',
  'SZ000725',
  'SZ000768',
  'SZ000776',
  'SZ000783',
  'SZ000786',
  'SZ000800',
  'SZ000858',
  'SZ000876',
  'SZ000895',
  'SZ000938',
  'SZ000963',
  'SZ000977',
  'SZ001979',
  'SZ002001',
  'SZ002007',
  'SZ002008',
  'SZ002024',
  'SZ002027',
  'SZ002032',
  'SZ002044',
  'SZ002049',
  'SZ002050',
  'SZ002120',
  'SZ002129',
  'SZ002142',
  'SZ002179',
  'SZ002202',
  'SZ002230',
  'SZ002236',
  'SZ002241',
  'SZ002252',
  'SZ002271',
  'SZ002304',
  'SZ002311',
  'SZ002352',
  'SZ002410',
  'SZ002415',
  'SZ002460',
  'SZ002466',
  'SZ002475',
  'SZ002493',
  'SZ002555',
  'SZ002568',
  'SZ002594',
  'SZ002601',
  'SZ002602',
  'SZ002607',
  'SZ002624',
  'SZ002714',
  'SZ002736',
  'SZ002841',
  'SZ002916',
  'SZ002938',
  'SZ300003',
  'SZ300015',
  'SZ300033',
  'SZ300059',
  'SZ300122',
  'SZ300124',
  'SZ300142',
  'SZ300144',
  'SZ300347',
  'SZ300408',
  'SZ300413',
  'SZ300433',
  'SZ300498',
];

const nodeColor = [
  //粉红
  {
    fill: 'rgb(249, 235, 249)',
    stroke: 'rgb(162, 84, 162)',
    text: 'rgb(162, 84, 162)',
  },
  //灰色
  {
    fill: 'rgb(112, 202, 225)',
    stroke: '#23b3d7',
    text: 'rgb(93, 76, 93)',
  },
  { fill: '#ccc', stroke: 'rgb(145, 138, 138)', text: '#333' },
  { fill: '#D9C8AE', stroke: '#c0a378', text: 'rgb(60, 60, 60)' },
  {
    fill: 'rgb(178, 229, 183)',
    stroke: 'rgb(98, 182, 105)',
    text: 'rgb(60, 60, 60)',
  },
  //红
  {
    fill: 'rgb(248, 152, 152)',
    stroke: 'rgb(233, 115, 116)',
    text: 'rgb(60, 60, 60)',
  },
];

const Coming: React.FC = () => {
  const [form] = Form.useForm();
  const [dateList, setDateList] = useState<string[]>([]);
  const [allDateList, setAllDateList] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [newData, setNewData] = useState<any>([]);
  const [currStock, setCurrStock] = useState<string>();
  const [currExplainer, setCurrExplainer] = useState<string>();
  const [eventList, setEventList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [sameStock, setSameStock] = useState<string>('');
  const stockNameMap = useMemo(() => {
    const map = new Map();
    companyName.forEach((item) => {
      const code = item.code.split('.')[0];
      map.set(code, item.name);
    });
    return map;
  }, [companyName]);

  const getDate = useCallback(async () => {
    const res = await axios.get('http://47.106.95.15:8000/get_trade_date/');
    setDateList(res.data.data);
    setAllDateList(res.data.data);
  }, []);
  useEffect(() => {
    getDate();
  }, [getDate]);

  const nodeLinkData = useMemo(() => {
    if (!currStock || !newData.relative) return { nodes: {}, links: [] };

    const nodes: Record<string, any> = {};
    const links: Record<string, any>[] = [];
    newData.relative.sort((a: any, b: any) => {
      const a_val = Number(a['value']['total_score'] || a['value']);
      const b_val = Number(b['value']['total_score'] || b['value']);
      return b_val - a_val;
    });
    const currStockName = stockNameMap.get(currStock.slice(2));
    newData.relative.forEach((item: any, index: number) => {
      if(stockNameMap.get(item['stock'].slice(2)) === currStockName){
        setSameStock(currStockName)
      }
      nodes[String(index + 2)] = {
        name:
          stockNameMap.get(item['stock'].slice(2)) === currStockName
            ? currStockName + '2'
            : stockNameMap.get(item['stock'].slice(2)),
        type: `公司${index + 1}`,
        desc: item['value'] || item['value']['events'],
      };
      links.push({
        source: 1,
        target: index + 2,
        rela: '',
        // Number(item['value']['total_score'] || item['value']).toFixed(2),
        type: '',
      });
    });

    return {
      nodes: {
        '1': {
          name: stockNameMap.get(currStock.slice(2)),
          type: 'curr',
          desc: '',
        },
        ...nodes,
      },
      links,
    };
  }, [newData, currStock]);

  const candleList = useMemo(() => {
    if (!newData.origin) return [];
    const originalStock =
      '[被解释股票]' + stockNameMap.get(newData.origin.stock.slice(2));
    const origin: any = {};
    origin[originalStock] = JSON.parse(newData.origin.candle)['close'];
    const relativeList = newData.relative.map((item: any) => {
      const { candle, stock } = item;
      const relaStock = '[相关股票]' + stockNameMap.get(stock.slice(2));
      const res: any = {};
      res[relaStock] = JSON.parse(candle)['close'];
      return res;
    });
    return [origin, ...relativeList];
  }, [newData.origin]);

  const onSearchNew = () => {
    setLoading(true);
    setSameStock('')
    form.validateFields().then(async (values): Promise<any> => {
      const params = {
        ...values,
      };
      setLoading(true);
      const res = await axios.get(`http://47.106.95.15:8000/get_score_new2/`, {
        params: {
          stock: params.stock,
          date: params.date,
          model: params.model,
          forecast: params.forecast,
        },
      });

      setCurrExplainer(params.model);
      setEventList(undefined);
      setNewData(res.data.data);
      setCurrStock(params.stock);
      setLoading(false);
    });
    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
    onSearchNew();
  };

  useEffect(() => {
    onSearchNew();
  }, []);
  const onClick = (item: any) => {
    if (item.desc === '') {
      message.info('请选择相关股票节点');
      return;
    }
    const events = Object.values(item.desc.events).flat();
    const eventTree = Object.keys(item.desc.events).map((date) => {
      return {
        title: date,
        key: date,
        children: item.desc.events[date].map((event: string) => {
          return {
            title: event,
            key: event,
          };
        }),
      };
    });
    const res = {
      name: item.name,
      events: eventTree.sort((evt1,evt2)=>{
        const evtKey1 = evt1.key;
        const timeStamp1 = (new Date(evtKey1)).getTime();
        const evtKey2 = evt2.key;
        const timeStamp2 = (new Date(evtKey2)).getTime();
        return timeStamp2-timeStamp1;
      }),
      // relations: Array.from(rela_set).filter((item) => item !== '未知Unknown'),
      relations: Array.from(new Set(item.desc.relation)).map((item) => {
        if (item === '同行业') {
          return '合作';
        } else {
          return item;
        }
      }),
    };
    setEventList(res);
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onExplainerChange = (value)=>{
    if(value==='hencex'){
      form.setFieldValue('date','2024-01-03')
      setDateList(HencexDateList)
    }else{
      setDateList(allDateList)
    }
  }
  return (
    <>
      <BasicLayout backgroundColor="#f5f5f5">
        <Card style={{ marginBottom: '20px' }}>
          <Form form={form} layout="inline" style={{ marginBottom: '20px' }}>
            <Form.Item
              label="解释模型"
              name="model"
              initialValue={'input'}
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: 200 }}
                options={[
                  { value: 'input', label: 'inputGradient' },
                  { value: 'xpath', label: 'XpathExplainer' },
                  { value: 'gnn', label: 'GNNExplainer' },
                  { value: 'hencex', label: 'HencexExplainer' },
                ]}
                onSelect={onExplainerChange}
              />
            </Form.Item>
            <Form.Item
              label="预测模型"
              name="forecast"
              initialValue={'NRSR'}
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: 200 }}
                options={[
                  { value: 'NRSR', label: 'NRSR' },
                  { value: 'GATs', label: 'GATs' },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="股票"
              name="stock"
              initialValue={'SH600000'}
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                allowClear
                style={{ width: 200 }}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={stockList.map((item) => ({
                  label: item + '(' + stockNameMap.get(item.slice(2)) + ')',
                  value: item,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="交易日"
              name="date"
              initialValue={'2024-01-03'}
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                allowClear
                style={{ width: 200 }}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={dateList.map((item) => ({ label: item, value: item }))}
              />
            </Form.Item>
            <br />
            <div
              style={{ textAlign: 'left', width: '100%', margin: '10px 0 0 0' }}
            >
              <Space>
                <Button type="primary" onClick={onSearchNew}>
                  查询
                </Button>
                <Button onClick={onReset}>重置</Button>
                <DownloadModal stock={form.getFieldValue('stock')} />
              </Space>
            </div>
          </Form>
        </Card>
        <Spin spinning={loading}>
          {newData.origin && newData.relative && (
            <>
              <Card style={{ height: 500, flex: 1, marginBottom: '20px' }}>
                <div className={styles.chart_box}>
                  {/* {currExplainer === 'input' ? ( */}
                  <div className={styles.event_box}>
                    {eventList ? (
                      <>
                        <div>
                          <h3>
                            {eventList.name} 与{' '}
                            {stockNameMap.get(newData.origin.stock.slice(2))}
                          </h3>
                          <b>关系类型：</b>
                          {eventList.relations.join(',')}
                        </div>
                        <div className={styles.jsonArea}>
                          <b>相关事件：</b>
                          <Tree
                            showLine
                            // switcherIcon={<DownOutlined />}
                            defaultExpandedKeys={['0-0-0']}
                            onSelect={onSelect}
                            treeData={eventList.events}
                          />
                        </div>
                      </>
                    ) : (
                      <h3>请选择相关股票节点</h3>
                    )}
                  </div>
                  {/* ) : null} */}

                  <div className={styles.card_box}>
                    <KGContainer
                      data={nodeLinkData}
                      onClick={onClick}
                    ></KGContainer>
                    <div className={styles.board}>
                      {currExplainer === 'input' ? (
                        <div>
                          预测结果：
                          {newData.origin.pred_result.explanation.toFixed(2)}
                        </div>
                      ) : null}
                      <div>
                        股票排名({newData.origin.rank}/{newData.origin.total})
                      </div>
                      {sameStock !== '' ? (
                        <div>
                          <b>{sameStock}</b>与<b>{sameStock}2</b>属于同一支股票，参考自身的关系
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Card>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: 20 }}>
                  <Card>
                    <LineChart
                      rawData={[candleList[0]]}
                      id={'close-line-chart' + 0}
                      color={nodeColor[0]['stroke']}
                    />
                  </Card>
                </div>
                <div style={{ flex: 1 }}>
                  {candleList.slice(1)?.map((item, idx) => {
                    return (
                      <div style={{ marginBottom: 20 }}>
                        <Card>
                          <LineChart
                            rawData={[item]}
                            id={'close-line-chart' + idx + 1}
                            color={nodeColor[idx + 1]['stroke']}
                          />
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* <Card
              title={`源股票 ${newData.origin.stock}(${stockNameMap.get(
                newData.origin.stock.slice(2),
              )})`}
              style={{ marginBottom: '20px', height: '400px' }}
            >
              <KChart
                rawData={JSON.parse(newData.origin.candle)}
                id={`${newData.origin.stock}-k-chart`}
              />
            </Card>
            <Card title="相关股票">
              {newData.relative.map((item: any, idx: number) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      height: 400,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ width: '40%' }}>
                      {typeof item.value === 'number' ? (
                        <div className={styles.title}>
                          <div>{`TOP${idx + 1}:${item.stock}(${stockNameMap.get(
                            item.stock.slice(2),
                          )})`}</div>
                          <div>{`总分：${Number(item.value).toFixed(2)}`}</div>
                        </div>
                      ) : (
                        <BarChart
                          stock={`TOP${idx + 1}:${
                            item.stock
                          }(${stockNameMap.get(item.stock.slice(2))})`}
                          rawData={item.value}
                          id={`${item.stock}-bar-chart`}
                        />
                      )}
                    </div>
                    <div style={{ width: '60%' }}>
                      <KChart
                        rawData={JSON.parse(item.candle)}
                        id={`${item.stock}-k-chart`}
                      />
                    </div>
                  </div>
                );
              })}
            </Card> */}
            </>
          )}
        </Spin>

        {/* <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={loading}
        /> */}
      </BasicLayout>
    </>
  );
};

export default Coming;
