import * as echarts from 'echarts';
import { useEffect, useMemo, useRef } from 'react';

interface PropTypes {
  rawData: any;
  id: string;
  stock: string;
}

const BarChart = (props: PropTypes) => {
  const { rawData, id, stock } = props;

  const chartRef = useRef<echarts.ECharts>();
  const option = useMemo(() => {
    console.log(rawData);
    const data = Object.keys(rawData.individual_scores).map((item) => {
      return {
        name: item,
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        barWidth: 40,
        showBackGround: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
          borderColor: '#000',
        },
        data: [Number(rawData.individual_scores[item] * 100).toFixed(2)],
      };
    });
    return {
      title: {
        text:
          stock +
          '\n' +
          `总分：${Number(rawData.total_score * 100).toFixed(2)}/100`,
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        // axisPointer: {
        //   // Use axis to trigger tooltip
        //   type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
        // },
      },
      legend: { show: false },
      grid: {
        top: 20,
      },
      xAxis: {
        type: 'value',
        // show: false,
        axisLabel: {
          show: false,
        },
        min: 0,
        max: 100,
      },
      yAxis: {
        type: 'category',
        show: false,
        data: ['总分'],
      },
      series: data,
    };
  }, [rawData, stock]);

  const render = () => {
    var chartDom = document.getElementById(id);
    var myChart = echarts.init(chartDom);
    chartRef.current = myChart;

    option && myChart.setOption(option);
  };
  useEffect(() => {
    render();
  }, []);

  useEffect(() => {
    option && chartRef.current?.setOption(option, true);
  }, [option, chartRef.current]);
  return <div id={id} style={{ height: '300px', width: '100%' }}></div>;
};

export default BarChart;
