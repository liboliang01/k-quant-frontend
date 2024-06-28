import { Col, Image, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import './index.less';

interface ColumnsType1 {
  name: string;
  type: string;
  source: string;
  timeRange: string;
  scale: string;
}
interface ColumnsType2 {
  type: string;
  meta: string;
}

const columns1: ColumnsType<ColumnsType1> = [
  {
    title: ' 数据类别',
    dataIndex: 'type',
    width: '100px',
    key: 'type',
    align: 'center',
    onCell: (_, index) => {
      if (index === 6) {
        return { rowSpan: 2 };
      }
      if (index === 7) {
        return { rowSpan: 0 };
      }
      if (index === 8) {
        return { rowSpan: 6 };
      }
      if ((index as number) > 8) {
        return { rowSpan: 0 };
      }

      return {};
    },
    render: (item) => <span style={{ fontWeight: 'bold' }}>{item}</span>,
  },
  {
    title: '数据名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    render: (item) => <span style={{ fontWeight: 'bold' }}>{item}</span>,
  },
  {
    title: '数据来源',
    dataIndex: 'source',
    key: 'source',
    align: 'center',
    render: (item) => <span style={{ fontWeight: 'bold' }}>{item}</span>,
  },
  {
    title: '时间跨度',
    dataIndex: 'timeRange',
    key: 'timeRange',
    align: 'center',
    render: (item) => <span style={{ fontWeight: 'bold' }}>{item}</span>,
    onCell: (_, index) => {
      if (index === 8) {
        return { rowSpan: 4 };
      }
      if ((index as number) > 8 && (index as number) < 12) {
        return { rowSpan: 0 };
      }
      return {};
    },
  },
  {
    title: '数据规模',
    dataIndex: 'scale',
    key: 'scale',
    align: 'center',
    render: (item) => <span style={{ fontWeight: 'bold' }}>{item}</span>,
  },
];
const dataDescription = [
  {
    type: '股票数据',
    name: '日线数据',
    source: 'Tushare',
    timeRange: 'N/A',
    scale: 'A股/港股/美股',
  },
  {
    type: '股票数据',
    name: '基本面信息',
    source: '东方财富、雅虎金融',
    timeRange: 'N/A',
    scale: 'A股4617家',
  },
  {
    type: '行业数据',
    name: '行业分类',
    source: 'GICS，申万',
    timeRange: '申万使用最新版三级行业分类',
    scale:
      'GICS12大类，147小类；申万一级行业31个，二级行业134个，三级行业346个',
  },
  {
    type: '基金数据',
    name: '公募基金信息',
    source: '公募基金季报，由tushare整理',
    timeRange: 'N/A',
    scale: '58个国家和地区，1646个城市',
  },
  {
    type: '地理数据',
    name: '城市与国家信息',
    source: '整理自雅虎金融',
    timeRange: 'N/A',
    scale:
      '公募基金1613只，基金公司90家，基金托管机构34家，基金类型6种，指标参数25种，基金经理1246位',
  },
  {
    type: '公司数据',
    name: '公司及子公司分布数据',
    source: '获得于天眼查、企查查',
    timeRange: '获取时间为2022年4月',
    scale: '共获取到公司数17719家',
  },
  {
    type: '公司数据',
    name: '个股研报',
    source: '获得于东方财富网',
    timeRange: '2021年8月-今',
    scale:
      '研报总数：13313份；股票总数：1949支；行业总数：114个；分析师总数：1270位；分析师所属机构数：69家',
  },
  {
    type: '公司数据',
    name: '行业研报',
    source: '获得于东方财富网',
    timeRange: '2021年9月-今',
    scale:
      '研报总数：12548份；行业总数：104个；分析师总数：1885位；分析师所属机构数：108家',
  },
  {
    type: '新闻数据',
    name: '同花顺新闻',
    source: '发布于同花顺网站，由tushare整理',
    timeRange: '2018年10月-今',
    scale: '新闻快讯文本30518条',
  },
  {
    type: '新闻数据',
    name: '东方财富新闻',
    source: '发布于东方财富网站，由tushare整理',
    timeRange: '2018年10月-今',
    scale: '新闻快讯文本416405条',
  },
  {
    type: '新闻数据',
    name: '新浪财经新闻',
    source: '发布于新浪财经网站，由tushare整理',
    timeRange: '2018年10月-今',
    scale: '新闻快讯文本825131条',
  },
  {
    type: '新闻数据',
    name: '云财经新闻',
    source: '发布于云财经网站，由tushare整理',
    timeRange: '2018年10月-今',
    scale: '新闻快讯文本382200条',
  },
  {
    type: '新闻数据',
    name: '新闻联播文字稿',
    source: '发布于中央电视台新闻联播，由tushare整理',
    timeRange: '2021年11月-今',
    scale: '新闻文字稿1572期',
  },
  {
    type: '新闻数据',
    name: 'TVB无线财经新闻',
    source: '于TVB官网获得',
    timeRange: '2021年12月-今',
    scale: '新闻文本2307条',
  },
];

const columns2: ColumnsType<ColumnsType2> = [
  {
    title: '数据来源',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    width: '100px',
    render: (item) => <span style={{ fontWeight: 'bold' }}>{item}</span>,
  },
  {
    title: 'Meta Data',
    dataIndex: 'meta',
    key: 'meta',
    align: 'center',
    render: (item) => <span style={{ fontWeight: 'bold' }}>{item}</span>,
  },
];

const metaData = [
  {
    type: '股价数据',
    meta: '开盘价、收盘价、MOM、RSI...(根据日线价格计算出的多因子数据)',
  },
  {
    type: '股票数据',
    meta: '总市值、流通市值、行业、上市时间、股票代码、股票简称、总股本、流通股',
  },
  {
    type: '行业数据',
    meta: 'Circulating market value、stock listing time、chinese name、code、sector、city、phone、country、website 、grossProfits...(164 attributes in total)',
  },
  {
    type: '基金数据',
    meta: '管理机构、托管机构、投资类型、基金类型、基金持仓、基金经理',
  },
  {
    type: '地理数据',
    meta: '城市与国家信息，结合Yahoo Finance',
  },
  {
    type: '公司数据',
    meta: '公司名称、所属行业、初始注册资本、公司股东及占股比例列表 、分支机构列表、客户公司列表、供应商公司列表、投资公司及其金额列表、参股公司及其参股比例列表',
  },
  {
    type: '研报数据',
    meta: '报告撰写人、组织名称、组织编号、所属行业、行业编号、发布时间、标题、正文内容、组织实体',
  },
  {
    type: '新闻数据',
    meta: '发布时间、新闻标题、新闻正文、发布数据源',
  },
];

const FinKGUpdate: React.FC = () => {
  return (
    <main style={{ backgroundColor: '#fff' }}>
      <section className="pb-5 pt-5 text-white-50">
        <div className="container pb-5 position-relative pt-5">
          <div className="align-items-center gy-4 row">
            <div style={{ textAlign: 'center' }}>
              <h1 className="fw-bold text-black">Data Sources</h1>
            </div>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Col span={3}>
                <Image preview={false} src="logo/10jqka.jpeg" />
              </Col>
              <Col span={3}>
                <Image preview={false} src="logo/cctvFinance.png" />
              </Col>
              <Col span={3}>
                <Image preview={false} src="logo/eastmoney.jpeg" />
              </Col>
              <Col span={3}>
                <Image preview={false} src="logo/qcc.png" />
              </Col>
              <Col span={3}>
                <Image preview={false} src="logo/reuters.png" />
              </Col>
              <Col span={3}>
                <Image preview={false} src="logo/shenwan.png" />
              </Col>
            </Row>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Col span={3}>
                <Image preview={false} src="logo/sinaFinance.png" />
              </Col>
              <Col span={3}>
                <Image preview={false} src="logo/tianyancha.jpeg" />
              </Col>
              <Col span={3}>
                <Image preview={false} src="logo/Tushare.jpeg" />
              </Col>
              <Col span={3}>
                <Image preview={false} src="logo/tvbFinance.jpeg" />
              </Col>
              <Col span={3}>
                <Image preview={false} src="logo/yh.png" />
              </Col>
              <Col span={3}>
                <Image preview={false} src="logo/yuncaijing.jpeg" />
              </Col>
            </Row>

            <div className="container pb-5 pt-5">
              <div className="align-items-center mb-3 row">
                <div style={{ textAlign: 'center' }}>
                  <h1 className="fw-bold text-black">
                    All avaliable data sources
                  </h1>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6 col-xl-3 pb-3 pt-3">
                  <div className="pb-3 pt-3">
                    <h2
                      className="display-5 fw-bold text-primary"
                      style={{
                        color: 'white',
                        display: 'inline',
                        width: 'auto',
                      }}
                    >
                      5 years+
                    </h2>
                    <h4 className="fw-bold h5 text-black">Time-series Data</h4>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 pb-3 pt-3">
                  <div className="pb-3 pt-3">
                    <h2
                      className="display-5 fw-bold text-primary"
                      style={{ display: 'inline', width: '300px' }}
                    >
                      2,000,000+
                    </h2>
                    <h4 className="fw-bold h5 text-black">Financial News</h4>
                    <p></p>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 pb-3 pt-3">
                  <div className="pb-3 pt-3">
                    <h2
                      className="display-5 fw-bold text-primary"
                      style={{ display: 'inline' }}
                    >
                      60+
                    </h2>
                    <h4 className="fw-bold h5 text-black">Factors</h4>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 pb-3 pt-3">
                  <div className="pb-3 pt-3">
                    <h2
                      className="display-5 fw-bold text-primary"
                      style={{ display: 'inline' }}
                    >
                      50,000+
                    </h2>
                    <h4 className="fw-bold h5 text-black">Research Reports</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div style={{ textAlign: 'center' }}>
                <h1 className="fw-bold text-black">Data description</h1>
              </div>
              <br />
              <Table
                columns={columns1}
                dataSource={dataDescription}
                pagination={false}
                bordered={true}
                size="small"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-5 pt-5 text-body text-center">
        <div className="container pb-4 pt-4">
          <div style={{ textAlign: 'center' }}>
            <h1 className="fw-bold text-black">Meta Data</h1>
          </div>
          <br />
          <Table
            columns={columns2}
            dataSource={metaData}
            pagination={false}
            bordered={true}
            size="small"
          />
          <div className="row">
            <div className="col-lg-12 me-auto ms-auto"></div>
          </div>
        </div>
      </section>
      <footer className="bg-dark pt-5 text-white">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 py-3">
              <a
                className="align-items-center d-inline-flex fw-bold h3 lh-1 link-primary mb-4 text-decoration-none text-uppercase"
                href="#"
              >
                <img src="./images/UST.jpg" width="30" className="bg-light" />
                <span className="text-light">&nbsp; K-Quant</span>
              </a>
              <div className="mb-4">
                <p className="text-white">
                  This project is supported by Ministry of Science and
                  Technology of the People´s Republic of China (MOST.GOV) and
                  under development among HKUST-SJTU.
                </p>
              </div>
            </div>
          </div>
          <div className="pb-3 pt-3">
            <hr className="border-secondary mt-0" />
            <div className="align-items-center row">
              <div className="col-md pb-2 pt-2">
                <p className="mb-0">
                  &copy; 2002 - 2022. All Rights Reserved - HKUST
                </p>
              </div>
              <div className="col-md-auto pb-2 pt-2">
                <a href="#" className="text-primary">
                  Privacy Policy
                </a>{' '}
                |{' '}
                <a href="#" className="text-primary">
                  Terms of Use
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default FinKGUpdate;
