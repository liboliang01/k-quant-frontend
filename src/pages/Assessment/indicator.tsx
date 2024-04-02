import { Collapse, CollapseProps } from 'antd';
import React from 'react';

interface PropTypes {
  desc: Record<string, string>;
}

const Indicator: React.FC<PropTypes> = (props) => {
  const { desc } = props;
  const items: CollapseProps['items'] = Object.keys(desc).map(
    (item: string | number, idx: any) => {
      return {
        key: idx,
        label: item,
        children: desc[item],
      };
    },
  );

  return (
    <div style={{ width: 400 }}>
      <Collapse
        items={items}
        bordered={false}
        defaultActiveKey={['0']}
        size="small"
      />
    </div>
  );
};

export default Indicator;
