import { Typography } from 'antd';
import React from 'react';
import BasicLayout from '../../layout/BasicLayout';

const { Title, Paragraph, Text } = Typography;

const FinKGUpdate: React.FC = () => {
  return (
    <BasicLayout>
      <>
        <Title level={2}>Coming Soon</Title>
        <Text strong style={{ fontSize: 20 }}>
          The explainable module will be supported next;
        </Text>
        <br />
        <Text strong style={{ fontSize: 20 }}>
          More and more APIs will be supported next:
        </Text>
        <Paragraph>
          <ul>
            <li>Knowledge extraction API (company relationship and event)</li>
            <li>Knowledge fusion API</li>
            <li>KB storage API (data saving in RDF file through simple API)</li>
            <li>
              KB access API (query triples in RDF file written in SPARQL
              language)
            </li>
            <li>
              KB update API (SOTA KB update default 100 days frequency with rule
              learning and selection)
            </li>
          </ul>
        </Paragraph>
        <Title level={2}>Publications</Title>
        <Paragraph>
          <ul>
            <li>
              Xinyi Zhu, Hao Xin, Yanyan Shen, Lei Chen, &quot;HIT - An
              Effective Approach to Build a Dynamic Financial Knowledge
              Base&quot;, DASFAA 2023 (To appear).
            </li>
            <li>
              Zhifeng Jia, Haoyang Li, Lei Chen, &quot;AIR: Adaptive Incremental
              Embedding Updating for Dynamic Knowledge Graphs&quot;, DASFAA 2023
              (To appear).
            </li>
            <li>KB storage API (data saving in RDF file through simple API)</li>
            <li>
              Xinyi Zhu, Liping Wang, Hao Xin, Xiaohan Wang, Zhifeng Jia, Jiyao
              Wang, Chunming Ma, Yuxiang Zeng, &quot;T-FinKB: A Platform of
              Temporal Financial Knowledge Base Construction&quot;, ICDE
              Demonstration Track 2023 (To appear).
            </li>
            <li>
              Liping Wang, Yanyan Shen, Lei Chen, “TE-DyGE: Temporal
              Evolution-enhanced Dynamic Graph Embedding Networks”, DASFAA 2023
              (To appear).
            </li>
          </ul>
        </Paragraph>
      </>
    </BasicLayout>
  );
};

export default FinKGUpdate;
