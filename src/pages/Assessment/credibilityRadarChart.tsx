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

const RadarChart = (props: PropTypes) => {
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
          { name: '可靠性得分', max: 1 },
          { name: '鲁棒性得分', max: 1 },
          { name: '稳定性得分', max: 1 },
          { name: '透明性得分', max: 1 },
          { name: '解释效果得分', max: 1 },
        ],
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

export default RadarChart;
