import React from 'react';
import styles from './index.less';

interface PropsType {
  icon?: any;
  title: string;
  desc: string;
}

const DescCard: React.FC<PropsType> = (props) => {
  const { title, desc, icon } = props;
  return (
    <div className={styles.cardBox}>
      {icon ? <div className={styles.iconBox}>{icon}</div> : null}
      <div className={styles.contentBox}>
        <div className={styles.titleBox}>{title}</div>
        <div className={styles.descBox}>{desc}</div>
      </div>
    </div>
  );
};

export default DescCard;
