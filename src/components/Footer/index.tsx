import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark pt-5 text-white" style={{ zIndex: 9 }}>
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
                This project is supported by Ministry of Science and Technology
                of the People´s Republic of China (MOST.GOV) and under
                development among HKUST-SJTU.
              </p>
            </div>
          </div>
        </div>
        <div className="pb-3 pt-3">
          <hr className="border-secondary mt-0" />
          <div className="align-items-center row">
            <div className="col-md pb-2 pt-2">
              <p className="mb-0">
                &copy; 2002 - 2022. All Rights Reserved.
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
  );
};

export default Footer;
