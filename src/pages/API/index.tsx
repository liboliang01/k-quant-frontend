import {
  BugTwoTone,
  CloudTwoTone,
  CodeTwoTone,
  DeploymentUnitOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import ApiModal from './ApiModal';
import styles from './index.less';

const APIDataList = [
  {
    img: <BugTwoTone />,
    description: '爬取CCTV新闻',
    tags: ['crawler'],
    url: '/api/crawler/v1/get_cctv_news',
    params: [
      {
        name: 'required_days',
        type: 'number',
        desc: 'the days you want to get',
        defaultVal: 3,
      },
    ],
    response: {
      data: [
        {
          content:
            '8月21日凌晨，四川凉山州金阳县因强降雨突发山洪，造成沿江高速JN1标段项目部钢筋加工场部分人员死亡、失联。获悉相关情况后，中共中央总书记、国家主席、中央军委主席习近平作出重要指示，要求全力搜寻失联人员，妥善做好家属安抚等善后工作；国务院要派出工作组，全面开展调查，依法严肃处理相关责任人；要深刻汲取教训、举一反三，全面排查问题，压实各方责任，加强安全监管，确保人民群众生命财产安全。李强对四川凉山州金阳县山洪灾害作出批示中共中央政治局常委、国务院总理李强作出批示，要求抓紧核实情况，全力查找、搜救失联人员，尽快查明原因，汲取教训，并依法严肃追责。根据习近平指示和李强要求，应急管理部派出工作组到现场指导搜救工作，四川省、凉山州组织救援力量开展相关工作。目前，各项工作仍在紧张有序进行中。',
          date: '20230830',
          title:
            '习近平对四川凉山州金阳县山洪灾害作出重要指示 要求全力搜寻失联人员 全面开展调查 加强安全监管 确保人民群众生命财产安全 李强对四川凉山州金阳县山洪灾害作出批示',
        },
      ],
    },
  },
  {
    img: <BugTwoTone />,
    description: '爬取工业研究论文',
    tags: ['crawler'],
    url: '/api/crawler/v1/get_industry_research_paper',
    params: [
      {
        name: 'start_page',
        type: 'number',
        desc: 'the start page',
        defaultVal: 1,
      },
      {
        name: 'end_page',
        type: 'number',
        desc: 'the end page',
        defaultVal: 5,
      },
    ],
    response: {
      data: [
        {
          content:
            "类chatGPT大模型带来的算力增长，毋庸置疑。但算力的需求，不止局限于模型的投资初期。随着GPTAPI的开放、下游应用多模态的成熟，对于的大模型的推理算力需求进一步提升。也即，在模型不断更迭训练中，算力需求提升；在模型应用推理中，算力需求进一步提升。由此，整个算力需求一如互联网时期的流量需求，持续爆发。整个大模型的算力需求包括训练端与推理端。本文计算的不是金额，而是潜在的对于以英伟达GPU为代表的芯片需求。由此对应，产业链需求。训练端算力需求，与模型参数、训练数据集规模正相关在训练端，算力的需求=2×#ofconnections×3×#oftrainingexamples×#ofepochs。（资料来源：EstimatingTrainingComputeofDeepLearningModels(epochai.org)）其中：#ofconnections，是指神经网络中，相互依赖的神经元数量。举例在一个完全链接的神经网络中，N层输入与M层输出，则#ofconnections=N*M。通常parameters可以近似于#ofconnections。#oftrainingexamples，数据集数量；#ofepoch，是指训练数据集上的完全通过次数。另一端，算力的供给=trainingtime×#ofGPUs/TPUs×peakFLOP/s×utilizationrate。Trainingtime计算时间；Utilizationrate使用效率。在这个公式中，通常使用英伟达A100FP32的数据，也即19.5TFLOPS。Utiliazationrate通常使用效率，对于大模型而言，是0.3；对于其他模型为0.4。在极端理论数据下，utilizationrate=1。我们在报导中看到的数据，GPT3若使用V100需要训练355gpu年，就是建立在理论数据下，以V100理论算力28TFLOPS计算的（直接将FP32的理论算力14TFLOPS乘以2，以得到FP16的理论算力）。若使用RTX8000，假设15TFLOPS，将花费665GPU年（资料来源：OpenAI'sGPT-3LanguageModel:ATechnicalOverview(lambdalabs.com)）。由此计算的GPT3的训练算力，整体达到3.14E23FLOPS。若仍然以V100就算，若要将训练一次的周期降低至1周内，则需要2万片V100GPU。由此公式可以看到，促进训练端算力需求增长的因素包括：1）参数规模。也即随着GPT3向更多参数的GPT4、5等发展；2）训练集规模。3）投入大模型的企业增长。国内包括华为、百度、阿里巴巴、腾讯、字节等互联网巨头以及更多加入大模型研发的企业。未来的训练端算力需求，是上述三大因素的乘积。推理端算力需求，与模型参数数量、平均序列长度、并发需求量正相关而推理部分算力需求，根据GPT3的回复：推理算力=模型大小*推演批次大小*平均序列长度*推演速度。（注：理论数值，其中并发请求数量、模型架构、输入数据等，均可能为影响因素）其中，平均序列长度，随着GPT从简单文字交流，向多模态发展，对于推理算力需求大幅提升。（资料来源：来自GPT3回复）于其对于响应速度，相比训练而言，要求高得多（通常用户能接受的响应时间，在几秒之内），因此所需要的并发GPU算力相应提升。进一步，多模态之下，图片、视频生成需求的提升，在公式中将会增加平均序列长度。同时随着并发需求的增长，整个推理算力需求大幅提升。逻辑推演之下，chatgpt应用进一步丰富，在推理端的算力需求持续提升，或将远远超过训练阶段的算力需求。由此来看，整个算力产业链将是chatgpt投资逻辑最顺的产业链条。建议关注AI芯片（包括GPU、TPU、FPGA）相关标的：海光信息、寒武纪、景嘉微。对应而言，单台服务器可插多张显卡，同时数据量的增长，对于数据存储也带来巨大寻求，服务器、存储因此受益。建议关注相关标的：浪潮信息、中科曙光、紫光股份、工业富联、联想集团、神州数码。进一步，以A100功耗达到400w；单服务器插入8张A100计算。单服务器功耗达到3200w。由此对散热产生巨大需求。风冷、液冷技术，有助于帮助解决散热问题，建议关注：英维克（计算机、机械联合覆盖）、依米康、佳力图、网宿科技。风险提示1）疫情反复降低企业信息化支出；2）财政与货币政策低于预期；3）供应链波动加大，影响科技产业发展。",
          industryCode: '735',
          industryName: '计算机设备',
          orgCode: '80000064',
          orgSName: '华安证券',
          publishDate: '2023-03-26 00:00:00.000',
          researcher: '尹沿技,王奇珏,张旭光',
          title:
            '战略科技（计算机）行业周报：详解大模型训练与推理对算力产业链的需求影响',
          url: 'https://data.eastmoney.com/report/zw_macresearch.jshtml?encodeUrl=yR/rwv5xI67Fww+7HqzxcOrqHF99GuJTeM3fNFDLgK4=',
        },
      ],
    },
  },
  {
    img: <BugTwoTone />,
    description: '爬取股票研究论文',
    tags: ['crawler'],
    url: '/api/crawler/v1/get_stock_research_paper',
    params: [
      {
        name: 'start_page',
        type: 'number',
        desc: 'the start page',
        defaultVal: 1,
      },
      {
        name: 'end_page',
        type: 'number',
        desc: 'the end page',
        defaultVal: 5,
      },
    ],
    response: {
      data: [],
    },
  },
  {
    img: <BugTwoTone />,
    description: '爬取tushare新闻（天维度）',
    tags: ['crawler'],
    url: '/api/crawler/v1/get_tushare_news_n_days',
    params: [
      {
        name: 'required_days',
        type: 'number',
        desc: 'the days you want to get',
        defaultVal: 3,
      },
      {
        name: 'start_date_str',
        type: 'string',
        desc: 'start date',
        defaultVal: '2022/2/14',
      },
    ],
    response: {
      data: {
        '10jqka': [
          {
            content:
              '企查查APP显示，近日北京特思迪半导体设备有限公司发生工商变更，新增华为旗下深圳哈勃科技投资合伙企业（有限合伙）为股东，持股比例10%，同时注册资本由1260万元增至1400万元。企查查信息显示，北京特思迪半导体设备有限公司成立于2020年，法...',
            datetime: '2022-02-14 11:59:00',
            source: '10jqka',
            title: '华为哈勃投资特思迪半导体，持股10%',
          },
          {
            content:
              '企查查App显示，近日，快手关联公司北京达佳互联信息技术有限公司申请注册“快手菜”商标，国际分类为广告销售，当前商标状态为申请中。',
            datetime: '2022-02-14 11:54:00',
            source: '10jqka',
            title: '快手申请注册快手菜商标',
          },
          {
            content:
              '长安汽车公告，2022年1月，长安汽车销量277244辆，同比增长10.03%；自主品牌销量226016辆，同比增长12.59%；自主乘用车销量158625辆，同比增长3.39%。',
            datetime: '2022-02-14 11:49:00',
            source: '10jqka',
            title: '长安汽车：1月份长安汽车销量同比增长10.03%',
          },
        ],
      },
    },
  },
  {
    img: <BugTwoTone />,
    description: '爬取tushare新闻（年维度）',
    tags: ['crawler'],
    url: '/api/crawler/v1/get_tushare_news_n_year',
    params: [
      {
        name: 'required_years',
        type: 'number',
        desc: 'the years you want to get',
        defaultVal: 1,
      },
      {
        name: 'start_date_str',
        type: 'string',
        desc: 'start date',
        defaultVal: '2022/2/14',
      },
    ],
    response: {
      data: [],
    },
  },
  {
    img: <BugTwoTone />,
    description: '爬取TVB新闻',
    tags: ['crawler'],
    url: '/api/crawler/v1/get_tvb_news',
    params: [
      {
        name: 'required_days',
        type: 'number',
        desc: 'the days you want to get',
        defaultVal: 3,
      },
    ],
    response: {
      data: 'news not found',
    },
  },
  {
    img: <CodeTwoTone twoToneColor="#eb2f96" />,
    description: '知识生成流水线',
    tags: ['crawler', 'pipline'],
    url: '/api/crawler/v1/dynamic_kb',
    params: [
      {
        name: 'required_days',
        type: 'number',
        desc: 'the days you want to get',
        defaultVal: 3,
      },
      {
        name: 'start_date_str',
        type: 'string',
        desc: 'start date',
        defaultVal: '2022/2/14',
      },
    ],
    response: {
      data: '[{"head_code":"300750.SZ","tail_code":"300014.SZ","relation":"same_industry","time":"2022-02-14 11:33:00"},{"head_code":"300033.SZ","tail_code":"002878.SZ","relation":"rise","time":"2022-02-14 09:26:00"},{"head_code":"600030.SH","tail_code":"300750.SZ","relation":"fall","time":"2022-02-14 08:50:00"},{"head_code":"600030.SH","tail_code":"002460.SZ","relation":"same_industry","time":"2022-02-14 09:01:45"},{"head_code":"002239.SZ","tail_code":"000625.SZ","relation":"be_increased_holding","time":"2022-02-14 18:49:00"},{"head_code":"600036.SH","tail_code":"000031.SZ","relation":"cooperate","time":"2022-02-14 18:44:00"},{"head_code":"600036.SH","tail_code":"000031.SZ","relation":"supply","time":"2022-02-14 18:44:00"},{"head_code":"600036.SH","tail_code":"601166.SH","relation":"same_industry","time":"2022-02-13 21:59:00"},{"head_code":"600150.SH","tail_code":"600648.SH","relation":"cooperate","time":"2022-02-14 18:09:00"},{"head_code":"600481.SH","tail_code":"688599","relation":"cooperate","time":"2022-02-14 16:58:00"},{"head_code":"300261.SZ","tail_code":"300059.SZ","relation":"rise","time":"2022-02-14 15:00:00"},{"head_code":"300261.SZ","tail_code":"002349.SZ","relation":"rise","time":"2022-02-14 15:03:58"},{"head_code":"601005.SH","tail_code":"000898.SZ","relation":"fall","time":"2022-02-14 14:39:00"},{"head_code":"300065.SZ","tail_code":"600717.SH","relation":"supply","time":"2022-02-14 14:34:00"},{"head_code":"688122.SH","tail_code":"600055.SH","relation":"cooperate","time":"2022-02-13 10:36:00"},{"head_code":"688122.SH","tail_code":"600055.SH","relation":"supply","time":"2022-02-13 10:45:49"},{"head_code":"301015","tail_code":"688091","relation":"cooperate","time":"2022-02-13 18:02:00"},{"head_code":"300449.SZ","tail_code":"000783.SZ","relation":"dispute","time":"2022-02-13 16:33:00"},{"head_code":"300449.SZ","tail_code":"000783.SZ","relation":"reduce_holding","time":"2022-02-13 16:30:58"},{"head_code":"002594.SZ","tail_code":"601238.SH","relation":"same_industry","time":"2022-02-12 11:33:00"},{"head_code":"000937.SZ","tail_code":"600812.SH","relation":"superior","time":"2022-02-12 11:19:00"},{"head_code":"601288.SH","tail_code":"601658","relation":"cooperate","time":"2022-02-12 07:20:00"},{"head_code":"300347.SZ","tail_code":"002821.SZ","relation":"rise","time":"2022-02-14 10:54:54"},{"head_code":"600009.SH","tail_code":"600004.SH","relation":"same_industry","time":"2022-02-14 08:58:14"},{"head_code":"600617.SH","tail_code":"601865.SH","relation":"same_industry","time":"2022-02-14 04:51:03"},{"head_code":"601398.SH","tail_code":"000931.SZ","relation":"cooperate","time":"2022-02-14 04:29:08"},{"head_code":"300760.SZ","tail_code":"601012.SH","relation":"same_industry","time":"2022-02-14 18:36:07"},{"head_code":"600011","tail_code":"601991.SH","relation":"fall","time":"2022-02-14 13:03:18"},{"head_code":"601375.SH","tail_code":"002670.SZ","relation":"same_industry","time":"2022-02-14 12:49:41"},{"head_code":"000416.SZ","tail_code":"000046.SZ","relation":"reduce_holding","time":"2022-02-13 17:27:20"},{"head_code":"688091","tail_code":"301015","relation":"cooperate","time":"2022-02-13 15:47:57"},{"head_code":"688268.SH","tail_code":"002549.SZ","relation":"same_industry","time":"2022-02-13 12:36:55"},{"head_code":"000725.SZ","tail_code":"000063.SZ","relation":"same_industry","time":"2022-02-12 19:20:00"}]',
    },
  },
  {
    img: <DeploymentUnitOutlined />,
    description: '查询RDF（根据relation）',
    tags: ['query', 'rdf'],
    url: '/api/rdf/v1/query1',
    params: [
      {
        name: 'relation',
        type: 'string',
        desc: 'the relation',
        defaultVal: 'invest',
      },
    ],
    response: {
      data: [
        [
          'http://k-qaunt/finkg.com/000407.SZ',
          'http://k-qaunt/finkg.com/002124.SZ',
        ],
        [
          'http://k-qaunt/finkg.com/000703.SZ',
          'http://k-qaunt/finkg.com/002567.SZ',
        ],
        [
          'http://k-qaunt/finkg.com/000918.SZ',
          'http://k-qaunt/finkg.com/600030.SH',
        ],
        [
          'http://k-qaunt/finkg.com/002171.SZ',
          'http://k-qaunt/finkg.com/002340.SZ',
        ],
        [
          'http://k-qaunt/finkg.com/002345.SZ',
          'http://k-qaunt/finkg.com/603377.SH',
        ],
        [
          'http://k-qaunt/finkg.com/002645.SZ',
          'http://k-qaunt/finkg.com/002009.SZ',
        ],
      ],
    },
  },
  {
    img: <DeploymentUnitOutlined />,
    description: '查询RDF（根据source）',
    tags: ['query', 'rdf'],
    url: '/api/rdf/v1/query2',
    params: [
      {
        name: 'head_company',
        type: 'string',
        desc: 'the head company',
        defaultVal: '000001.SZ',
      },
    ],
    response: {
      data: [
        [
          'http://k-qaunt/finkg.com/be_invested',
          'http://k-qaunt/finkg.com/600007.SH',
        ],
        [
          'http://k-qaunt/finkg.com/same_industry',
          'http://k-qaunt/finkg.com/600036.SH',
        ],
        [
          'http://k-qaunt/finkg.com/same_industry',
          'http://k-qaunt/finkg.com/601939',
        ],
        [
          'http://k-qaunt/finkg.com/same_industry',
          'http://k-qaunt/finkg.com/601988',
        ],
      ],
    },
  },
  {
    img: <DeploymentUnitOutlined />,
    description: '查询RDF（根据target）',
    tags: ['query', 'rdf'],
    url: '/api/rdf/v1/query3',
    params: [
      {
        name: 'tail_company',
        type: 'string',
        desc: 'the tail company',
        defaultVal: '000001.SZ',
      },
    ],
    response: {
      data: [
        [
          'http://k-qaunt/finkg.com/002743.SZ',
          'http://k-qaunt/finkg.com/be_reduced_holding',
        ],
        [
          'http://k-qaunt/finkg.com/600919.SH',
          'http://k-qaunt/finkg.com/same_industry',
        ],
        [
          'http://k-qaunt/finkg.com/601328.SH',
          'http://k-qaunt/finkg.com/same_industry',
        ],
        [
          'http://k-qaunt/finkg.com/601818.SH',
          'http://k-qaunt/finkg.com/same_industry',
        ],
        [
          'http://k-qaunt/finkg.com/600016.SH',
          'http://k-qaunt/finkg.com/same_industry',
        ],
        [
          'http://k-qaunt/finkg.com/601628.SH',
          'http://k-qaunt/finkg.com/subordinate',
        ],
      ],
    },
  },
  {
    img: <DeploymentUnitOutlined />,
    description: '查询RDF（根据relation+source）',
    tags: ['query', 'rdf'],
    url: '/api/rdf/v1/query4',
    params: [
      {
        name: 'relation',
        type: 'string',
        desc: 'the relation',
        defaultVal: 'invest',
      },
      {
        name: 'head_company',
        type: 'string',
        desc: 'the head company',
        defaultVal: '000001.SZ',
      },
    ],
    response: {
      data: 'news not found',
    },
  },
  {
    img: <DeploymentUnitOutlined />,
    description: '查询RDF（根据source+target）',
    tags: ['query', 'rdf'],
    url: '/api/rdf/v1/query5',
    params: [
      {
        name: 'head_company',
        type: 'string',
        desc: 'the head company',
        defaultVal: '000001.SZ',
      },
      {
        name: 'tail_company',
        type: 'string',
        desc: 'the tail company',
        defaultVal: '000002.SZ',
      },
    ],
    response: {
      data: 'news not found',
    },
  },
  {
    img: <DeploymentUnitOutlined />,
    description: '查询RDF（根据relation+target）',
    tags: ['query', 'rdf'],
    url: '/api/rdf/v1/query6',
    params: [
      {
        name: 'relation',
        type: 'string',
        desc: 'the relation',
        defaultVal: 'invest',
      },
      {
        name: 'tail_company',
        type: 'string',
        desc: 'the tail company',
        defaultVal: '000002.SZ',
      },
    ],
    response: {
      data: [['http://k-qaunt/finkg.com/603501.SH']],
    },
  },
  {
    img: <DeploymentUnitOutlined />,
    description: '查询RDF（自定义查询）',
    tags: ['query', 'rdf', 'sql'],
    url: '/api/rdf/v1/self_defined_query',
    params: [
      {
        name: 'q',
        type: 'string',
        desc: 'the relation',
        defaultVal:
          'select ?companyA ?companyB where {?companyA <http://k-qaunt/finkg.com/invest> ?companyB}',
      },
    ],
    response: {
      data: [
        [
          'http://k-qaunt/finkg.com/000407.SZ',
          'http://k-qaunt/finkg.com/002124.SZ',
        ],
        [
          'http://k-qaunt/finkg.com/000703.SZ',
          'http://k-qaunt/finkg.com/002567.SZ',
        ],
        [
          'http://k-qaunt/finkg.com/000918.SZ',
          'http://k-qaunt/finkg.com/600030.SH',
        ],
        [
          'http://k-qaunt/finkg.com/002171.SZ',
          'http://k-qaunt/finkg.com/002340.SZ',
        ],
        [
          'http://k-qaunt/finkg.com/002345.SZ',
          'http://k-qaunt/finkg.com/603377.SH',
        ],
        [
          'http://k-qaunt/finkg.com/002645.SZ',
          'http://k-qaunt/finkg.com/002009.SZ',
        ],
      ],
    },
  },
  {
    img: <CloudTwoTone twoToneColor="#52c41a" />,
    description: '查询neo4j（根据relation）',
    tags: ['query', 'neo4j'],
    url: '/api/neo/v1/query1',
    params: [
      {
        name: 'relation',
        type: 'string',
        desc: 'the relation',
        defaultVal: 'invest',
      },
    ],
    response: {
      data: [
        {
          end_node: '300750.SZ',
          relation: 'invest',
          start_node: '002045.SZ',
          time: '2021/7/19 12:03',
        },
        {
          end_node: '600388.SH',
          relation: 'invest',
          start_node: '601899.SH',
          time: '2022/5/9 19:22',
        },
        {
          end_node: '600039.SH',
          relation: 'invest',
          start_node: '601107.SH',
          time: '2021/10/20 20:11',
        },
        {
          end_node: '601828',
          relation: 'invest',
          start_node: '600153.SH',
          time: '2023/1/16 12:21',
        },
      ],
    },
  },
  {
    img: <CloudTwoTone twoToneColor="#52c41a" />,
    description: '查询neo4j（根据source）',
    tags: ['query', 'neo4j'],
    url: '/api/neo/v1/query2',
    params: [
      {
        name: 'head_company',
        type: 'string',
        desc: 'the head company',
        defaultVal: '000001.SZ',
      },
    ],
    response: {
      data: [
        {
          end_node: '600018.SH',
          relation: 'be_reduced_holding',
          start_node: '000001.SZ',
          time: '2022/1/13 20:07',
        },
        {
          end_node: '002244.SZ',
          relation: 'cooperate',
          start_node: '000001.SZ',
          time: '2022-12-02 10:27:00',
        },
        {
          end_node: '600036.SH',
          relation: 'cooperate',
          start_node: '000001.SZ',
          time: '2019/7/8 11:55',
        },
        {
          end_node: '000034.SZ',
          relation: 'cooperate',
          start_node: '000001.SZ',
          time: '2020/7/30 9:40',
        },
      ],
    },
  },
  {
    img: <CloudTwoTone twoToneColor="#52c41a" />,
    description: '查询neo4j（根据target）',
    tags: ['query', 'neo4j'],
    url: '/api/neo/v1/query3',
    params: [
      {
        name: 'tail_company',
        type: 'string',
        desc: 'the tail company',
        defaultVal: '000001.SZ',
      },
    ],
    response: {
      data: [
        {
          end_node: '000001.SZ',
          relation: 'be_reduced_holding',
          start_node: '603779.SH',
          time: '2022-11-17 17:09:00',
        },
        {
          end_node: '000001.SZ',
          relation: 'be_reduced_holding',
          start_node: '603779.SH',
          time: '2021/12/16 18:12',
        },
        {
          end_node: '000001.SZ',
          relation: 'be_reduced_holding',
          start_node: '002743.SZ',
          time: '2021/9/8 17:06',
        },
        {
          end_node: '000001.SZ',
          relation: 'be_reduced_holding',
          start_node: '002252.SZ',
          time: '2020/7/7 14:09',
        },
      ],
    },
  },
  {
    img: <CloudTwoTone twoToneColor="#52c41a" />,
    description: '查询neo4j（根据relation+source）',
    tags: ['query', 'neo4j'],
    url: '/api/neo/v1/query4',
    params: [
      {
        name: 'relation',
        type: 'string',
        desc: 'the relation',
        defaultVal: 'invest',
      },
      {
        name: 'head_company',
        type: 'string',
        desc: 'the head company',
        defaultVal: '000001.SZ',
      },
    ],
    response: {
      data: [],
    },
  },
  {
    img: <CloudTwoTone twoToneColor="#52c41a" />,
    description: '查询neo4j（根据source+target）',
    tags: ['query', 'neo4j'],
    url: '/api/neo/v1/query5',
    params: [
      {
        name: 'head_company',
        type: 'string',
        desc: 'the head company',
        defaultVal: '000001.SZ',
      },
      {
        name: 'tail_company',
        type: 'string',
        desc: 'the tail company',
        defaultVal: '000002.SZ',
      },
    ],
    response: {
      data: [
        {
          end_node: '000002.SZ',
          relation: 'increase_holding',
          start_node: '000001.SZ',
          time: '2019/8/14 17:32',
        },
      ],
    },
  },
  {
    img: <CloudTwoTone twoToneColor="#52c41a" />,
    description: '查询neo4j（根据relation+target）',
    tags: ['query', 'neo4j'],
    url: '/api/neo/v1/query6',
    params: [
      {
        name: 'relation',
        type: 'string',
        desc: 'the relation',
        defaultVal: 'invest',
      },
      {
        name: 'tail_company',
        type: 'string',
        desc: 'the tail company',
        defaultVal: '000002.SZ',
      },
    ],
    response: {
      data: [
        {
          end_node: '000002.SZ',
          relation: 'invest',
          start_node: '600030.SH',
          time: '2018/4/6 21:22',
        },
      ],
    },
  },
];

const APIPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div style={{display:'flex',alignItems:'end'}}>
        <Typography.Title>API文档</Typography.Title>
        <Typography.Link href="http://143.89.126.57:8001/docs#/" target='_blank' style={{marginBottom:19}}>想查看旧版api文档？点击此处</Typography.Link>
      </div>
      <div className={styles.cardContainer}>
        {APIDataList.map((item) => {
          return <ApiModal {...item} />;
        })}
      </div>
    </div>
  );
};

export default APIPage;
