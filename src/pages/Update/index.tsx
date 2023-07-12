import React from 'react';
import Richly from '../../../public/images/Richly.png';
import BasicLayout from '../../layout/BasicLayout';

const FinKGUpdate: React.FC = () => {
  return (
    <BasicLayout>
      <div style={{ textAlign: 'center' }}>
        <img src={Richly} style={{ width: '60%' }} />
      </div>
    </BasicLayout>
  );
};

export default FinKGUpdate;
