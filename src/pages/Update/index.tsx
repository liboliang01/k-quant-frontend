import SubGraph from '@/components/SubGraph';
import updateData from '@/components/SubGraph/updateData';
import { Button, Input, Radio, RadioChangeEvent } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Richly from '../../../public/images/Richly.png';
import BasicLayout from '../../layout/BasicLayout';
import styles from './index.less';

const FinKGUpdate: React.FC = () => {
  const curId = useRef<number>(3);
  const [text, setText] = useState<[string, string]>(['', '']);
  const [currData, setCurrData] = useState<any>();
  const [value, setValue] = useState('origin');

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const getRandomText = () => {
    setValue('origin');
    let temp = curId.current;

    const data = updateData.find((item: { id: number }) => item.id === temp);
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

  const getSubGraph = (nodeName: string, relationType: string) => {
    let result = currData.origin.filter(function (node: any) {
      if (relationType === 'all') {
        if (node.source === nodeName && node.rela !== 'unknown') {
          return true;
        } else {
          return false;
        }
      }
      if (
        node.source === nodeName &&
        node.rela === relationType &&
        node.rela !== 'unknown'
      ) {
        return true;
      } else {
        return false;
      }
    });
    return result;
  };

  const extraData1 = useMemo(() => {
    if (currData && currData.extraction_1) {
      const list: any[] = [];
      currData.extraction_1.data.forEach(
        (item: { source: string; rela: any }) => {
          const data = getSubGraph(item.source, item.rela);
          list.push(...data);
        },
      );
      return list;
    } else {
      return [];
    }
  }, [currData]);

  const extraData2 = useMemo(() => {
    if (currData && currData.extraction_2) {
      const list: any[] = [];
      currData.extraction_2.data.forEach(
        (item: { source: string; rela: any }) => {
          const data = getSubGraph(item.source, item.rela);
          list.push(...data);
        },
      );
      return list;
    } else {
      return [];
    }
  }, [currData]);

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

  const fusionData = useMemo(() => {
    if (currData && currData.fusion) {
      const list: any[] = [];
      currData.fusion.forEach((item: { source: string; rela: any }) => {
        const data = getSubGraph(item.source, item.rela);
        list.push(...data);
      });
      return list;
    } else {
      return [];
    }
  }, [currData]);

  const newUpdateData = useMemo(() => {
    if (currData && currData.update && currData.origin) {
      const list: any[] = [];
      currData.update.forEach((item: { source: string; rela: any }) => {
        const data = getSubGraph(item.source, item.rela);
        list.push(...data);
      });
      return [...list, ...fusionData];
    } else {
      return [];
    }
  }, [currData, fusionData]);

  const renderData = useMemo(() => {
    switch (value) {
      case 'origin':
        return originData;
      case 'update':
        return newUpdateData;
      case 'fusion':
        return fusionData;
      default:
        return originData;
    }
  }, [originData, newUpdateData, fusionData, value]);

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
          <div className={styles.radios}>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value="origin">origin</Radio>
              <Radio value="extraction">extraction</Radio>
              <Radio value="fusion">fusion</Radio>
              <Radio value="update">update</Radio>
            </Radio.Group>
          </div>
        </div>
        <div>
          {value === 'extraction' ? (
            <div className={styles.extraction}>
              <div className={styles.graphs} style={{ marginRight: 20 }}>
                <SubGraph suits={extraData1} id="extra-graph-svg-container-1" />
              </div>
              <div className={styles.graphs}>
                <SubGraph suits={extraData2} id="extra-graph-svg-container-2" />
              </div>
            </div>
          ) : (
            <div className={styles.graphs}>
              <SubGraph suits={renderData} />
            </div>
          )}
        </div>
      </div>
    </BasicLayout>
  );
};

export default FinKGUpdate;
