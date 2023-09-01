import { SmileOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Result, Space } from 'antd';
import React, { useEffect, useState } from 'react';

const APIPage: React.FC = () => {
  const [second, setSecond] = useState<number>(3);
  useEffect(() => {
    let tmp = 3;
    const timer = setInterval(() => {
      tmp--;
      setSecond(tmp);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      window.open('http://143.89.126.57:8001/docs#/');
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <Result
        icon={<SmileOutlined />}
        title={`新版API页面还在开发中，请先跳转到旧版页面查看，将在${second}s后自动打开旧版页面`}
        extra={
          <Space>
            <Button onClick={() => history.push('/welcome')}>返回首页</Button>
            <Button
              type="primary"
              onClick={() => window.open('http://143.89.126.57:8001/docs#/')}
            >
              旧版页面
            </Button>
          </Space>
        }
      />
    </>
  );
};

export default APIPage;
