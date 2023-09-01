import React from 'react';
import styles from './dynamicTitle.less'

const DynamicTitle: React.FC = () => {
  return (
    <div className={styles.container}>
      <span className="K">K</span>
      <span className="-">-</span>
      <span className="Q">Q</span>
      <span className="U">U</span>
      <span className="A">A</span>
      <span className="N">N</span>
      <span className="T">T</span>
    </div>
  );
};

export default DynamicTitle;
