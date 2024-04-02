import * as echarts from 'echarts';
import { useEffect, useMemo, useRef } from 'react';

interface PropTypes {
  rawData: any;
  id: string;
}

const color_list = [
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

const investRadarChart = (props: PropTypes) => {
  const { rawData, id } = props;

  const chartRef = useRef<echarts.ECharts>();
  const option = useMemo(() => {
    const data = rawData.map((item: Record<string, number>, idx: number) => {
      return {
        name: `组合${idx + 1}`,
        value: Object.values(item),
        areaStyle: {
          color: color_list[idx],
          opacity: 0.3,
        },
      };
    });
    return {
      // title: {
      //   text: '模型组合评价图',
      // },
      legend: {
        data: data.map((item: Record<string, number>) => item.name),
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '用户收益偏 好得分', max: 1 },
          { name: '用户风险偏好得分', max: 1 },
          { name: '用户投资体验感得分', max: 1 },
          { name: '沪深300指数比较得分', max: 1 },
          { name: '中证500指数比较得分', max: 1 },
          { name: '基准比较得分', max: 1 },
          { name: '同行业股票比较对比得分', max: 1 },
        ],
        axisName: {
          // show: true,
          color: 'black',
        },
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: data,
        },
      ],
    };
  }, [rawData]);

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
  return <div id={id} style={{ height: '500px', width: '100%' }}></div>;
};

export default investRadarChart;
