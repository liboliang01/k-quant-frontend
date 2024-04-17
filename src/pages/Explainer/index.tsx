import KGContainer from '@/components/KG/custom';
import BasicLayout from '@/layout/BasicLayout';
import {
  Button,
  Card,
  Form,
  Select,
  Space,
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

const nodeList = [
  {
    nodes: {
      '1': {
        name: '中国石油(1)',
        type: '公司',
        desc: '国家能源局党组成员、副局长任京东主持会议并讲话，中国石油副总经理黄永章、中国石化副总经理喻宝才出席会议。',
      },
      '2': {
        name: '中国石化(1)',
        type: '公司',
        desc: '国家能源局党组成员、副局长任京东主持会议并讲话，中国石油副总经理黄永章、中国石化副总经理喻宝才出席会议。',
      },
      '3': {
        name: '中国石油(2)',
        type: '公司',
        desc: '中国石油集团与中国能源建设集团在京签署战略合作协议。协议签署前，中国石油集团董事长、党组书记戴厚良会见了中国能建集团董事长、党委书记宋海良，双方就深化合作交换了意见。',
      },
      '4': {
        name: '中国能源建设(1)',
        type: '公司',
        desc: '中国石油集团与中国能源建设集团在京签署战略合作协议。协议签署前，中国石油集团董事长、党组书记戴厚良会见了中国能建集团董事长、党委书记宋海良，双方就深化合作交换了意见。',
      },
      '5': {
        name: '中石油(3)',
        type: '公司',
        desc: '中石油、中石化等8家公司注册100亿共同成立华光海安集团。',
      },
      '6': {
        name: '中石化(2)',
        type: '公司',
        desc: '中石油、中石化等8家公司注册100亿共同成立华光海安集团。',
      },
      '7': {
        name: '中国能建(2)',
        type: '公司',
        desc: '中国能建发布吸收合并中国葛洲坝集团股份有限公司。',
      },
      '8': {
        name: '葛洲坝',
        type: '公司',
        desc: '中国能建发布吸收合并中国葛洲坝集团股份有限公司。',
      },
      '9': {
        name: '中石油(4)',
        type: '公司',
        desc: '今日，中石油和中石化宣布了财报。两公司都在过去季度取得了出色的业绩，这一利好消息引发了投资者的乐观情绪，推动了其股票价格的上涨。',
      },
      '10': {
        name: '中石化(4)',
        type: '公司',
        desc: '今日，中石油和中石化宣布了财报。两公司都在过去季度取得了出色的业绩，这一利好消息引发了投资者的乐观情绪，推动了其股票价格的上涨。',
      },
      '11': {
        name: '东华能源(1)',
        type: '公司',
        desc: '东华能源与华锦股份最新发布的市场报告显示，两家公司在同一产品线上争夺领先地位，竞争导致市场动荡。',
      },
      '12': {
        name: '华锦股份(1)',
        type: '公司',
        desc: '东华能源与华锦股份最新发布的市场报告显示，两家公司在同一产品线上争夺领先地位，竞争导致市场动荡。',
      },
      '13': {
        name: '中国石化(5)',
        type: '公司',
        desc: '中国石化宣布了一项对东华能源的大规模的投资计划。',
      },
      '14': {
        name: '东华能源(2)',
        type: '公司',
        desc: '中国石化宣布了一项对东华能源的大规模的投资计划。',
      },
      '15': {
        name: '中国石油(5)',
        type: '公司',
        desc: '华锦股份和中国石油因商业合作方面的分歧进入司法程序。纠纷涉及产品专利权和市场份额的争夺，此次纠纷引发了业界广泛关注。',
      },
      '16': {
        name: '华锦股份(2)',
        type: '公司',
        desc: '华锦股份和中国石油因商业合作方面的分歧进入司法程序。纠纷涉及产品专利权和市场份额的争夺，此次纠纷引发了业界广泛关注。',
      },
    },
    links: [
      { source: 1, target: 2, rela: '同行 2023-04-04', type: '同行关系' },
      { source: 3, target: 4, rela: '合作 2023-10-23', type: '合作关系' },
      { source: 5, target: 6, rela: '合作 2023-11-21', type: '合作关系' },
      { source: 7, target: 8, rela: '上级 2021-07-27', type: '上级' },
      { source: 9, target: 10, rela: '同涨 2023-10-21', type: '同涨' },
      { source: 11, target: 12, rela: '竞争 2023-11-29', type: '竞争' },
      { source: 13, target: 14, rela: '投资 2023-11-16', type: '投资' },
      { source: 15, target: 16, rela: '纠纷 2023-09-17', type: '纠纷' },
    ],
  },
  {
    nodes: {
      '1': {
        name: '中国石油 (601857)',
        type: '公司',
      },
      // '2': {
      //   name: '中国石油',
      //   type: '同名公司',
      // },
      // '3': {
      //   name: '中石油',
      //   type: '同名公司',
      // },
      '4': {
        name: '中国石化 (600028)',
        type: '公司',
      },
      // '5': {
      //   name: '中国石化',
      //   type: '同名公司',
      // },
      // '6': {
      //   name: '中石化',
      //   type: '同名公司',
      // },
      '7': {
        name: '中国能源建设 (601868)',
        type: '公司',
      },
      // '8': {
      //   name: '中国能源建设',
      //   type: '同名公司',
      // },
      // '9': {
      //   name: '中国能建',
      //   type: '同名公司',
      // },
      '10': {
        name: '葛洲坝 (已退市)',
        type: '已退市公司',
      },
      '11': {
        name: '东华能源 (002221)',
        type: '公司',
      },
      // '12': {
      //   name: '东华能源',
      //   type: '同名公司',
      // },
      '13': {
        name: '华锦股份 (000059)',
        type: '公司',
      },
      // '14': {
      //   name: '华锦股份',
      //   type: '同名公司',
      // },
    },
    links: [
      // { source: 1, target: 2, rela: '同公司', type: '同公司' },
      // { source: 1, target: 3, rela: '同公司', type: '同公司' },
      { source: 1, target: 4, rela: '同行 2023-04-04', type: '同行关系' },
      { source: 1, target: 4, rela: '同涨 2023-10-21', type: '同行关系' },
      { source: 1, target: 4, rela: '合作 2023-11-21', type: '同行关系' },
      // { source: 4, target: 5, rela: '同公司', type: '同公司' },
      // { source: 4, target: 6, rela: '同公司', type: '同公司' },
      { source: 1, target: 7, rela: '合作 2023-10-23', type: '合作' },
      { source: 4, target: 7, rela: '同行 2023-09-16', type: '同行' },
      // { source: 7, target: 8, rela: '同公司', type: '同公司' },
      // { source: 7, target: 9, rela: '同公司', type: '同公司' },
      { source: 7, target: 10, rela: '上级 2023-11-21', type: '上级' },
      { source: 4, target: 11, rela: '投资 2023-11-16', type: '投资' },
      // { source: 11, target: 12, rela: '同公司', type: '同公司' },
      { source: 1, target: 13, rela: '纠纷 2023-09-17', type: '纠纷' },
      { source: 11, target: 13, rela: '竞争 2023-11-29', type: '竞争' },
      // { source: 13, target: 14, rela: '同公司', type: '同公司' },
    ],
  },
  {
    nodes: {
      '1': {
        name: '中国石油 (601857)',
        type: '公司',
      },
      // '2': {
      //   name: '中国石油',
      //   type: '同名公司',
      // },
      // '3': {
      //   name: '中石油',
      //   type: '同名公司',
      // },
      '4': {
        name: '中国石化 (600028)',
        type: '公司',
      },
      // '5': {
      //   name: '中国石化',
      //   type: '同名公司',
      // },
      // '6': {
      //   name: '中石化',
      //   type: '同名公司',
      // },
      '7': {
        name: '中国能源建设 (601868)',
        type: '公司',
      },
      // '8': {
      //   name: '中国能源建设',
      //   type: '同名公司',
      // },
      // '9': {
      //   name: '中国能建',
      //   type: '同名公司',
      // },
      '10': {
        name: '葛洲坝 (已退市)',
        type: '已退市公司',
      },
      '11': {
        name: '东华能源 (002221)',
        type: '公司',
      },
      // '12': {
      //   name: '东华能源',
      //   type: '同名公司',
      // },
      '13': {
        name: '华锦股份 (000059)',
        type: '公司',
      },
      // '14': {
      //   name: '华锦股份',
      //   type: '同名公司',
      // },
    },
    links: [
      // { source: 1, target: 2, rela: '同公司', type: '同公司' },
      // { source: 1, target: 3, rela: '同公司', type: '同公司' },
      { source: 1, target: 4, rela: '同行 2023-04-04', type: '同行关系' },
      { source: 1, target: 4, rela: '同涨 2023-10-21', type: '同行关系' },
      { source: 1, target: 4, rela: '合作 2023-11-21', type: '同行关系' },
      // { source: 4, target: 5, rela: '同公司', type: '同公司' },
      // { source: 4, target: 6, rela: '同公司', type: '同公司' },
      { source: 1, target: 7, rela: '合作 2023-10-23', type: '合作' },
      { source: 1, target: 7, rela: '同行 2023-04-04', type: 'update' },
      { source: 4, target: 7, rela: '同行 2023-09-16', type: '同行' },
      // { source: 7, target: 8, rela: '同公司', type: '同公司' },
      // { source: 7, target: 9, rela: '同公司', type: '同公司' },
      { source: 7, target: 10, rela: '上级 2023-11-21', type: '上级' },
      { source: 4, target: 11, rela: '投资 2023-11-16', type: '投资' },
      // { source: 11, target: 12, rela: '同公司', type: '同公司' },
      { source: 1, target: 13, rela: '纠纷 2023-09-17', type: '纠纷' },
      { source: 11, target: 13, rela: '竞争 2023-11-29', type: '竞争' },
      // { source: 13, target: 14, rela: '同公司', type: '同公司' },
    ],
  },
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
  const [data, setData] = useState<any[]>([]);
  const [newData, setNewData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currStock, setCurrStock] = useState<string>();
  const [currExplainer, setCurrExplainer] = useState<string>();
  const [eventList, setEventList] = useState<any>();
  const stockNameMap = useMemo(() => {
    const map = new Map();
    companyName.forEach((item) => {
      const code = item.code.split('.')[0];
      map.set(code, item.name);
    });
    return map;
  }, [companyName]);
  // const columns = [
  //   {
  //     title: '股票代码',
  //     dataIndex: 'relative_stock',
  //     key: 'relative_stock',
  //     render: (item: string) => {
  //       return (
  //         <>
  //           {item}({stockNameMap.get(item.slice(2))})
  //           <ImagePreviewer
  //             text={'查看蜡烛图'}
  //             url={`http://47.106.95.15:8000/get_pic/?stock=${item.substring(
  //               2,
  //               8,
  //             )}&date=${form.getFieldValue('date')}`}
  //           />
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     title: '评分',
  //     dataIndex: 'score',
  //     key: 'score',
  //     sorter: (a: any, b: any) => a.score - b.score,
  //     render: (item: any) => Number(item).toFixed(2),
  //   },
  //   {
  //     title: '股票代码（源）',
  //     dataIndex: 'stock',
  //     key: 'stock',
  //     onCell: (__: any, index: number | undefined) => {
  //       if (index === 0) {
  //         return { rowSpan: data.length };
  //       }
  //       return { rowSpan: 0 };
  //     },
  //     render: (item: string) => {
  //       return (
  //         <>
  //           {item}({stockNameMap.get(item.slice(2))})
  //           <ImagePreviewer
  //             text={'查看蜡烛图'}
  //             url={`http://47.106.95.15:8000/get_pic/?stock=${item.substring(
  //               2,
  //               8,
  //             )}&date=${form.getFieldValue('date')}`}
  //           />
  //         </>
  //       );
  //     },
  //   },
  // ];
  const getDate = useCallback(async () => {
    const res = await axios.get('http://47.106.95.15:8000/get_trade_date/');
    setDateList(res.data.data);
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
    newData.relative.forEach((item: any, index: number) => {
      nodes[String(index + 2)] = {
        name: stockNameMap.get(item['stock'].slice(2)),
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

    const emptyNodes: Record<string, any> = {};
    const len = newData.relative.length + 1;

    [0, 0, 0].forEach((item, idx) => {
      const name = `其他${idx + 1}`;
      emptyNodes[String(len + idx + 1)] = {
        name: name,
        type: 'empty_node',
        desc: '',
      };
      links.push({
        source: 1,
        target: len + idx + 1,
        rela: '',
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
        ...emptyNodes,
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
    // console.log(events)
    // const rela_set = new Set();
    // events.forEach((item: any) => {
    //   const regex = /\((.*?)\)/g;
    //   const matches = [...item.matchAll(regex)];

    //   rela_set.add(matches.pop()[1]);
    // });
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
      events: eventTree,
      // relations: Array.from(rela_set).filter((item) => item !== '未知Unknown'),
      relations: item.desc.relation,
    };
    setEventList(res);
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
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
                  { value: 'xpath', label: 'Xpath' },
                ]}
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
