import * as echarts from 'echarts';
import moment from 'moment';
import { useEffect, useMemo, useRef } from 'react';

interface PropTypes {
  rawData: any;
  id:string
}

const KChart = (props: PropTypes) => {
  const { rawData,id } = props;

  const chartRef = useRef<echarts.ECharts>();
  const option = useMemo(() => {
    // // prettier-ignore
    // const dates = ["2016-03-29", "2016-03-30", "2016-03-31", "2016-04-01", ];
    // // prettier-ignore
    // const data = [[17512.58,17633.11,17434.27,17642.81,86160000],[17652.36,17716.66,17652.36,17790.11,79330000],[17716.05,17685.09,17669.72,17755.7,102600000],[17661.74,17792.75,17568.02,17811.48,104890000]];
    // // prettier-ignore
    // const volumes = [86160000,79330000,102600000,104890000];
    // console.log(rawData);
    if (rawData.volume) {
      const dates = Object.keys(rawData.volume).map((item: string) => {
        return moment(Number(item)).format('YYYY-MM-DD');
      });
      const close = Object.values(rawData.close);
      const open = Object.values(rawData.open);
      const high = Object.values(rawData.high);
      const low = Object.values(rawData.low);
      const len = dates.length;
      const data: any[] = [];
      new Array(len).fill(0).forEach((item, idx) => {
        data.push([close[idx], open[idx], low[idx], high[idx]]);
      });
      const volumes = Object.values(rawData.volume);
    //   console.log(dates);
    //   console.log(data);
    //   console.log(volumes);
      return {
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          //   confine: true,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#333',
          backgroundColor: 'rgba(255,255,255,0.9)',
          textStyle: {
            fontSize: 12,
            color: '#333',
          },
          axisPointer: {
            type: 'cross',
          },
          position: function (pos, params, el, elRect, size) {
            const obj: Record<string, number> = {
              top: 10,
            };
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
          },
        },
        axisPointer: {
          link: [{ xAxisIndex: [0, 1] }],
        },
        xAxis: [
          {
            type: 'category',
            data: dates,
            boundaryGap: false,
            axisLine: { lineStyle: { color: '#777' } },
            // axisLabel: {
            //   formatter: function (value: any) {
            //     return echarts.format.formatTime('MM-dd', value);
            //   },
            // },
            min: 'dataMin',
            max: 'dataMax',
          },
          {
            type: 'category',
            gridIndex: 1,
            data: dates,
            boundaryGap: false,
            splitLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            axisLine: { lineStyle: { color: '#777' } },
            min: 'dataMin',
            max: 'dataMax',
          },
        ],
        yAxis: [
          {
            scale: true,
            splitNumber: 2,
            axisLine: { lineStyle: { color: '#777' } },
            splitLine: { show: true },
            axisTick: { show: false },
            axisLabel: {
              inside: true,
              formatter: '{value}\n',
            },
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
          },
        ],
        grid: [
          {
            left: 20,
            right: 20,
            top: 20,
            height: 120,
          },
          {
            left: 20,
            right: 20,
            height: 50,
            top: 170,
          },
        ],
        series: [
          {
            name: 'Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              color: '#7fbe9e',
            },
            emphasis: {
              itemStyle: {
                color: '#140',
              },
            },
            data: volumes,
          },
          {
            type: 'candlestick',
            name: '日K',
            data: data,
            itemStyle: {
              color: '#ef232a',
              color0: '#14b143',
              borderColor: '#ef232a',
              borderColor0: '#14b143',
            },
            emphasis: {
              itemStyle: {
                color: 'black',
                color0: '#444',
                borderColor: 'black',
                borderColor0: '#444',
              },
            },
          },
        ],
      };
    }
    return null;
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
  return <div id={id} style={{ height: '300px', width: '100%' }}></div>;
};

export default KChart;
