import { DownOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadHyperspacePreset } from 'tsparticles-preset-hyperspace';
import styles from './index.less';

const description = [
  'Financial Knowledge Extraction and Update, Stock Price/Trend Prediction. ',
  'Incremental Update of Investment Model. ',
  'Backtesting, Stock Selection, Robotic Portifolio, Portifolio Scoring. ',
];

const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success');
    }, time);
  });
};

const Welcome: React.FC = () => {
  const [curStr, setCurStr] = useState<string>();
  const customInit = async (engine: Engine): Promise<void> => {
    await loadHyperspacePreset(engine);
  };

  const start = () => {
    history.push('/kquant');
  };

  const splitStr = async (idx: number) => {
    const str = description[idx];
    const len = str.length;
    for (let i = 0; i < len + 1; i++) {
      setCurStr(str.slice(0, i) + '|');
      await sleep(100);
    }
    await sleep(1000);
    for (let i = len; i > 0; i--) {
      setCurStr(str.slice(0, i) + '|');
      await sleep(60);
    }
    splitStr((idx + 1) % 3);
  };

  useEffect(() => {
    splitStr(0);
  }, []);

  return (
    <>
      <div className={styles.welcomeContainer}>
        <Particles
          options={{
            preset: 'hyperspace',
          }}
          init={customInit}
        />
        <div className={styles.titleBox}>
          <div className={styles.title}>K-QUANT</div>
          <div className={styles.subtitle}>Your Personal Financial Advisor</div>
          <div>{curStr}</div>
          <Button
            type="dashed"
            ghost
            style={{ color: 'white', marginTop: 20 }}
            onClick={start}
          >
            Start Now
          </Button>
        </div>
        <div className={styles.downBtn}>
          <DownOutlined />
        </div>
      </div>
      <div className={styles.box}>11111</div>
    </>
  );
};

export default Welcome;
