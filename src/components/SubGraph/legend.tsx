import React from 'react';
import styles from './index.less'

interface PropsType {
  relationColor: Record<string, string>;
}

const Legend: React.FC<PropsType> = (props) => {
  const { relationColor } = props;
  return (
    <div className={styles.legendBox}>
      {Object.entries(relationColor).map((item) => {
        const [name, color] = item;
        return (
            <div className={styles.legendItem}>
                <div className={styles.color} style={{backgroundColor:color}}></div>
                <div className={styles.name}>{name}</div>
            </div>
        )
      })}
    </div>
  );
};

export default Legend