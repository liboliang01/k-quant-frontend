import { DualAxes } from '@antv/g2plot';
import { useEffect, useMemo, useRef } from 'react';

interface PropsType {
  data: { datetime: string; return: number; bench: number }[];
}

const LineCharts = (props: PropsType) => {
  const { data } = props;
  const lineRef = useRef<DualAxes>();
  const tmpData: { date: string; type: string; value: number }[] =
    useMemo(() => {
      const tmp: { date: string; type: string; value: number }[] = [];
      data.forEach((item) => {
        tmp.push({
          date: item.datetime,
          type: 'CSI300 benchmark cumulative return',
          value: item.bench,
        });
        tmp.push({
          date: item.datetime,
          type: 'Model cumulative return',
          value: item.return,
        });
      });
      return tmp;
    }, [data]);

  const uvData = data.map((item, idx) => ({
    date: item.datetime,
    count: Math.random()*100,
    type: idx % 3 === 0,
  }));

  const render = () => {
    const line = new DualAxes('kquant-line-chart', {
      data: [uvData, tmpData],
      xField: 'date',
      yField: ['count', 'value'],
      yAxis: [false, false],
      // yAxis: {
      //   label: {
      //     // 数值格式化为千分位
      //     formatter: (v) =>
      //       `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      //   },
      // },
      // tooltip:{
      //   customContent:(title, data)=>{
      //     return `<div>${title}</div><div></div>`
      //   }
      // },
      // seriesField: 'type',
      // color: ({ type }) => {
      //   return type === 'CSI300 benchmark cumulative return'
      //     ? '#F4664A'
      //     : type === 'Model cumulative return'
      //     ? '#30BF78'
      //     : '#FAAD14';
      // },
      meta: {
        count: {
          alias: '成交量',
          range: [0, 0.2],
        },
        value: {
          range: [0.2, 1],
        },
      },
      geometryOptions: [
        {
          geometry: 'column',
          columnWidthRatio: 1,
          seriesField: 'type',
          color: ({ type }) => {
            return type ? '#F4664A' : '#30BF78';
          },
        },
        {
          geometry: 'line',
          seriesField: 'type',
          color: ({ type }) => {
            return type === 'CSI300 benchmark cumulative return'
              ? '#ffc53d'
              : '#13c2c2';
          },
        },
      ],
    });
    lineRef.current = line;

    line.render();
  };

  useEffect(() => {
    render();
  }, []);

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.changeData([uvData, tmpData]);
      lineRef.current?.render();
    }
  }, [tmpData]);

  return <div id="kquant-line-chart"></div>;
};

export default LineCharts;
