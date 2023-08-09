import SubGraph from '@/components/SubGraph';
import updateData from '@/components/SubGraph/updateData';
import { Button, Carousel, Input } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Richly from '../../../public/images/Richly.png';
import BasicLayout from '../../layout/BasicLayout';
import styles from './index.less';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '700px',
  // color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const FinKGUpdate: React.FC = () => {
  const curId = useRef<number>(1);
  const [text, setText] = useState<[string, string]>(['', '']);
  const [currData, setCurrData] = useState<any>();

  const getRandomText = () => {
    let temp = curId.current;

    const data = updateData.find((item) => item.id === temp);
    if (data) {
      setCurrData(data);
      setText([data.extraction_1.sentence, data.extraction_2.sentence]);
    }
    temp = (temp % 5) + 1;
    curId.current = temp;
  };

  useEffect(() => {
    getRandomText();
  }, []);

  const originData = useMemo(() => {
    if (currData && currData.origin) {
      return currData.origin.map((item: { rela: any }) => ({
        ...item,
        type: item.rela,
      }));
    } else {
      return [];
    }
  }, [currData]);

  return (
    <BasicLayout>
      <div style={{ textAlign: 'center' }}>
        <img src={Richly} style={{ width: '60%' }} />
      </div>
      <div className={styles.container}>
        <div className={styles.text}>
          <Button type="primary" onClick={getRandomText}>
            Get Random Instance
          </Button>
          <div className={styles.textarea}>
            <Input.TextArea
              rows={4}
              disabled
              value={text[0]}
              style={{ marginRight: 20, color: 'black' }}
            />
            <Input.TextArea
              rows={4}
              disabled
              value={text[1]}
              style={{ color: 'black' }}
            />
          </div>
        </div>
        <div className={styles.graphs}>
          <Carousel dotPosition={'top'}>
            <div style={contentStyle}>
              <SubGraph suits={originData} />
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div>
      </div>
    </BasicLayout>
  );
};

export default FinKGUpdate;
