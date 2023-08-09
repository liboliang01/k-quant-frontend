import Footer from '@/components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

interface PropsType {
  [key: string]: unknown;
  backgroundColor?: string;
  children: any;
}

const BasicLayout: React.FC<PropsType> = (props) => {
  const { backgroundColor = '#fff', children } = props;
  return (
    <div style={{ backgroundColor, position: 'relative' }}>
      <div
        className="container pb-5 "
        id="kg-page"
        style={{ minHeight: '600px', marginTop: '20px', paddingBottom: 0 }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default BasicLayout;
