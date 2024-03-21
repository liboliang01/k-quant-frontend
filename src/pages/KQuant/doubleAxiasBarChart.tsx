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

// function Max(value: { max: number; min: number }) {
//   let maxStr = +`${parseInt(Math.abs(value.max))}`[0] + 1;
//   let minStr = +`${parseInt(Math.abs(value.min))}`[0] + 1;
//   for (let i = 0; i < `${Math.ceil(Math.abs(value.max))}`.length - 1; i++) {
//     maxStr += '0';
//   }
//   for (let i = 0; i < `${Math.ceil(Math.abs(value.min))}`.length - 1; i++) {
//     minStr += '0';
//   }
//   return Math.abs(value.max) > Math.abs(value.min) ? +maxStr : +minStr;
// }

// function Min(value: { max: number; min: number }) {
//   let maxStr = +`${parseInt(Math.abs(value.max))}`[0] + 1;
//   let minStr = +`${parseInt(Math.abs(value.min))}`[0] + 1;
//   for (let i = 0; i < `${Math.ceil(Math.abs(value.max))}`.length - 1; i++) {
//     maxStr += '0';
//   }
//   for (let i = 0; i < `${Math.ceil(Math.abs(value.min))}`.length - 1; i++) {
//     minStr += '0';
//   }
//   return value.min >= 0
//     ? 0
//     : Math.abs(value.max) > Math.abs(value.min)
//     ? -+maxStr
//     : -+minStr;
// }

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

const DoubleAxiasBarChart: React.FC<PropTypes> = (props) => {
  const { tableData, isUpdate } = props;
  const domRef = useRef<echarts.ECharts>();

  const maxmin = useMemo(() => {
    const values: any[] = [];
    const typeList = isUpdate
      ? ['IC', 'ICIR', 'IC_incre', 'ICIR_incre', 'IC_DA', 'ICIR_DA']
      : ['IC', 'ICIR'];
    typeList.forEach((item, idx) => {
      const list: any[] = [];
      tableData.forEach((dataItem) => {
        list.push(dataItem[item]*1000);
      });
      const s = {
        data: list,
      };
      values.push(s);
    });
    // console.log(values);
    let max1;
    let max2;
    let min1;
    let min2;
    if (isUpdate) {
      const data1 = values[0].data;
      const data2 = values[1].data;
      const data3 = values[2].data;
      const data4 = values[3].data;
      const data5 = values[4].data;
      const data6 = values[5].data;
      max1 = Math.max(...data1, ...data3, ...data5);
      max2 = Math.max(...data2, ...data4, ...data6);
      min1 = Math.min(...data1, ...data3, ...data5);
      min2 = Math.min(...data2, ...data4, ...data6);
    } else {
      const data1 = values[0].data;
      const data2 = values[1].data;
      max1 = Math.max(...data1);
      max2 = Math.max(...data2);
      min1 = Math.min(...data1);
      min2 = Math.min(...data2);
    }

    const rat1 = min1 / max1;
    const rat2 = min2 / max2;
    const ratState = rat1 > rat2;

    /*设置极小值*/
    if (ratState) {
      min1 = rat2 * max1;
    } else {
      min2 = rat1 * max2;
    }

    let inter1 = Number((max1 - min1) / 6);
    let inter2 = Number((max2 - min2) / 6);

    /*对极值微调*/
    min1 = Number(((min1 / inter1) * inter1 * 1.2).toFixed(4));
    max1 = Number(((max1 / inter1) * inter1 * 1.2).toFixed(4));
    min2 = Number(((min2 / inter2) * inter2 * 1.2).toFixed(4));
    max2 = Number(((max2 / inter2) * inter2 * 1.2).toFixed(4));

    min1 = min1 > 0 ? 0 : min1;
    min2 = min2 > 0 ? 0 : min2;

    min1/=1000
    min2/=1000
    max1/=1000
    max2/=1000
    console.log({ min1, min2, max1, max2 });
    return { min1, min2, max1, max2 };
  }, [tableData, isUpdate]);

  const option: EChartsOption = useMemo(() => {
    const { min1, min2, max1, max2 } = maxmin;
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
            formatter: (value)=>value.toFixed(3),
          },
          // max: max1,
          // min: min1,
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
            formatter: (value)=>value.toFixed(3),
          },
          // max: max2,
          // min: min2,
          // interval: inter2,
        },
      ],
      series: values,
    };
  }, [tableData, isUpdate, maxmin]);

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
