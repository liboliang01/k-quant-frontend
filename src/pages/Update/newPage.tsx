import updateData from '@/components/SubGraph/updateData';
import {
  Anchor,
  Button,
  Divider,
  List,
  Popover,
  Radio,
  Space,
  Spin,
  Table,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { useCallback, useMemo, useState } from 'react';
import ReactJson from 'react-json-view';
import LeaderBoard from '../../../public/images/kg_lead_board.jpg';
import BasicLayout from '../../layout/BasicLayout';
import companyName from '../Explainer/company_full_name.json';
import styles from './index.less';

interface DataType {
  source: string;
  target: string;
  rela: string;
  time: string;
}

const relationMap = {
  be_increased_holding: '被增持',
  rise: '同涨',
  cooperate: '合作',
  superior: '上级',
  supply: '供应',
  fall: '同跌',
  dispute: '纠纷',
  increase_holding: '增持',
  invest: '投资',
  same_industry: '同行',
  be_supplied: '被供应',
  be_reduced_holding: '被减持',
  compete: '竞争',
};

const FinKGUpdate: React.FC = () => {
  //   const [currentStatus, setCurrentStatus] = useState<number>(0);
  const [value, setValue] = useState('7');
  const [res, setRes] = useState([]);
  const [spin, setSpin] = useState(false);
  const rawTextData = useMemo(() => {
    const list: string[] = [];
    updateData.forEach((item) => {
      list.push(item.extraction_1.sentence);
      list.push(item.extraction_2.sentence);
    });
    return list;
  }, []);

  const originTextData = useMemo(() => {
    const list: any[] = [];
    updateData.forEach((item) => {
      list.push(...item.origin);
    });
    return list;
  }, []);

  const extractTextData = useMemo(() => {
    const list: any[] = [];
    updateData.forEach((item) => {
      list.push(...item.extraction_1.data);
      list.push(...item.extraction_2.data);
    });
    return list;
  }, []);

  const fusionTextData = useMemo(() => {
    const list: any[] = [];
    updateData.forEach((item) => {
      list.push(...item.fusion);
    });
    return list;
  }, []);

  const updateTextData = useMemo(() => {
    const list: any[] = [];
    updateData.forEach((item) => {
      const origin = item.origin;
      const update = item.update;
      const relation = 'same_industry';
      const sameIndustryList = origin.filter(
        (item: { rela: string }) => item.rela === relation,
      );
      const updateList: {
        target: any;
        source: any;
        tag: string;
        rela: string;
      }[] = [];
      update.forEach((item: { target: any; source: any }) => {
        const { target, source } = item;
        sameIndustryList.forEach((item) => {
          const s = item.source;
          const t = item.target;
          if (target === s) {
            updateList.push({
              target: t,
              source,
              tag: 'fusion',
              rela: item.rela,
            });
          } else if (target === t) {
            updateList.push({
              target: s,
              source,
              tag: 'fusion',
              rela: item.rela,
            });
          } else if (source === t) {
            updateList.push({
              target,
              source: s,
              tag: 'fusion',
              rela: item.rela,
            });
          } else if (source === s) {
            updateList.push({
              target,
              source: t,
              tag: 'fusion',
              rela: item.rela,
            });
          }
        });
      });
      list.push(...updateList);
      list.push(...update);
    });
    return list;
  }, []);

  const stockNameMap = useMemo(() => {
    const map = new Map();
    companyName.forEach((item) => {
      const code = item.code.split('.')[0];
      map.set(code, item.name);
    });
    return map;
  }, [companyName]);

  const columns: ColumnsType<DataType> = [
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      render: (text) => stockNameMap.get(text.split('.')[0]) + '[' + text + ']',
    },
    {
      title: '目标',
      dataIndex: 'target',
      key: 'target',
      render: (text) => stockNameMap.get(text.split('.')[0]) + '[' + text + ']',
    },
    {
      title: '关系',
      dataIndex: 'rela',
      key: 'rela',
      render: (text: 'rise') => relationMap[text] || '',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  const anchorInfo = useMemo(() => {
    return [
      {
        key: '1',
        href: '#anchor_origin',
        title: '原始数据',
      },
      {
        key: '2',
        href: '#anchor_rawText',
        title: '待抽取原始文本',
      },
      {
        key: '3',
        href: '#anchor_extract',
        title: '数据抽取',
      },
      {
        key: '4',
        href: '#anchor_fusion',
        title: '数据融合',
      },
      {
        key: '5',
        href: '#anchor_update',
        title: '数据更新',
      },
      {
        key: '6',
        href: '#anchor_api',
        title: '在线调用API',
      },
    ];
  }, []);

  const get_pipline = useCallback(async () => {
    setSpin(true);
    const res = await axios.get(
      `http://47.106.95.15:8000/get_static_pipiline/?duration=${value}`,
    );
    const j_res = JSON.parse(res.data.data);
    setRes(j_res);
    setSpin(false);
  }, [value]);

  const options = [
    { label: '最近一周', value: '7' },
    { label: '最近半个月', value: '15' },
    { label: '最近一个月', value: '30' },
  ];

  const content = (
    <div>
      <p>
        <a
          href="https://www.biendata.xyz/competition/ccks_2020_3/"
          target="_blank"
        >
          CCKS 2020
        </a>
      </p>
      <p>
        <a href="https://aclanthology.org/P18-4009/" target="_blank">
          DCFEE
        </a>
      </p>
      <p>
        <a href="https://aclanthology.org/D19-1032/" target="_blank">
          Doc2EDAG
        </a>
      </p>
      <p>
        <a href="https://aclanthology.org/2022.naacl-main.291/" target="_blank">
          DuEE-Fin
        </a>
      </p>
      <p>
        <a href="https://arxiv.org/abs/2109.02592" target="_blank">
          Shanghai Tech University KG
        </a>
      </p>
      <p>
        <a
          href="https://direct.mit.edu/dint/article/3/3/418/106758/Data-Set-and-Evaluation-of-Automated-Construction"
          target="_blank"
        >
          FR2KG
        </a>
      </p>
    </div>
  );

  return (
    <BasicLayout>
      <div  className={styles.leaderBoard}style={{ textAlign: 'center' }}>
        <img src={LeaderBoard} style={{ height:'80%' }} />
        <Popover
          content={content}
          title="引用列表"
          trigger="click"
          placement="right"
        >
          <Button>查看引用</Button>
        </Popover>
      </div>
      <div className={styles.container2}>
        <div className={styles.timeline}>
          {/* <Timeline items={timelineItem} /> */}
          <Anchor
            affix={true}
            items={anchorInfo}
            targetOffset={window.innerHeight / 2}
            onClick={(e) => e.preventDefault()}
            offsetTop={100}
          />
        </div>
        <div className={styles.table}>
          <div id="anchor_origin">
            <Divider orientation="left">原始数据</Divider>
            <Table columns={columns} dataSource={originTextData} />
          </div>
          <div id="anchor_rawText">
            <Divider orientation="left">待抽取原始文本</Divider>
            <List
              header={null}
              footer={null}
              bordered
              dataSource={rawTextData}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </div>
          <div id="anchor_extract">
            <Divider orientation="left">抽取后数据</Divider>
            <Table
              columns={columns}
              dataSource={extractTextData}
              pagination={false}
            />
          </div>
          <div id="anchor_fusion">
            <Divider orientation="left">融合后数据</Divider>
            <Table
              columns={columns}
              dataSource={fusionTextData}
              pagination={false}
            />
          </div>
          <div id="anchor_update">
            <Divider orientation="left">更新后数据</Divider>
            <Table columns={columns} dataSource={updateTextData} />
          </div>
          <div id="anchor_api">
            <Divider orientation="left">在线调用API</Divider>
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
        </div>
      </div>
    </BasicLayout>
  );
};

export default FinKGUpdate;
