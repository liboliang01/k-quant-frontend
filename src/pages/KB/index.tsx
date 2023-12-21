import BasicLayout from '@/layout/BasicLayout';
import { Chart } from '@antv/g2';
import { Button, Radio, Space, Spin, Table, Typography } from 'antd';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import KGContainer from '../../components/KG';
import InfoCircleCard from './InfoCircleCard';
import entities from './img/entities.png';
import news from './img/news.png';
import relations from './img/relations.png';
import reports from './img/reports.png';
import types from './img/types.png';
import years from './img/years.png';
import styles from './index.less';
import CenterModeSlider from './slider';

const { Title } = Typography;

interface PropsType {
  title: string;
  subTitle: string;
  image: string;
  remarks: string;
}

const dataList = [
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

const attributes_list = [
  {
    name: '实体',
    number: '51,000+',
    image: entities,
  },
  {
    name: '关系',
    number: '492,600+',
    image: relations,
  },
  {
    name: '研究报告',
    number: '50,000+',
    image: reports,
  },
  {
    name: '金融新闻',
    number: '2,000,000+',
    image: news,
  },
  {
    name: '关系类型',
    number: '20+',
    image: types,
  },
  {
    name: '数据年份',
    number: '5+',
    image: years,
  },
];

const options = [
  { label: '最近一周', value: '7' },
  { label: '最近半个月', value: '15' },
  { label: '最近一个月', value: '30' },
];

const KB: React.FC = () => {
  const [currentStatus, setCurrentStatus] = useState<number>(0);
  const [value, setValue] = useState('7');
  const [spin, setSpin] = useState(false);
  const [res, setRes] = useState([]);

  const get_pipline = useCallback(async () => {
    setSpin(true);
    const res = await axios.get(
      `http://47.106.95.15:8000/get_static_pipiline/?duration=${value}`,
    );
    const j_res = JSON.parse(res.data.data);
    setRes(j_res);
    setSpin(false);
  }, [value]);

  const render_bar_chart = useCallback(() => {
    const data = [
      { 知识库: '第二名', 知识种类: 19 },
      { 知识库: 'Hidy', 知识种类: 34 },
    ];

    const chart = new Chart({
      container: 'bar_chart_container',
      autoFit: true,
    });

    chart
      .interval()
      .data(data)
      .encode('x', '知识库')
      .encode('y', '知识种类')
      .style('maxWidth', 50);

    chart.render();
  }, []);

  useEffect(() => {
    render_bar_chart();
  }, []);

  const columns = [
    {
      title: '原始新闻',
      dataIndex: 'news',
      key: 'news',
    },
    {
      title: '发布时间',
      dataIndex: 'time',
      key: 'time',
      width: 200,
    },
  ];

  const title_list = ['知识抽取', '知识融合', '知识更新'];

  const table_data = [
    {
      news: (
        <div>
          国家能源局党组成员、副局长任京东主持会议并讲话，
          <span style={{ color: 'red' }}>中国石油</span>副总经理黄永章、
          <span style={{ color: 'red' }}>中国石化</span>
          副总经理喻宝才出席会议。
        </div>
      ),
      time: '2023-04-04',
    },
    {
      news: (
        <div>
          <span style={{ color: 'red' }}>中国石油</span>集团与
          <span style={{ color: 'red' }}>中国能源建设</span>
          集团在京签署战略合作协议。协议签署前，
          中国石油集团董事长、党组书记戴厚良会见了中国能建集团董事长、党委书记宋海良，双方就深化合作交换了意见。
        </div>
      ),
      time: '2023-10-23',
    },
    {
      news: (
        <div>
          <span style={{ color: 'red' }}>中石油</span>、
          <span style={{ color: 'red' }}>中石化</span>
          等8家公司注册100亿共同成立华光海安集团。
        </div>
      ),
      time: '2023-11-21',
    },
    {
      news: (
        <div>
          <span style={{ color: 'red' }}>中国能建</span>发布吸收合并中国
          <span style={{ color: 'red' }}>葛洲坝</span>
          集团股份有限公司。
        </div>
      ),
      time: '2021-07-27',
    },
    {
      news: (
        <div>
          今日，<span style={{ color: 'red' }}>中石油</span>和
          <span style={{ color: 'red' }}>中石化</span>
          宣布了财报。两公司都在过去季度取得了出色的业绩，这一利好消息引发了投资者的乐观情绪，推动了其股票价格的上涨。
        </div>
      ),
      time: '2023-10-21',
    },
    {
      news: (
        <div>
          <span style={{ color: 'red' }}>东华能源</span>与
          <span style={{ color: 'red' }}>华锦股份</span>
          最新发布的市场报告显示，两家公司在同一产品线上争夺领先地位，竞争导致市场动荡。
        </div>
      ),
      time: '2023-11-29',
    },
    {
      news: (
        <div>
          <span style={{ color: 'red' }}>中国石化</span>宣布了一项对
          <span style={{ color: 'red' }}>东华能源</span>
          的大规模的投资计划。
        </div>
      ),
      time: '2023-11-16',
    },
    {
      news: (
        <div>
          <span style={{ color: 'red' }}>华锦股份</span>和
          <span style={{ color: 'red' }}>中国石油</span>
          因商业合作方面的分歧进入司法程序。纠纷涉及产品专利权和市场份额的争夺，此次纠纷引发了业界广泛关注。
        </div>
      ),
      time: '2023-09-17',
    },
  ];
  return (
    <BasicLayout>
      <div className={styles.leader_board}>
        <Title level={3}>
          <span className={styles.red}>HiDy</span> – A{' '}
          <span className={styles.red}>Hi</span>erarchical{' '}
          <span className={styles.red}>Dy</span>namic Knowledge Base (KB)
        </Title>
        <Title level={3} style={{ margin: 0 }}>
          <span className={styles.red}>HiDy</span> 一个层次动态知识库
        </Title>
        <Title level={2} style={{ marginTop: 0 }}>
          {/* More <span className={styles.red}>Diverse</span> Downstream
          Applications More <span className={styles.red}>Knowledge Types</span>{' '}
          in Four Hierarchy */}
          下游应用更加<span className={styles.red}>多样化</span>{' '}
          四个层次中的更多<span className={styles.red}>知识类型</span>
        </Title>
        <div className={styles.bottom}>
          <div className={styles.left_text}>
            <Title level={4} style={{ color: 'gray' }}>
              {/* Compare with existing public KBs */}
              与现有的公共知识库对比
            </Title>
            <div style={{ fontSize: 15, color: 'gray' }}>
              {/* Support up to */}
              最多支持
              <div style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                {/* 5 KB-Enhanced Applications */}
                5KB 增强型应用程序
              </div>
              {/* Existing KB only support at most 3 applications. */}
              现存的知识库最多只能支持3个应用程序
            </div>
            <div style={{ height: 20 }}></div>
            <div style={{ fontSize: 20, fontWeight: 'bold' }}>
              {/* Knowledge Types Cover 4 Economics Hierarchy */}
              知识类型涵盖4个经济学层次
            </div>
            {/* <div>Including Macro, Meso, Micro and Others</div> */}
            <div style={{ fontSize: 15, color: 'gray' }}>
              包括宏观、中观、微观和其他
            </div>
          </div>
          <div className={styles.right_chart}>
            <div
              id="bar_chart_container"
              style={{ height: '100%', width: '100%' }}
            ></div>
            {/* <Image src={KB_Compare} preview={false} height={400} /> */}
          </div>
        </div>
        <div className={styles.attributes}>
          {attributes_list.map((item) => {
            return <InfoCircleCard {...item} />;
          })}
        </div>
      </div>
      <div className={styles.table_container}>
        <Title level={3}>原始新闻</Title>
        <Table
          columns={columns}
          dataSource={table_data}
          pagination={false}
          bordered
        />
      </div>
      <div>
        <CenterModeSlider
          currentStatus={currentStatus}
          setCurrentStatus={setCurrentStatus}
        />
      </div>
      <div className={styles.graph_container}>
        <KGContainer
          data={dataList[currentStatus]}
          title={title_list[currentStatus]}
        ></KGContainer>
      </div>
      <div className={styles.api}>
        <Title level={3}>在线调用API</Title>
        您希望获取多久的数据？
        <Space>
          <Radio.Group
            options={options}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            optionType="button"
          />
          <Button type="primary" onClick={get_pipline}>
            调用接口
          </Button>
        </Space>
        <Spin spinning={spin}>
          <div className={styles.jsonArea}>
            <ReactJson
              src={res}
              enableClipboard={false}
              name={null}
              theme="monokai"
            ></ReactJson>
          </div>
        </Spin>
      </div>
    </BasicLayout>
  );
};

export default KB;
