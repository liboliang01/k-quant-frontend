import BasicLayout from '@/layout/BasicLayout';
import { ArrowRightOutlined, BorderOutlined } from '@ant-design/icons';
import { Carousel, Image, Typography } from 'antd';
import React, { useState } from 'react';
import KGContainer from '../../components/KG';
import InfoCircleCard from './InfoCircleCard';
import KB_Compare from './img/KB.png';
import entities from './img/entities.png';
import extraction from './img/extraction.png';
import fusion from './img/fusion.png';
import news from './img/news.png';
import relations from './img/relations.png';
import reports from './img/reports.png';
import types from './img/types.png';
import update from './img/update.png';
import years from './img/years.png';
import styles from './index.less';

const { Title, Paragraph, Text, Link } = Typography;

interface PropsType {
  title: string;
  subTitle: string;
  image: string;
  remarks: string;
}

const IntroductionCard = (props: PropsType) => {
  const { title, subTitle, image, remarks } = props;
  return (
    <div>
      <Title level={2}>{title}</Title>
      <Title level={4}>{subTitle}</Title>
      <Paragraph>
        <BorderOutlined />
        {remarks}
      </Paragraph>
      <div className={styles.image_container}>
        <Image src={image} preview={false} height={300}></Image>
      </div>
    </div>
  );
};

const introductions: PropsType[] = [
  {
    title: '基于人机协同与远程监督的知识提取方法',
    subTitle: '从非结构化数据中低成本提取高质量金融知识，与任务1.1对应',
    image: extraction,
    remarks:
      '专利： 基于人机协同与远程监督的知识提取方法及系统 (申请号： 2023105070160)',
  },
  {
    title: '基于数据源置信度推导的知识融合方法',
    subTitle: '对多种来源的金融数据实现动态的去冗消歧，与任务1.2对应',
    image: fusion,
    remarks:
      '论文:HIT-An Effective Approach to Build a Dynamic Financial Knowledge Base.（DASFAA 2023，CCF B类会议）',
  },
  {
    title: '基于数据源置信度推导的知识融合方法',
    subTitle: '对多种来源的金融数据实现动态的去冗消歧，与任务1.3对应',
    image: update,
    remarks:
      '专利：一种基于图规则挖掘的知识图谱更新系统(申请号：2023104765162)',
  },
];

const raw_news_list = [
  <div className={styles.item}>
    <div>
      国家能源局党组成员、副局长任京东主持会议并讲话，
      <span style={{ color: 'red' }}>中国石油</span>副总经理黄永章、
      <span style={{ color: 'red' }}>中国石化</span>
      副总经理喻宝才出席会议。（2023-04-04）
    </div>
    <div>
      <span style={{ color: 'red' }}>中国石油</span>集团与
      <span style={{ color: 'red' }}>中国能源建设</span>
      集团在京签署战略合作协议。协议签署前，
      中国石油集团董事长、党组书记戴厚良会见了中国能建集团董事长、党委书记宋海良，双方就深化合作交换了意见。（2023-10-23）
    </div>
  </div>,
  <div className={styles.item}>
    <div>
      <span style={{ color: 'red' }}>中石油</span>、
      <span style={{ color: 'red' }}>中石化</span>
      等8家公司注册100亿共同成立华光海安集团。（2023-11-21）
    </div>
    <div>
      <span style={{ color: 'red' }}>中国能建</span>发布吸收合并中国
      <span style={{ color: 'red' }}>葛洲坝</span>
      集团股份有限公司。（2021-07-27）
    </div>
  </div>,
  <div className={styles.item}>
    <div>
      今日，<span style={{ color: 'red' }}>中石油</span>和
      <span style={{ color: 'red' }}>中石化</span>
      宣布了财报。两公司都在过去季度取得了出色的业绩，这一利好消息引发了投资者的乐观情绪，推动了其股票价格的上涨。（2023-10-21）
    </div>
    <div>
      <span style={{ color: 'red' }}>东华能源</span>与
      <span style={{ color: 'red' }}>华锦股份</span>
      最新发布的市场报告显示，两家公司在同一产品线上争夺领先地位，竞争导致市场动荡。（2023-11-29）
    </div>
  </div>,
  <div className={styles.item}>
    <div>
      <span style={{ color: 'red' }}>中国石化</span>宣布了一项对
      <span style={{ color: 'red' }}>东华能源</span>
      的大规模的投资计划。（2023-11-16）
    </div>
    <div>
      <span style={{ color: 'red' }}>华锦股份</span>和
      <span style={{ color: 'red' }}>中国石油</span>
      因商业合作方面的分歧进入司法程序。纠纷涉及产品专利权和市场份额的争夺，此次纠纷引发了业界广泛关注。（2023-09-17）
    </div>
  </div>,
];

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
      '2': {
        name: '中国石油',
        type: '同名公司',
      },
      '3': {
        name: '中石油',
        type: '同名公司',
      },
      '4': {
        name: '中国石化 (600028)',
        type: '公司',
      },
      '5': {
        name: '中国石化',
        type: '同名公司',
      },
      '6': {
        name: '中石化',
        type: '同名公司',
      },
      '7': {
        name: '中国能源建设 (601868)',
        type: '公司',
      },
      '8': {
        name: '中国能源建设',
        type: '同名公司',
      },
      '9': {
        name: '中国能建',
        type: '同名公司',
      },
      '10': {
        name: '葛洲坝',
        type: '公司',
      },
      '11': {
        name: '东华能源 (002221)',
        type: '公司',
      },
      '12': {
        name: '东华能源',
        type: '同名公司',
      },
      '13': {
        name: '华锦股份 (000059)',
        type: '公司',
      },
      '14': {
        name: '华锦股份',
        type: '同名公司',
      },
    },
    links: [
      { source: 1, target: 2, rela: '同公司', type: '同公司' },
      { source: 1, target: 3, rela: '同公司', type: '同公司' },
      { source: 1, target: 4, rela: '同行、同涨、合作', type: '同行关系' },
      { source: 4, target: 5, rela: '同公司', type: '同公司' },
      { source: 4, target: 6, rela: '同公司', type: '同公司' },
      { source: 1, target: 7, rela: '合作', type: '合作' },
      { source: 7, target: 8, rela: '同公司', type: '同公司' },
      { source: 7, target: 9, rela: '同公司', type: '同公司' },
      { source: 7, target: 10, rela: '上级', type: '上级' },
      { source: 4, target: 11, rela: '投资', type: '投资' },
      { source: 11, target: 12, rela: '同公司', type: '同公司' },
      { source: 1, target: 13, rela: '纠纷', type: '纠纷' },
      { source: 13, target: 14, rela: '同公司', type: '同公司' },
    ],
  },
  {
    nodes: {
      '1': {
        name: '中国石油 (601857)',
        type: '公司',
      },
      '2': {
        name: '中国石油',
        type: '同名公司',
      },
      '3': {
        name: '中石油',
        type: '同名公司',
      },
      '4': {
        name: '中国石化 (600028)',
        type: '公司',
      },
      '5': {
        name: '中国石化',
        type: '同名公司',
      },
      '6': {
        name: '中石化',
        type: '同名公司',
      },
      '7': {
        name: '中国能源建设 (601868)',
        type: '公司',
      },
      '8': {
        name: '中国能源建设',
        type: '同名公司',
      },
      '9': {
        name: '中国能建',
        type: '同名公司',
      },
      '10': {
        name: '葛洲坝',
        type: '公司',
      },
      '11': {
        name: '东华能源 (002221)',
        type: '公司',
      },
      '12': {
        name: '东华能源',
        type: '同名公司',
      },
      '13': {
        name: '华锦股份 (000059)',
        type: '公司',
      },
      '14': {
        name: '华锦股份',
        type: '同名公司',
      },
    },
    links: [
      { source: 1, target: 2, rela: '同公司', type: '同公司' },
      { source: 1, target: 3, rela: '同公司', type: '同公司' },
      { source: 1, target: 4, rela: '同行、同涨、合作', type: '同行关系' },
      { source: 4, target: 5, rela: '同公司', type: '同公司' },
      { source: 4, target: 6, rela: '同公司', type: '同公司' },
      { source: 1, target: 7, rela: '合作、同行', type: 'update' },
      { source: 7, target: 8, rela: '同公司', type: '同公司' },
      { source: 7, target: 9, rela: '同公司', type: '同公司' },
      { source: 7, target: 10, rela: '上级', type: '上级' },
      { source: 4, target: 11, rela: '投资', type: '投资' },
      { source: 11, target: 12, rela: '同公司', type: '同公司' },
      { source: 1, target: 13, rela: '纠纷', type: '纠纷' },
      { source: 13, target: 14, rela: '同公司', type: '同公司' },
    ],
  },
];

const attributes_list = [
  {
    name: 'ENTITIES',
    number: '51,000+',
    image: entities,
  },
  {
    name: 'RELATIONS',
    number: '492,600+',
    image: relations,
  },
  {
    name: 'RESEARCH REPORTS',
    number: '50,000+',
    image: reports,
  },
  {
    name: 'FINANCIAL NEWS',
    number: '2,000,000+',
    image: news,
  },
  {
    name: 'TYPES OF RELATIONS',
    number: '20+',
    image: types,
  },
  {
    name: 'YEARS DATA',
    number: '5+',
    image: years,
  },
];

const KB: React.FC = () => {
  const [currentStatus, setCurrentStatus] = useState<number>(0);

  const changeStatus = (s: number) => {
    setCurrentStatus(s);
  };

  return (
    <BasicLayout>
      <div className={styles.leader_board}>
        <Title level={3}>
          <span className={styles.red}>HiDy</span> – A{' '}
          <span className={styles.red}>Hi</span>erarchical{' '}
          <span className={styles.red}>Dy</span>namic Knowledge Base (KB)
        </Title>
        <Title level={2}>
          More <span className={styles.red}>Diverse</span> Downstream
          Applications More <span className={styles.red}>Knowledge Types</span>{' '}
          in Four Hierarchy
        </Title>
        <div className={styles.bottom}>
          <div className={styles.left_text}>
            <Title level={4} style={{ color: 'gray' }}>
              Compare with existing public KBs
            </Title>
            <div style={{ fontSize: 15, color: 'gray' }}>
              Support up to
              <div style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                5 KB-Enhanced Applications
              </div>
              Existing KB only support at most 3 applications.
            </div>
            <div style={{ height: 20 }}></div>
            <div style={{ fontSize: 20, fontWeight: 'bold' }}>
              Knowledge Types Cover 4 Economics Hierarchy
            </div>
            <div>Including Macro, Meso, Micro and Others</div>
          </div>
          <div>
            <Image src={KB_Compare} preview={false} height={400} />
          </div>
        </div>
        <div className={styles.attributes}>
          {attributes_list.map((item) => {
            return <InfoCircleCard {...item} />;
          })}
        </div>
      </div>
      <div className={styles.pipeline_container}>
        <div className={styles.left}>
          <div className={styles.status_line}>
            <div
              className={`${styles.title} ${
                currentStatus === 0 && styles.current
              }`}
              onClick={() => changeStatus(0)}
            >
              知识抽取
            </div>
            <ArrowRightOutlined />
            <div
              className={`${styles.title} ${
                currentStatus === 1 && styles.current
              }`}
              onClick={() => changeStatus(1)}
            >
              知识融合
            </div>
            <ArrowRightOutlined />
            <div
              className={`${styles.title} ${
                currentStatus === 2 && styles.current
              }`}
              onClick={() => changeStatus(2)}
            >
              知识更新
            </div>
          </div>
          <IntroductionCard
            title={introductions[currentStatus].title}
            subTitle={introductions[currentStatus].subTitle}
            image={introductions[currentStatus].image}
            remarks={introductions[currentStatus].remarks}
          />
          <div className={styles.raw_news}>
            <div style={{ fontWeight: 'bold' }}>原始新闻</div>
            <Carousel autoplay infinite className={styles.carousel}>
              {raw_news_list.map((item) => {
                return item;
              })}
            </Carousel>
          </div>
        </div>
        <div className={styles.right}>
          <KGContainer data={dataList[currentStatus]}></KGContainer>
        </div>
      </div>
    </BasicLayout>
  );
};

export default KB;
