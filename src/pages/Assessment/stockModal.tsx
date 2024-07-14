import { Button, Modal, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import KChart from '../Explainer/KChart';
import companyName from '../Explainer/company_full_name.json';
import styles from './index.less';
import {date_map} from './Explainer/map.js'

const StockModal = (props) => {
  const { modalName, stockList } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candleList, setCandleList] = useState<any[]>([]);
  const [candleLoading, setCandleLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const get_candle_data = async (stockList) => {
    // console.log('stock_list', stockList);
    setCandleLoading(true);
    const res: any[] = [];
    for (let item of stockList) {
      const r = await axios.get(
        `http://47.106.95.15:8000/get_pic_data/?stock=${item.substring(
          0,
          6,
        )}&date=2024-07-10`,
      );
      res.push(r.data);
    }
    // console.log('candle', res);
    setCandleList(res);
    setCandleLoading(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      console.log(1111);
      get_candle_data(stockList);
    }
  }, [isModalOpen]);


  const stockNameMap = useMemo(() => {
    const map = new Map();
    companyName.forEach((item) => {
      const code = item.code.split('.')[0];
      map.set(code, item.name);
    });
    return map;
  }, [companyName]);

  return (
    <>
      <Button type="primary" size='small' onClick={showModal}>
        查看推荐股票
      </Button>
      <Modal
        title={`Top3 推荐股票 [${
          modalName === 'NRSR' ? 'KEnhance' : modalName
        }]`}
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={1200}
        destroyOnClose={true}
      >
        <Spin spinning={candleLoading}>
          {candleList.length !== 0 &&
            stockList.map((item, idx) => {
              return (
                <div key={item}>
                  <div className={styles.title}>{`${item}(${stockNameMap.get(
                    item.substring(0, 6),
                  )})`}</div>
                  <KChart rawData={candleList[idx]} id={`${item}-k-chart`} />
                </div>
              );
            })}
        </Spin>
      </Modal>
    </>
  );
};

export default StockModal;
