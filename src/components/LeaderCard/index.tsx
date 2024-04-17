import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import styles from './index.less';

interface PropsType {
  descList: string[];
  name: string;
  icon: string;
  subTitle: string;
}

const LeaderCard: React.FC<PropsType> = (props) => {
  const { descList, name, subTitle, icon } = props;
  return (
    <div className={styles.leaderCardBox}>
      <img
        src={icon}
        className="img-fluid mb-3 mt-n5 rounded-circle"
        alt="..."
        width="100"
        height="100"
      />
      <div>
        <h3 className="fw-bold h4 mb-1 ">{name}</h3>
        <h4 className="fw-light h5 mb-3 ">{subTitle}</h4>
        <div style={{ display: 'flex' }}>
          <ul className="mb-4" style={{ width: '100%', textAlign: 'left' }}>
            {descList.map((item) => {
              return (
                <li className="fw-bolder" key={item}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaderCard;
