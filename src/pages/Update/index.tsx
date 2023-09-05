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
  const ref = useRef<HTMLDivElement>(null);

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
    temp = (temp % 4) + 1;
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

  const extraData1 = useMemo(() => {
    if (currData && currData.extraction_1) {
      return currData.extraction_1.data.map((item: { rela: any }) => ({
        ...item,
        type: item.rela,
      }));
    } else {
      return [];
    }
  }, [currData]);

  const extraData2 = useMemo(() => {
    if (currData && currData.extraction_2) {
      return currData.extraction_2.data.map((item: { rela: any }) => ({
        ...item,
        type: item.rela,
      }));
    } else {
      return [];
    }
  }, [currData]);

  const fusionData = useMemo(() => {
    if (currData && currData.fusion) {
      const list = currData.fusion.map(
        (item: { source: string; rela: any }) => ({
          ...item,
          type: item.rela,
        }),
      );
      return list;
    } else {
      return [];
    }
  }, [currData]);

  const newUpdateData = useMemo(() => {
    if (currData && currData.update && originData) {
      const list = currData.update.map(
        (item: { source: string; rela: any }) => ({
          ...item,
          type: item.rela,
          tag: 'fusion',
        }),
      );
      const relation = 'same_industry';
      const sameIndustryList = originData.filter(
        (item: { rela: string }) => item.rela === relation,
      );
      const updateList: {
        target: any;
        source: any;
        tag: string;
        type: string;
      }[] = [];
      list.forEach((item: { target: any; source: any }) => {
        const { target, source } = item;
        sameIndustryList.forEach(
          (item: { source: any; target: any; type: string }) => {
            const s = item.source;
            const t = item.target;
            if (target === s) {
              updateList.push({
                target: t,
                source,
                tag: 'fusion',
                type: item.type,
              });
            } else if (target === t) {
              updateList.push({
                target: s,
                source,
                tag: 'fusion',
                type: item.type,
              });
            } else if (source === t) {
              updateList.push({
                target,
                source: s,
                tag: 'fusion',
                type: item.type,
              });
            } else if (source === s) {
              updateList.push({
                target,
                source: t,
                tag: 'fusion',
                type: item.type,
              });
            }
          },
        );
      });
      return [...originData, ...updateList, ...list];
    } else {
      return [];
    }
  }, [currData, originData]);

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

  const width = ref.current?.clientWidth;
  console.log(currData);

  return (
    <BasicLayout>
      <div style={{ textAlign: 'center' }}>
        <img src={Richly} style={{ width: '60%' }} />
      </div>
      <div className={styles.container}>
        <div className={styles.text}>
          <Button type="primary" onClick={getRandomText}>
            切换示例
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
              <Radio value="origin">原始数据（origin）</Radio>
              <Radio value="extraction">知识抽取（extraction）</Radio>
              <Radio value="fusion">知识融合（fusion）</Radio>
              <Radio value="update">更新后数据（update）</Radio>
            </Radio.Group>
          </div>
          <div style={{ marginTop: 10, color: 'gray' }}>
            抽取得到的数据将加粗展示
          </div>
        </div>
        <div>
          {value === 'extraction' ? (
            <div className={styles.extraction}>
              <div className={styles.graphs} style={{ marginRight: 20 }}>
                <SubGraph
                  suits={extraData1}
                  id="extra-graph-svg-container-1"
                  width={width && width / 2}
                />
              </div>
              <div className={styles.graphs}>
                <SubGraph
                  suits={extraData2}
                  id="extra-graph-svg-container-2"
                  width={width && width / 2}
                />
              </div>
            </div>
          ) : (
            <div className={styles.graphs} ref={ref}>
              <SubGraph suits={renderData} width={width} />
            </div>
          )}
        </div>
      </div>
    </BasicLayout>
  );
};

export default FinKGUpdate;
