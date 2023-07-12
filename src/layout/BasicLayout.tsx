import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

interface PropsType {
  [key: string]: unknown;
  children: any;
}

const BasicLayout: React.FC<PropsType> = (props) => {
  const { children } = props;
  return (
    <div
      className="container pb-5 "
      id="kg-page"
      style={{ height: '100%', marginTop: '50px' }}
    >
      {children}
    </div>
  );
};

export default BasicLayout;
