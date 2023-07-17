import { Link } from '@umijs/max';
import React from 'react';
import BasicLayout from '../../layout/BasicLayout';

const FinKGUpdate: React.FC = () => {
  return (
    <BasicLayout>
      <div style={{ textAlign: 'center' }}>
        <h1>404-路径错误</h1>
        <Link to="/home">返回首页</Link>
      </div>
    </BasicLayout>
  );
};

export default FinKGUpdate;
