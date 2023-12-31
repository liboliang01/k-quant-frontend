import { Link } from '@umijs/max';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <main style={{ padding: 0 }}>
      <section className="bg-secondary pb-5 pt-5 text-white-50">
        <div className="container pb-5 position-relative pt-5">
          <div className="align-items-center gy-4 row">
            <div className="col-lg-12">
              <h1 className="display-3 fw-bold text-white">
                Your Personal <br />
                Financial Advisor
              </h1>
              <p className="lead mb-4 pe-sm-5">
                Financial Knowledge Extraction and Update, Stock Price/Trend
                Prediction, Incremental Update of Investment Model,
                <br /> Backtesting, Stock Selection, Robotic Portifolio,
                Portifolio Scoring.
              </p>
              <Link
                to="/kquant"
                className="btn btn-primary pb-2 pe-4 ps-4 pt-2"
              >
                Start Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="currentColor"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="160"
        className="bg-secondary d-block text-white"
      >
        <path d="M 100 100 V 20 L 0 100" />
        <path d="M 100 100 V 0 L 0 100" opacity="0.5" />
      </svg>
      <section className="pb-5 pt-5 text-center">
        <div className="container pb-4 pt-4">
          <div className="row">
            <div className="col-lg-6 ms-auto me-auto">
              <h2 className="h6 text-primary">What We Do</h2>
              <h3 className="fw-bold h2 mb-4 text-dark">
                We provide expert financial advice for businesses and
                individuals
              </h3>
            </div>
            <div>
              <img src="images/demo_overview.png" style={{ width: '100%' }} />
            </div>
          </div>
          <div className="container">
            <p className="fw-light mb-0"></p>
            <p className="fw-light mb-0">
              Our fintech platform provides a rich data source including
              fundamental time series and multiple types of alternative data.
              Also, we provide a stock selection and robotic advisor for
              businesses and individuals to catch up good stock pool and
              self-defined stock portfolio. We also provide the complete
              workflow of obtaining data, multi-modal model prediction and
              backtesting.
            </p>
          </div>
        </div>
      </section>
      <div className="container pb-1 pt-1">
        <div className="col-9 col-lg-4 me-auto ms-auto">
          <hr />
        </div>
      </div>
      <section className="pb-5 pt-5">
        <div className="container"></div>
        <div className="container pb-4 pt-4">
          <div className="align-items-center mb-3 row">
            <div className="col-lg-7">
              <h2 className="h6 text-primary">Our Process</h2>
              <h3 className="fw-bold h2 mb-1 text-black-50">Knowledge Graph</h3>
              <p className="fw-light"></p>
            </div>
            <div className="col-lg-auto ms-auto">
              <Link
                to="/Query"
                className="btn btn-outline-primary pb-2 pe-4 ps-4 pt-2"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="align-items-center justify-content-center row">
            <div className="col-lg-3 col-sm-6 pb-3 pt-3">
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="3rem"
                  height="3rem"
                  className="me-3 mt-2"
                >
                  <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm13 8H4v6h16v-6zm0-6H4v4h3V9h2v2h6V9h2v2h3V7zM9 3v2h6V3H9z" />
                </svg>
                <div>
                  <h2 className="display-5 fw-bold text-primary">30,000+</h2>
                  <p className="mb-0">Entities</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 pb-3 pt-3">
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="3rem"
                  height="3rem"
                  className="me-3 mt-2"
                >
                  <path d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                </svg>
                <div>
                  <h2 className="display-5 fw-bold text-primary">20+</h2>
                  <p className="mb-0">Relations</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 pb-3 pt-3">
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="3rem"
                  height="3rem"
                  className="me-3 mt-2"
                >
                  <path d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                </svg>
                <div>
                  <h2 className="display-5 fw-bold text-primary">4,000+</h2>
                  <p className="mb-0">Short term Events</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 pb-3 pt-3">
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="3rem"
                  height="3rem"
                  className="me-3 mt-2"
                >
                  <path d="M13 16.938V19h5v2H6v-2h5v-2.062A8.001 8.001 0 0 1 4 9V3h16v6a8.001 8.001 0 0 1-7 7.938zM6 5v4a6 6 0 1 0 12 0V5H6zM1 5h2v4H1V5zm20 0h2v4h-2V5z" />
                </svg>
                <div>
                  <h2 className="display-5 fw-bold text-primary">10+</h2>
                  <p className="mb-0">High-frequency Events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="currentColor"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="160"
        className="bg-white d-block text-secondary"
      >
        <path d="M 100 100 V 20 L 0 100" />
        <path d="M 100 100 V 0 L 0 100" opacity="0.5" />
      </svg>
      <section className="bg-secondary pb-5 pt-5 text-white-50">
        <div className="container pb-5 pt-5">
          <div className="align-items-center mb-3 row">
            <div className="col-lg-7">
              <h2 className="h6 text-primary">Our Process</h2>
              <h3 className="fw-bold h2 mb-1 text-white">
                All avaliable data sources
              </h3>
              <p className="fw-light"></p>
            </div>
            <div className="col-lg-auto ms-auto">
              <Link
                to="/datasources"
                className="btn btn-outline-primary pb-2 pe-4 ps-4 pt-2"
              >
                Read More
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-xl-3 pb-3 pt-3">
              <div className="pb-3 pt-3">
                <h2
                  className="display-5 fw-bold text-primary"
                  style={{ color: 'white', display: 'inline', width: 'auto' }}
                >
                  5 years+
                </h2>
                <h4 className="fw-bold h5 text-white">Time-series Data</h4>
              </div>
            </div>
            <div
              className="col-sm-6 col-xl-3 pb-3 pt-3"
              style={{ width: '30%' }}
            >
              <div className="pb-3 pt-3">
                <h2
                  className="display-5 fw-bold text-primary"
                  style={{ display: 'inline', width: 'auto' }}
                >
                  2,000,000+
                </h2>
                <h4 className="fw-bold h5 text-white">Financial News</h4>
                <p></p>
              </div>
            </div>
            <div
              className="col-sm-6 col-xl-3 pb-3 pt-3"
              style={{ width: '18%' }}
            >
              <div className="pb-3 pt-3">
                <h2
                  className="display-5 fw-bold text-primary"
                  style={{ display: 'inline' }}
                >
                  60+
                </h2>
                <h4 className="fw-bold h5 text-white">Factors</h4>
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
                <h4 className="fw-bold h5 text-white">Research Reports</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-secondary">
        <div className="container pb-1 pt-1">
          <div className="col-9 col-lg-4 me-auto ms-auto">
            <hr />
          </div>
        </div>
      </div>
      <section className="bg-secondary pb-5 pt-5 text-center text-white-50">
        <div className="container">
          <div className="mb-4 text-center">
            <h2 className="h6 text-primary">MEET OUR GROUP</h2>
            <h2 className="h6 text-primary"></h2>
            <h2 className="h6 text-primary"></h2>
            <h2 className="h6 text-primary"></h2>
            <h3 className="fw-bold h2 text-white">Group Head</h3>
            <div className="col-lg-4 col-md-6 pb-3 pt-5 py-3"></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow"
                style={{ flexBasis: '45%' }}
              >
                <img
                  src="images/boss.png"
                  className="img-fluid mb-3 mt-n5 rounded-circle"
                  alt="..."
                  width="100"
                  height="100"
                />
                <div>
                  <h3 className="fw-bold h4 mb-1 text-white">Prof. Lei Chen</h3>
                  <h4 className="fw-light h5 mb-3 text-white">
                    Chair Professor, Director of HKUST Big Data Institute
                  </h4>
                  <div style={{ display: 'flex' }}>
                    <ul
                      className="mb-4"
                      style={{ width: '100%', textAlign: 'left' }}
                    >
                      <li className="fw-bolder">
                        Acting Head, Data Science and Analytics Thrust, HKUST
                        (Guangzhou)
                      </li>
                      <li className="fw-bolder">
                        Chair Professor, Department of Computer Science and
                        Engineering
                      </li>
                      <li className="fw-bolder">
                        Director of HKUST Big Data Institute
                      </li>
                      <li className="fw-bolder">
                        Director of MOE/MSRA Information Technology Key
                        Laboratory
                      </li>
                      <li>
                        Associate Director of Brain and Intelligence Research
                        Institute
                      </li>
                      <li>
                        Associate Director of GREAT Smart Cities Institute
                      </li>
                      <li>
                        Associate Director of HKUST The Big Data for Bio
                        Intelligence Laboratory
                      </li>
                      <li>
                        Associate Director of HKUST-DiDi Joint Research Lab
                      </li>
                      <li>Associate Director of HKUST-NAVER/LINE AI Lab</li>
                      <li>
                        Associate Director of HKUST-Xiaoi Robot Joint Lab on
                        Machine Learning and Cognitive Reasoning
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow"
                style={{ flexBasis: '45%' }}
              >
                <img
                  src="images/bossShen.png"
                  className="img-fluid mb-3 mt-n5 rounded-circle"
                  alt="..."
                  width="100"
                  height="100"
                />
                <div>
                  <h3 className="fw-bold h4 mb-1 text-white">
                    Prof. Yanyan Shen
                  </h3>
                  <h4 className="fw-light h5 mb-3 text-white">
                    Associate Professor,Shanghai Jiao Tong University
                  </h4>
                  <div style={{ display: 'flex' }}>
                    <ul
                      className="fw-bolder mb-4"
                      style={{ width: '100%', textAlign: 'left' }}
                    >
                      <li>
                        The First Prize of Technical Invention in Shanghai in
                        2020
                      </li>
                      <li>ACM SIGMOD China Rising Star Award</li>
                      <li>DASFAA 2020 Best Paper Nomination Award</li>
                      <li>APWeb-WAIM 2018 Best Student Paper Award</li>
                      <li>
                        Database Top International Journal VLDBJ Guest Editor
                      </li>
                      <li>VLDB Deputy Editor</li>
                      <li>
                        Served as a PC for more than 10 top-level conferences in
                        the field of database and artificial intelligence
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="fw-bold h2 text-white">&nbsp;</h3>
            <h3 className="fw-bold h2 text-white">Group Members</h3>
            <div className="justify-content-center row">
              <div className="col-lg-4 col-md-6 pb-3 pt-5 py-3">
                <div className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow">
                  <div>
                    <h3 className="fw-bold h4 mb-1 mt-3 text-white">
                      Yuxiang Zeng Postdoc
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-3 pt-5 py-3">
                <div className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow">
                  <div>
                    <h3 className="fw-bold h4 mb-1 mt-3 text-white">
                      Zhifeng Jia Ph.D student
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-3 pt-5 py-3">
                <div className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow">
                  <div>
                    <h3 className="fw-bold h4 mb-1 mt-3 text-white">
                      Hao Wang Ph.D student
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-3 pt-5 py-3">
                <div className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow">
                  <div>
                    <h3 className="fw-bold h4 mb-1 mt-3 text-white">
                      Liping Wang Ph.D student
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-3 pt-5 py-3">
                <div className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow">
                  <div>
                    <h3 className="fw-bold h4 mb-1 mt-3 text-white">
                      Hao Xin Ph.D student
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-3 pt-5 py-3">
                <div className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow">
                  <div>
                    <h3 className="fw-bold h4 mb-1 mt-3 text-white">
                      Xinyi Zhu Ph.D student
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-3 pt-5 py-3">
                <div className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow">
                  <div>
                    <h3 className="fw-bold h4 mb-1 mt-3 text-white">
                      Jiawei Li MPhil student
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-3 pt-5 py-3">
                <div className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow">
                  <div>
                    <h3 className="fw-bold h4 mb-1 mt-3 text-white">
                      Zhizhuo Kou MPhil student
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-3 pt-5 py-3">
                <div className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow">
                  <div>
                    <h3 className="fw-bold h4 mb-1 mt-3 text-white">
                      Xiaohan Wang R.A.
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-3 pt-5 py-3">
                <div className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow">
                  <div>
                    <h3 className="fw-bold h4 mb-1 mt-3 text-white">
                      Boliang Li R.A.
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="fw-bold h2 text-white">&nbsp;</h3>
            <h2 className="h6 text-primary">WHO IS USING OUR DATA</h2>
            <h3 className="fw-bold h2 text-white">Users</h3>
            <div className="justify-content-center row">
              <div className="col-lg-4 col-md-6 pb-3 pt-5 py-3">
                <div className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow">
                  <img
                    src="images/HKUST.jpg"
                    className="img-fluid mb-3 mt-n5 rounded-circle"
                    alt="..."
                    width="100"
                    height="100"
                  />
                  <div>
                    <h3 className="fw-bold h4 mb-1 mt-3 text-white">HKUST</h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-3 pt-5 py-3">
                <div className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow">
                  <img
                    src="images/HKUST.jpg"
                    className="img-fluid mb-3 mt-n5 rounded-circle"
                    alt="..."
                    width="100"
                    height="100"
                  />
                  <div>
                    <h3 className="fw-bold h4 mb-1 mt-3 text-white">
                      HKUST_GZ
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-3 pt-5 py-3">
                <div className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow">
                  <img
                    src="images/SJTU.jpg"
                    className="img-fluid mb-3 mt-n5 rounded-circle"
                    alt="..."
                    width="100"
                    height="100"
                  />
                  <div>
                    <h3 className="fw-bold h4 mb-1 mt-3 text-white">SJTU</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-secondary">
        <div className="container pb-1 pt-1">
          <div className="col-9 col-lg-4 me-auto ms-auto">
            <hr />
          </div>
        </div>
      </div>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="currentColor"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="160"
        className="bg-secondary d-block text-dark"
      >
        <path d="M 100 100 V 20 L 0 100" />
        <path d="M 100 100 V 0 L 0 100" opacity="0.5" />
      </svg>
      <footer className="bg-dark pt-5 text-white">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 py-3">
              {' '}
              <a
                className="align-items-center d-inline-flex fw-bold h3 lh-1 link-primary mb-4 text-decoration-none text-uppercase"
                href="#"
              >
                {' '}
                <img src="images/UST.jpg" width="40" className="bg-light" />
                <span className="text-light">&nbsp; FINTECH HKUST</span>
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
                  &copy; 2002 - 2022 All Rights Reserved - HKUST
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

export default HomePage;
