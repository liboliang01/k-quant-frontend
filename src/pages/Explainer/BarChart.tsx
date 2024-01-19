import * as echarts from 'echarts';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.less';

interface PropTypes {
  rawData: any;
  id: string;
  stock: string;
}

const colorList = [
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

const ToolTips = (props: { data: any[] }) => {
  const { data } = props;
  return (
    <div
      style={{
        width: 200,
        background: '#fff',
        borderRadius: '5px',
        padding: 10,
        border: '1px solid rgba(0,0,0,0.5)',
      }}
    >
      <div>总分</div>
      <div>
        {data.map((item, idx) => {
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <div
                  className={styles.circle}
                  style={{ backgroundColor: `${colorList[idx % 9]}` }}
                ></div>
                <div>{item.name}</div>
              </div>
              <div>{item.data}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BarChart = (props: PropTypes) => {
  const { rawData, id, stock } = props;
  const [toolTipData, setToolTipData] = useState<any[]>();

  const chartRef = useRef<echarts.ECharts>();
  const option = useMemo(() => {
    const data = Object.keys(rawData.individual_scores)
      .map((item) => {
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
      })
      .sort((a, b) => Number(b.data) - Number(a.data));
    setToolTipData(data);
    return {
      title: {
        text:
          stock +
          '\n' +
          `总分：${Number(rawData.total_score * 100).toFixed(2)}/100`,
        left: 'center',
      },
    //   tooltip: {
    //     trigger: 'none',
    //   },
      legend: { show: false },
      grid: {
        top: -50,
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
  return (
    <div style={{ position: 'relative' }}>
      <div id={id} style={{ height: '300px', width: '100%' }}></div>
      <div
        style={{
          position: 'absolute',
          top: '150px',
          left: '50%',
          transform: 'translate(-50%,0)',
        }}
      >
        {toolTipData && <ToolTips data={toolTipData} />}
      </div>
    </div>
  );
};

export default BarChart;
