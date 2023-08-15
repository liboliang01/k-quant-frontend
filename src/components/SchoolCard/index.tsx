import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import styles from './index.less';

interface PropsType {
  name: string;
  icon: string;
}

const SchoolCard: React.FC<PropsType> = (props) => {
  const { name, icon } = props;
  return (
    <div className={styles.cardBox}>
      <div className="border border-primary pb-4 pe-4 ps-4 pt-2 rounded shadow">
        <img
          src={icon}
          className="img-fluid mb-3 mt-n5 rounded-circle"
          alt="..."
          width="100"
          height="100"
        />
        <div>
          <h3 className="fw-bold h4 mb-1 mt-3 text-white">{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;
