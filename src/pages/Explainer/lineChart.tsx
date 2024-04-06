import * as echarts from 'echarts';
import moment from 'moment';
import { useEffect, useMemo, useRef } from 'react';

interface PropTypes {
  rawData: any;
  id: string;
  color: string;
}

const LineChart = (props: PropTypes) => {
  const { rawData, id, color } = props;
  const chartRef = useRef<echarts.ECharts>();
  const option = useMemo(() => {
    if (Array.isArray(rawData) === false || rawData.length === 0) return {};
    const legend = rawData.map((item: any) => {
      const key = Object.keys(item);
      return key[0];
    });
    const dates = Object.keys(rawData[0][legend[0]]).map((item: any) => {
      return moment(Number(item)).format('YYYY-MM-DD');
    });
    const series = rawData.map((item: any, idx: number) => {
      const key = Object.keys(item);
      return {
        name: key[0],
        type: 'line',
        stack: 'Total',
        data: Object.values(rawData[idx][legend[idx]]),
      };
    });
    return {
      title: {
        text: Object.keys(rawData[0])[0],
      },
      tooltip: {
        trigger: 'axis',
      },
      // 
      color:color,
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: false,
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
      },
      yAxis: {
        type: 'value',
        scale: true,
      },
      series: series,
    };
  }, [rawData]);

  const render = () => {
    var chartDom = document.getElementById(id);
    var myChart = echarts.init(chartDom);
    chartRef.current = myChart;

    option && myChart.setOption(option);
  };
  useEffect(() => {
    console.log(rawData);
    render();
  }, []);

  useEffect(() => {
    option && chartRef.current?.setOption(option, true);
  }, [option, chartRef.current]);
  return <div id={id} style={{ height: '200px', width: '100%' }}></div>;
};

export default LineChart;
