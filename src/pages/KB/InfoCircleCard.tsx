import { Image } from 'antd';
import React from 'react';
import styles from './card.less';

interface PropsType {
  image: string;
  number: string;
  name: string;
}

const InfoCircleCard: React.FC<PropsType> = (props) => {
  const { image, number, name } = props;
  return (
    // <div className={styles.box}>

    // </div>
    <div className={styles.container}>
      <div>
        <Image src={image} preview={false} width={75} height={75}/>
      </div>
      <div>
        <div className={styles.number}>{number}</div>
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  );
};

export default InfoCircleCard;
