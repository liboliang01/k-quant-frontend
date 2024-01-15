import { Heatmap } from '@antv/g2plot';
import { useEffect, useMemo, useRef } from 'react';

interface PropsType {
  data: { datetime: string; return: number; bench: number }[];
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

const HeatCharts = (props: PropsType) => {
  const { data } = props;
  const heatmapRef = useRef<Heatmap>();

  const tmpData: any[] = useMemo(() => {
    const tmp: any[] = [];
    data.forEach((item: any) => {
      const name = item.name;
      const keys = Object.keys(item);
      keys.forEach((key) => {
        if (item.hasOwnProperty(key)) {
          if (key !== 'name' && key !== 'key' && key !== 'information_ratio') {
            const curr = {
              week: intlMap.get(key),
              time: `${intlMap.get(name)}(${name})`,
              value: item[key],
            };
            tmp.push(curr);
          }
        }
      });
    });
    return tmp;
  }, [data]);

  const maxmin: number[] = useMemo(() => {
    let max = Infinity;
    let min = -Infinity;
    tmpData.forEach((item) => {
      const { value } = item;
      if (value > max) {
        max = value;
      }
      if (value < min) {
        min = value;
      }
    });
    return [max, min];
  }, [tmpData]);

  const render = () => {
    const heatmapPlot = new Heatmap('kquant-heatmap-chart', {
      data: tmpData,
      xField: 'time',
      yField: 'week',
      colorField: 'value',
      legend: true,
      color: '#BAE7FF-#1890FF-#1028ff',
      coordinate: {
        // 坐标轴属性配置
        type: 'polar', // 极坐标
        cfg: {
          innerRadius: 0.2,
        },
      },
      heatmapStyle: {
        stroke: '#f5f5f5',
        opacity: 0.8,
      },
      meta: {
        time: {
          type: 'cat',
        },
        value: {
          min: maxmin[0],
          max: maxmin[1],
        },
      },
      xAxis: {
        line: null,
        grid: null,
        tickLine: null,
        label: {
          offset: 12,
          style: {
            fill: '#666',
            fontSize: 12,
            textBaseline: 'top',
          },
        },
      },
      yAxis: {
        top: true,
        line: null,
        grid: null,
        tickLine: null,
        label: {
          offset: 0,
          style: {
            fill: '#666',
            textAlign: 'center',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
          },
        },
      },
      tooltip: {
        showMarkers: false,
      },
      interactions: [{ type: 'element-active' }],
    });

    heatmapPlot.render();
    heatmapRef.current = heatmapPlot;
  };

  useEffect(() => {
    render();
  }, []);

  useEffect(() => {
    if (heatmapRef.current) {
      heatmapRef.current.changeData(tmpData);
      heatmapRef.current?.render();
    }
  }, [tmpData]);

  return <div id="kquant-heatmap-chart"></div>;
};

export default HeatCharts;
