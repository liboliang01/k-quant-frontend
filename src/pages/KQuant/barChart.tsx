import { Column, Datum } from '@antv/g2plot';
import { useEffect, useMemo, useRef } from 'react';

interface PropsType {
  data: any[];
}

const intlMap = new Map([
  ['MLP', '多层感知机'],
  ['LSTM', '长短期记忆神经网络'],
  ['ALSTM', '注意力机制长短期记忆神经网络'],
  ['GRU', '门控循环单元网络'],
  ['SFM', '离散状态频率记忆神经网络'],
  ['GATs', '图注意力网络'],
  ['average', '平均集成'],
  ['blend', '线性拟合'],
  ['dynamic_ensemble', '动态拟合'],
  // ['ensemble_no_retrain', '多模型重采样融合'],
  ['ensemble_retrain', '多模型重采样融合'],
  // ['Perfomance_based_ensemble', '多模型重采样融合3'],
  ['KEnhance', '多层临时图注意力模型'],
  ['RSR', '关系注意力股票排序模型'],
  ['HIST', '概念导向共享信息预测模型'],
  ['RSR_hidy_is', '关系注意力股票排序模型（使用K-quant知识图谱）'],
  ['IC', '信息系数（Rank IC）'],
  ['ICIR', '信息比率（Rank ICIR）'],
  ['IC_incre', '信息系数（Rank IC）[Gradient Based]'],
  ['ICIR_incre', '信息比率（Rank ICIR）[Gradient Based]'],
  ['IC_DA', '信息系数（Rank IC）[DoubleAdapt]'],
  ['ICIR_DA', '信息比率（Rank ICIR）[DoubleAdapt]'],
  ['max_drawdown', '最大回撤'],
  ['annualized_return', '超额年化率'],
]);

const d = [
  {
    city: '石家庄',
    type: '水果',
    value: 14500,
  },
  {
    city: '石家庄',
    type: '米面',
    value: 8500,
  },
  {
    city: '石家庄',
    type: '特产零食',
    value: 10000,
  },
  {
    city: '石家庄',
    type: '茶叶',
    value: 7000,
  },
  {
    city: '深圳',
    type: '水果',
    value: 9000,
  },
  {
    city: '深圳',
    type: '米面',
    value: 8500,
  },
  {
    city: '深圳',
    type: '特产零食',
    value: 11000,
  },
  {
    city: '深圳',
    type: '茶叶',
    value: 6000,
  },
  {
    city: '温州',
    type: '水果',
    value: 16000,
  },
  {
    city: '温州',
    type: '米面',
    value: 5000,
  },
  {
    city: '温州',
    type: '特产零食',
    value: 6000,
  },
  {
    city: '温州',
    type: '茶叶',
    value: 10000,
  },
  {
    city: '宁波',
    type: '水果',
    value: 14000,
  },
  {
    city: '宁波',
    type: '米面',
    value: 9000,
  },
  {
    city: '宁波',
    type: '特产零食',
    value: 10000,
  },
  {
    city: '宁波',
    type: '茶叶',
    value: 9000,
  },
  {
    city: '无锡',
    type: '水果',
    value: 14000,
  },
  {
    city: '无锡',
    type: '米面',
    value: 9000,
  },
  {
    city: '无锡',
    type: '特产零食',
    value: 10000,
  },
  {
    city: '无锡',
    type: '茶叶',
    value: 6000,
  },
  {
    city: '杭州',
    type: '水果',
    value: 9000,
  },
  {
    city: '杭州',
    type: '米面',
    value: 8500,
  },
  {
    city: '杭州',
    type: '特产零食',
    value: 10000,
  },
  {
    city: '杭州',
    type: '茶叶',
    value: 6000,
  },
  {
    city: '北京',
    type: '水果',
    value: 17000,
  },
  {
    city: '北京',
    type: '米面',
    value: 6000,
  },
  {
    city: '北京',
    type: '特产零食',
    value: 7000,
  },
  {
    city: '北京',
    type: '茶叶',
    value: 10000,
  },
  {
    city: '上海',
    type: '水果',
    value: 18000,
  },
  {
    city: '上海',
    type: '米面',
    value: 11000,
  },
  {
    city: '上海',
    type: '特产零食',
    value: 15000,
  },
  {
    city: '上海',
    type: '茶叶',
    value: 14000,
  },
];

const BarCharts = (props: PropsType) => {
  const { data } = props;
  const barRef = useRef<Column>();

  const tmpData: any[] = useMemo(() => {
    const tmp: any[] = [];
    data.forEach((item: any) => {
      const name = item.name;
      const keys = Object.keys(item);
      keys.forEach((key) => {
        if (item.hasOwnProperty(key)) {
          if (
            key !== 'name' &&
            key !== 'key' &&
            key !== 'information_ratio' &&
            key !== 'annualized_return' &&
            key !== 'max_drawdown'
          ) {
            const curr = {
              city: `${intlMap.get(name)}(${name})`,
              type: intlMap.get(key),
              value: item[key],
            };
            tmp.push(curr);
          }
        }
      });
    });
    return tmp;
  }, [data]);

  const render = () => {
    const column = new Column('kquant-bar-chart', {
      data: tmpData,
      height: 600,
      xField: 'city',
      yField: 'value',
      seriesField: 'type',
      isGroup: 'true',
      tooltip: {
        fields: ['type', 'value'],
        customItems: (originalItems: any[]) => {
          return originalItems.filter((item) => !isNaN(Number(item.value)));
        },
        formatter: (datum: Datum) => {
          return { name: datum.type, value: Number(datum.value).toFixed(3) };
        },
      },
      pattern: ({ type }) => {
        const DoubleAdapt = type.includes('DoubleAdapt');
        return { type: DoubleAdapt && 'line' };
      },
      legend: {
        flipPage: false,
      },
      xAxis: { label: { autoRotate: true } },
      columnStyle: {
        radius: [0, 0, 0, 0],
      },
    });
    barRef.current = column;

    column.render();
  };

  useEffect(() => {
    render();
  }, []);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.changeData(tmpData);
      barRef.current?.render();
    }
  }, [tmpData]);

  return <div id="kquant-bar-chart"></div>;
};

export default BarCharts;
