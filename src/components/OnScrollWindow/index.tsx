import { history } from '@umijs/max';
import { Button } from 'antd';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './index.less';

const OnScrollWindow: React.FC = () => {
  const [selectedId, setSelectId] = useState<number>(1);
  const ref = useRef<HTMLDivElement>(null);
  const [tabHeight, setTabHeight] = useState(0);

  useEffect(() => {
    setTabHeight(Number(ref.current?.clientHeight));
  }, [ref.current]);

  const InfoList = useMemo(() => {
    return [
      {
        name: 'tab1',
        id: 1,
        link: '/update',
      },
      {
        name: 'tab2',
        id: 2,
        link: '/datasources',
      },
      {
        name: 'tab3',
        id: 3,
        link: '/kquant',
      },
    ];
  }, []);

  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    console.log(scrollTop);
    if (scrollTop < tabHeight && selectedId !== 1) {
      setSelectId(1);
    } else if (
      scrollTop >= tabHeight * 1 &&
      scrollTop < tabHeight * 2 &&
      selectedId !== 2
    ) {
      setSelectId(2);
    } else if (
      scrollTop >= tabHeight * 2 &&
      scrollTop < tabHeight * 3 &&
      selectedId !== 3
    ) {
      setSelectId(3);
    }
  }, [selectedId, tabHeight]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const onClickHeader = (id: number) => {
    // setSelectId(id);
    switch (id) {
      case 1:
        document.documentElement.scrollTop = 0;
        break;
      case 2:
        document.documentElement.scrollTop = tabHeight + 1;
        break;
      case 3:
        document.documentElement.scrollTop = tabHeight*2 + 1;
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headers}>
        {InfoList.map((item) => {
          return (
            <div
              className={`${styles.box} ${
                selectedId === item.id ? styles.selectHeader : styles.header
              }`}
              key={item.id}
              onClick={() => onClickHeader(item.id)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className={styles.tabs} ref={ref}>
        <div className={styles.blocker}></div>
        {InfoList.map((item) => {
          return (
            <div
              className={`${styles.box} ${
                selectedId === item.id ? styles.selectTab : styles.tab
              }`}
              key={item.id}
            >
              <p>This is the content of {item.name}</p>
              <Button onClick={() => history.push(item.link)}>
                go to {item.name} detail page
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnScrollWindow;
