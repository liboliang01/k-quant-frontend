import { Datum, DualAxes } from '@antv/g2plot';
import { useEffect, useMemo, useRef } from 'react';

interface PropsType {
  data: { datetime: string; return: number; bench: number }[];
  isUpdate: boolean;
}

const LineCharts = (props: PropsType) => {
  const { data, isUpdate } = props;
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
          type: isUpdate
            ? 'DoubleAdapt cumulative return'
            : 'Model cumulative return',
          value: item.return,
        });
      });
      return tmp;
    }, [data]);

  const uvData = data.map((item, idx) => ({
    date: item.datetime,
    count: Math.random() * 100,
    type: idx % 3 === 0,
  }));

  const render = () => {
    const line = new DualAxes('kquant-line-chart', {
      data: [uvData, tmpData],
      // data: [tmpData, uvData],
      xField: 'date',
      yField: ['count', 'value'],
      tooltip: {
        fields: ['type', 'value'],
        customItems: (originalItems: any[]) => {
          return originalItems.filter((item) => !isNaN(Number(item.value)));
        },
        formatter: (datum: Datum) => {
          return { name: datum.type, value: Number(datum.value).toFixed(3) };
        },
      },
      yAxis: {
        count: false,
        value: {
          position: 'left',
          nice: true,
          tickCount: 5,
          // tickMethod:'cat',
          grid: {
            line: {
              style: {
                stroke: 'rgba(0, 0, 0, 0.1)',
              },
            },
            // alignTick: false,
          },
        },
      },
      meta: {
        value: {
          range: [0.2, 1],
          tickCount: 4,
        },
        count: {
          alias: '成交量',
          range: [0, 0.2],
        },
      },
      annotations: {
        value: [
          {
            type: 'line',
            start: ['min', 0],
            end: ['max', 0],
            style: {
              stroke: 'rgba(255, 0, 0, 0.25)',
              lineDash: [10, 10],
            },
          },
        ],
      },
      geometryOptions: [
        {
          geometry: 'column',
          columnWidthRatio: 0.8,
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
      legend:{
        itemWidth:300,
        maxWidth:3000,
        itemSpacing:20,
        autoEllipsis:false,
        itemName:{
          spacing:10
        }
      }
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