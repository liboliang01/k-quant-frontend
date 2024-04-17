import { Timeline } from 'antd';
import React from 'react';
import BasicLayout from '../../layout/BasicLayout';

const Progress: React.FC = () => {
  return (
    <BasicLayout>
      <div style={{ position: 'relative', width: '100vw' }}>
        <div
          style={{ position: 'absolute', width: '100vw', top: 20, left: -450 }}
        >
          <Timeline
            mode={'left'}
            pending="Updating..."
            reverse={true}
            items={[
              {
                label: '2024-04-17 [The K-Quant website]',
                children: (
                  <>
                    <p>KB construction page supports automatic updates</p>
                    <p>K-Quant prediction page supports automatic updates</p>
                    <p>XAI page updated with new functions</p>
                  </>
                ),
              },
              {
                label: '2024-04-17 [The Zenedo HiDy dataset]',
                children: (
                  <>
                    <p>
                      The Zenedo HiDy dataset is also updated (latest version is
                      published on March) - Now HiDy currently contains 34
                      relation types, more than 504,736 relations, 17 entity
                      types, and more than 51,095 entities.
                    </p>
                    <p>
                      This month our news API is expired, we are still fixing it
                      by further using our own crawling.
                    </p>
                  </>
                ),
              },
              {
                label: '2024-04-17',
                children:
                  'Now we also support Events KB (45206 pieces), we will add this news to our website.',
              },
            ]}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default Progress;
