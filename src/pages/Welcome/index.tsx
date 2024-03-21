import DescCard from '@/components/DescCard';
import Footer from '@/components/Footer';
import LeaderCard from '@/components/LeaderCard';
import SchoolCard from '@/components/SchoolCard';
import { DownOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Image } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import type { Engine } from 'tsparticles-engine';
import { loadHyperspacePreset } from 'tsparticles-preset-hyperspace';
import DynamicTitle from './dynamicTitle';
import styles from './index.less';

const description = [
  'Financial Knowledge Extraction and Update, Stock Price/Trend Prediction. ',
  'Incremental Update of Investment Model. ',
  'Backtesting, Stock Selection, Robotic Portifolio, Portifolio Scoring. ',
];

const pythonScript = [
  'git clone https://github.com/K-Quant/HiDy.git',
  'cd HiDy',
  'pip install -r requirements.txt',
];

const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success');
    }, time);
  });
};

const ChenLeiDesc = [
  'Chair Professor, Department of Computer Science and Engineering',
  'Director of HKUST Big Data Institute',
  'Director of MOE/MSRA Information Technology Key Laboratory',
  'Associate Director of Brain and Intelligence Research Institute',
  'Associate Director of GREAT Smart Cities Institute',
  ' Associate Director of HKUST The Big Data for Bio Intelligence Laboratory',
  'Associate Director of HKUST-DiDi Joint Research Lab',
  'Associate Director of HKUST-NAVER/LINE AI Lab',
  'Associate Director of HKUST-Xiaoi Robot Joint Lab on Machine Learning and Cognitive Reasoning',
];

const ShenYanDesc = [
  'The First Prize of Technical Invention in Shanghai in 2020',
  'ACM SIGMOD China Rising Star Award',
  'DASFAA 2020 Best Paper Nomination Award',
  'APWeb-WAIM 2018 Best Student Paper Award',
  'Database Top International Journal VLDBJ Guest Editor',
  'VLDB Deputy Editor',
  'Served as a PC for more than 10 top-level conferences in the field of database and artificial intelligence',
];

const PaperList = [
  '"Triple-d: Denoising Distant Supervision for High-quality Data Creation." ICDE, 2024.',
  '"HIT-An Effective Approach to Build a Dynamic Financial Knowledge Base."  DASFAA. 2023',
  '"T-FinKB: A Platform of Temporal Financial Knowledge Base Construction." ICDE, 2023.',
  '"TE-DyGE: Temporal Evolution-Enhanced Dynamic Graph Embedding Network." DASFAA, 2023.',
  '"Orca: Scalable Temporal Graph Neural Network Training with Theoretical Guarantees", SIGMOD, 2022.',
  '"HENCE-X: Toward Heterogeneity-agnostic Multi-level Explainability for Deep Graph Networks", VLDB, 2023.',
  '"On Data-Aware Global Explainability of Graph Neural Networks", VLDB, 2023.',
];

const PatentList = [
  '基于人机协同与远程监督的知识提取方法及系统',
  '基于图规则挖掘的知识图谱更新系统',
  '基于网络表格的知识图谱补全方法及系统',
  '一种图神经网络动态更新方法、装置、设备及介质',
  '基于多维特征混合的轻量级量化投资模型构建方法和系统',
  '基于动态集成异构深度学习模型的股票预测方法及系统',
];

const futureList = [
  'Multi-modal vector database',
  'Retrieval-Augmented Generation for Finance',
  'LLM in Alpha Mining, Portfolio construction',
  'Update and continue learning of temporal knowledge graph',
  '…',
];

const Welcome: React.FC = () => {
  const [curStr, setCurStr] = useState<string>();
  const customInit = async (engine: Engine): Promise<void> => {
    await loadHyperspacePreset(engine);
  };

  const start = () => {
    history.push('/kquant');
  };

  const splitStr = async (idx: number) => {
    const str = pythonScript[idx];
    const len = str.length;
    for (let i = 0; i < len + 1; i++) {
      setCurStr(str.slice(0, i) + '|');
      await sleep(100);
    }
    await sleep(1000);
    for (let i = len; i > 0; i--) {
      setCurStr(str.slice(0, i) + '|');
      await sleep(30);
    }
    splitStr((idx + 1) % 3);
  };

  useEffect(() => {
    splitStr(0);
  }, []);

  const windowHeight = useMemo(() => {
    return window.innerHeight;
  }, []);

  const scrollDown = () => {
    window.scrollTo({ top: windowHeight, left: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: 'black' }}>
      {/* <div className={styles.anchor}>
        <Anchor
          affix={false}
          showInkInFixed={true}
          items={[
            {
              key: 'welcome',
              href: '#welcome',
              title: <p style={{ color: 'white' }}>K-QUANT</p>,
            },
            {
              key: 'what_we_do',
              href: '#what_we_do',
              title: <p style={{ color: 'white' }}>What We Do</p>,
            },
            {
              key: 'our_process',
              href: '#our_process',
              title: <p style={{ color: 'white' }}>Our Process</p>,
            },
            {
              key: 'meet_our_group',
              href: '#meet_our_group',
              title: <p style={{ color: 'white' }}>Meet Our Group</p>,
            },
            {
              key: 'who_is_using_our_data',
              href: '#who_is_using_our_data',
              title: <p style={{ color: 'white' }}>Who Is Using Our Data</p>,
            },
          ]}
        />
      </div> */}
      <div
        className={styles.welcomeContainer}
        id="welcome"
        style={{ backgroundColor: 'black' }}
      >
        {/* <Particles
          options={{
            preset: 'hyperspace',
          }}
          init={customInit}
        /> */}
        <div className={styles.titleBox}>
          <div className={styles.subtitle}>Your Personal Financial Advisor</div>
          <div style={{ color: '#722ed1', fontWeight: 'bold' }}>
            Financial Knowledge Extraction and Update, Stock Price/Trend
            Prediction, Incremental Update of Investment Model, Backtesting,
            Stock Selection, Robotic Portifolio, Portifolio Scoring.
          </div>
          <DynamicTitle />
          <div className={styles.code}>
            <span style={{ fontWeight: 'bold', color: '#1677ff' }}>
              <span style={{ color: '#722ed1' }}>~/k-quant</span> (master){' '}
            </span>
            {curStr}
          </div>
          <Button
            type="dashed"
            ghost
            style={{ color: 'white', marginTop: 20 }}
            onClick={start}
          >
            Start Now
          </Button>
          <div className={`${styles.downBox} animate__bounce`}>
            <DownOutlined className={styles.downBtn} onClick={scrollDown} />
          </div>
        </div>
      </div>
      {/* <div className={styles.box1} id="what_we_do">
        <div className={styles.whatWeDo}>
          <p style={{ color: '#1677ff', marginBottom: 0 }}>WHAT WE DO</p>
          <h2>
            We provide expert financial advice for businesses and individuals
          </h2>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Image
              height={400}
              src="images/demo_overview.png"
              preview={false}
            />
          </div>
          <div style={{ fontWeight: 'bolder' }}>
            Our fintech platform provides a rich data source including
            fundamental time series and multiple types of alternative data.
            Also, we provide a stock selection and robotic advisor for
            businesses and individuals to catch up good stock pool and
            self-defined stock portfolio. We also provide the complete workflow
            of obtaining data, multi-modal model prediction and backtesting.
          </div>
        </div>
      </div> */}
      <div className={styles.box2} id="competitions">
        <div className={styles.competitions}>
          <h1 style={{ marginBottom: 20 }}>Competition</h1>
          <div className={styles.competitions_box}>
            <div style={{ fontSize: 25 }}>
              <ul>
                <li>
                  2023 Fintech Olympiad{' '}
                  <span style={{ fontWeight: 'bold' }}>Sliver Award</span>
                </li>
                <Image height={200} src="images/award2.jpg" />
                <li>
                  2023 Hong Kong Fintech Award{' '}
                  <span style={{ fontWeight: 'bold' }}>Sliver Award</span>
                </li>
                <Image height={200} src="images/award1.jpg" />
              </ul>
            </div>
            <div style={{ marginRight: 20 }}>
              <Image
                height={400}
                src="images/competitions.png"
                preview={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.box2} id="achievement">
        <div className={styles.competitions}>
          <h1 style={{ marginBottom: 20 }}>Achievement</h1>
          <div className={styles.achievement_box}>
            <p style={{ color: '#1677ff', marginBottom: 0 }}>Research paper</p>
            <ul>
              {PaperList.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
            <p style={{ color: '#1677ff', marginBottom: 0 }}>Patent</p>
            <ul>
              {PatentList.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.box2} id="future">
        <div className={styles.competitions}>
          <h1 style={{ marginBottom: 20 }}>Future Research Directions</h1>
          <div className={styles.achievement_box}>
            <ul>
              {futureList.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.box2} id="our_process">
        <div className={styles.ourProcess}>
          <h1>Our Process</h1>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginRight: '10px',
            }}
          >
            <h2 style={{ textAlign: 'start' }}>Knowledge Graph</h2>
            <Button
              type="dashed"
              ghost
              style={{ color: 'white', marginTop: 20 }}
              onClick={() => history.push('/query')}
            >
              Read More
            </Button>
          </div>
          <div className={styles.cardContent}>
            <DescCard desc={'Entities'} title={'30,000+'} />
            <DescCard desc={'Relations'} title={'20+'} />
            <DescCard desc={'Short term Events'} title={'4,000+'} />
            <DescCard desc={'High-frequency Events'} title={'10+'} />
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginRight: '10px',
            }}
          >
            <h2 style={{ textAlign: 'start' }}>All available data sources</h2>
            <Button
              type="dashed"
              ghost
              style={{ color: 'white', marginTop: 20 }}
              onClick={() => history.push('/datasources')}
            >
              Read More
            </Button>
          </div>

          <div className={styles.cardContent}>
            <DescCard desc={'Time-series Data'} title={'5 years+'} />
            <DescCard desc={'Financial News'} title={'2,000,000+'} />
            <DescCard desc={'Factors'} title={'60+'} />
            <DescCard desc={'Research Reports'} title={'50,000+'} />
          </div>
        </div>
      </div>
      <div className={styles.box3} id="meet_our_group">
        <div className={styles.meetOurGroup}>
          <p style={{ color: '#1677ff', marginBottom: 0 }}>MEET OUR GROUP</p>
          <h1>Group Head</h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ flexBasis: '45%' }}>
              <LeaderCard
                name="Prof. Lei Chen"
                icon="images/boss.png"
                subTitle="Dean, Information Hub, HKUST (Guangzhou)"
                descList={ChenLeiDesc}
              />
            </div>
            <div style={{ flexBasis: '45%' }}>
              <LeaderCard
                name="Prof. Yanyan Shen"
                icon="images/bossShen.png"
                subTitle="Associate Professor,Shanghai Jiao Tong University"
                descList={ShenYanDesc}
              />
            </div>
          </div>
          <h1 style={{ marginTop: '50px' }}>Group Members</h1>
          <div className={styles.cardContent}>
            <DescCard desc={'Postdoc'} title={'Yuxiang Zeng'} />
            <DescCard desc={'Ph.D student'} title={'Zhifeng Jia'} />
            <DescCard desc={'Ph.D student'} title={'Hao Wang'} />
          </div>
          <div className={styles.cardContent}>
            <DescCard desc={'Ph.D student'} title={'Liping Wang'} />
            <DescCard desc={'Ph.D student'} title={'Hao Xin'} />
            <DescCard desc={'Ph.D student'} title={'Xinyi Zhu'} />
          </div>
          <div className={styles.cardContent}>
            <DescCard desc={'MPhil student'} title={'Zhizhuo Kou'} />
            <DescCard desc={'MPhil student'} title={'Jiawei Li'} />
            <DescCard desc={'R.A.'} title={'Xiaohan Wang'} />
          </div>
          <div className={styles.cardContent}>
            <DescCard desc={'R.A.'} title={'Boliang Li'} />
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div className={styles.box4} id="who_is_using_our_data">
        <div className={styles.whoIsUsingOurData}>
          <p style={{ color: '#1677ff', marginBottom: 0 }}>
            WHO IS USING OUR DATA
          </p>
          <h1>Users</h1>
          <div className={styles.cardContent}>
            <SchoolCard name="HKUST" icon="images/HKUST.jpg" />
            <SchoolCard name="HKUST_GZ" icon="images/HKUST.jpg" />
            <SchoolCard name="SJTU" icon="images/SJTU.jpg" />
            <SchoolCard name="CSMAR" icon="images/csmar.png" />
          </div>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );
};

export default Welcome;
