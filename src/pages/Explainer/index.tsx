import BasicLayout from '@/layout/BasicLayout';
import { Button, Card, Form, Select, Space, Table } from 'antd';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ImagePreviewer from '../KQuant/ImagePreviewer';
import companyName from './company_full_name.json';

const stockList = [
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

const Coming: React.FC = () => {
  const [form] = Form.useForm();
  const [dateList, setDateList] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const stockNameMap = useMemo(() => {
    const map = new Map();
    companyName.forEach((item) => {
      const code = item.code.split('.')[0]
      map.set(code, item.name);
    });
    return map;
  }, [companyName]);
  const columns = [
    {
      title: '股票代码',
      dataIndex: 'relative_stock',
      key: 'relative_stock',
      render: (item: string) => {
        return (
          <>
            {item}
            ({stockNameMap.get(item.slice(2))})
            <ImagePreviewer
              text={'查看蜡烛图'}
              url={`http://47.106.95.15:8000/get_pic/?stock=${item.substring(
                2,
                8,
              )}&date=${form.getFieldValue('date')}`}
            />
          </>
        );
      },
    },
    {
      title: '评分',
      dataIndex: 'score',
      key: 'score',
      sorter: (a: any, b: any) => a.score - b.score,
      render: (item: any) => Number(item).toFixed(2),
    },
    {
      title: '股票代码（源）',
      dataIndex: 'stock',
      key: 'stock',
      render: (item: string) => {
        return (
          <>
            {item}
            ({stockNameMap.get(item.slice(2))})
            <ImagePreviewer
              text={'查看蜡烛图'}
              url={`http://47.106.95.15:8000/get_pic/?stock=${item.substring(
                2,
                8,
              )}&date=${form.getFieldValue('date')}`}
            />
          </>
        );
      },
    },
  ];
  const getDate = useCallback(async () => {
    const res = await axios.get('http://47.106.95.15:8000/get_trade_date/');
    setDateList(res.data.data);
  }, []);
  useEffect(() => {
    getDate();
  }, [getDate]);

  const onSearch = () => {
    form.validateFields().then(async (values) => {
      const params = {
        ...values,
      };
      setLoading(true);
      const res = await axios.get(`http://47.106.95.15:8000/get_score/`, {
        params: {
          stock: params.stock,
          date: params.date,
          model: params.model,
        },
      });
      const d = Object.entries(res.data.data.relative_data).map((item) => {
        return {
          relative_stock: item[0],
          score: item[1],
          stock: res.data.data.stock,
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
  return (
    <>
      <BasicLayout backgroundColor="#f5f5f5">
        <Card style={{ marginBottom: '20px' }}>
          <Form form={form} layout="inline" style={{ marginBottom: '20px' }}>
            <Form.Item
              label="模型"
              name="model"
              initialValue={'inputgradient'}
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: 200 }}
                options={[
                  { value: 'inputgradient', label: 'inputGradient' },
                  { value: 'xpath', label: 'Xpath' },
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
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="交易日"
              name="date"
              initialValue={'2022-06-01'}
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
            <Form.Item>
              <Space>
                <Button type="primary" onClick={onSearch}>
                  查询
                </Button>
                <Button onClick={onReset}>重置</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={loading}
        />
      </BasicLayout>
    </>
  );
};

export default Coming;
