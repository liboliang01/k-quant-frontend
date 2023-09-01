import { SmileOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Result, Button } from 'antd';
import React from 'react';

const Coming: React.FC = () => {
  return (
    <>
      <Result
        icon={<SmileOutlined />}
        title="页面还在开发中，请先查看其他页面"
        extra={<Button type="primary" onClick={()=>history.push('/welcome')}>Go Home</Button>}
      />
    </>
  );
};

export default Coming;
