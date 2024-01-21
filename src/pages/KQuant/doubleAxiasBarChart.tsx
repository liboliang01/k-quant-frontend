import * as echarts from 'echarts';
import React, { useEffect, useMemo, useRef } from 'react';

type EChartsOption = echarts.EChartsOption;

interface PropTypes {
  tableData: any[];
  isUpdate: boolean;
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
  ['KEnhance', '【知识赋能】多层临时图注意力模型'],
  ['RSR', '关系注意力股票排序模型'],
  ['HIST', '【知识赋能】概念导向共享信息预测模型'],
  ['RSR_hidy_is', '【知识赋能】关系注意力股票排序模型'],
  ['IC', '信息系数（Rank IC）'],
  ['ICIR', '信息比率（Rank ICIR）'],
  ['IC_incre', '信息系数（Rank IC）[Gradient Based]'],
  ['ICIR_incre', '信息比率（Rank ICIR）[Gradient Based]'],
  ['IC_DA', '信息系数（Rank IC）[DoubleAdapt]'],
  ['ICIR_DA', '信息比率（Rank ICIR）[DoubleAdapt]'],
  ['max_drawdown', '最大回撤'],
  ['annualized_return', '超额年化率'],
]);

const DoubleAxiasBarChart: React.FC<PropTypes> = (props) => {
  const { tableData, isUpdate } = props;
  const domRef = useRef<echarts.ECharts>();

  const option: EChartsOption = useMemo(() => {
    const colors = [
      '#5470c6',
      '#91cc75',
      '#fac858',
      '#ee6666',
      '#73c0de',
      '#3ba272',
      '#fc8452',
      '#9a60b4',
      '#ea7ccc',
    ];
    const ICColor = ['#5470c6', '#91cc75'];
    // const ICIRColor = ['#fff566', '#faad14', '#fa541c'];
    const IRColor = [
      '#b7eb8f',
      '#91caff',
      '#73d13d',
      '#4096ff',
      '#237804',
      '#003eb3',
    ];
    const keys = tableData.map((item) =>
      tableData.length === 9
        ? `${intlMap.get(item.name)}(${item.name})`
        : `${intlMap.get(item.name)}\n(${item.name})`,
    );
    const values: any[] = [];
    const typeList = isUpdate
      ? ['IC', 'ICIR', 'IC_incre', 'ICIR_incre', 'IC_DA', 'ICIR_DA']
      : ['IC', 'ICIR'];
    typeList.forEach((item, idx) => {
      const list: any[] = [];
      tableData.forEach((dataItem) => {
        list.push(dataItem[item]);
      });
      const s = {
        name: intlMap.get(item),
        type: 'bar',
        data: list,
        yAxisIndex: String(item).includes('ICIR') ? 1 : 0,
        itemStyle: {
          color: isUpdate ? IRColor[idx] : ICColor[idx],
          //   borderColor: String(item).includes('DA') ? '#73d13d' : '#fff',
          //   borderWidth: String(item).includes('DA') ? 2 : 0,
        },
      };
      values.push(s);
    });
    return {
      //   color: colors,
      //   aria: {
      //     enabled: true,
      //     decal: {
      //       show: true,
      //     },
      //   },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        valueFormatter: (value) => Number(value).toFixed(3),
      },
      grid: {
        top: '20%',
        bottom: '20%',
      },
      legend: {
        data: typeList.map((item) => intlMap.get(item)),
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          // prettier-ignore
          data: keys,
          axisLabel: {
            formatter: {
              align: 'center',
              verticalAlign: 'center',
            },
            interval: 0,
            rotate: keys.length === 9 ? 15 : 0,
            // lineHeight:200,
            height: 200,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '信息系数（IC）',
          position: 'left',
          alignTicks: true,
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter: '{value}',
          },
        },
        {
          type: 'value',
          name: '信息比率（ICIR）',
          position: 'right',
          alignTicks: true,
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter: '{value}',
          },
        },
      ],
      series: values,
    };
  }, [tableData, isUpdate]);

  const render = () => {
    var chartDom = document.getElementById('DoubleAxiasBarChart')!;
    var myChart = echarts.init(chartDom);
    domRef.current = myChart;
    // option && myChart.setOption(option);
  };
  useEffect(() => {
    render();
  }, []);

  useEffect(() => {
    option && domRef.current?.setOption(option, true);
  }, [option, domRef.current]);

  return (
    <div
      id="DoubleAxiasBarChart"
      style={{ height: '500px', width: '100%' }}
    ></div>
  );
};

export default DoubleAxiasBarChart;
