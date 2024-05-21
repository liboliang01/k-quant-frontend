import { DualAxes } from '@antv/g2plot';
import insertCss from 'insert-css';
import { useEffect, useMemo, useRef } from 'react';
import styles from './index.less';

insertCss(`
    .custom-tooltip-list{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top:10px
    }
    .circle-box{
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .circle{
      border-radius: 50%;
      width: 10px;
      height: 10px;
      margin-right: 5px;
    }
    .box{
      width: 270px;
        background: #fff;
        border-radius: 5px;
        padding: 10px;
        border: 1px solid rgba(0,0,0,0.5),
    }
   
`);

interface PropsType {
  data: { data: any[]; volume: any[] };
  modelList: string[];
}

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
                  style={{ backgroundColor: `${item.color}` }}
                ></div>
                <div>{item.name}</div>
              </div>
              <div>{item.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LineCharts = (props: PropsType) => {
  const { data, modelList } = props;
  const lineRef = useRef<DualAxes>();
  const tmpData: { date: string; type: string; value: number }[] =
    useMemo(() => {
      const tmp: { date: string; type: string; value: number }[] = [];
      data.data.forEach((list: any[], idx) => {
        list.forEach((item) => {
          if (idx === 0) {
            tmp.push({
              date: item.datetime,
              type: 'CSI300 benchmark cumulative return',
              value: item.bench,
            });
          }

          tmp.push({
            date: item.datetime,
            type: modelList[idx],
            value: item[modelList[idx]],
          });
        });
      });
      // console.log(tmp)
      return tmp;
    }, [data]);

  const uvData = data.volume
    .map((item, idx) => ({
      date: item.date,
      count: item.volume,
      type: '成交量',
      color: idx % 3 === 0,
    }))
    // .reverse();

  const render = () => {
    const line = new DualAxes('kquant-line-chart', {
      data: [uvData, tmpData],
      xField: 'date',
      yField: ['count', 'value'],
      // tooltip: {
      //   fields: ['type', 'value', 'count'],
      //   enterable:true,
      //   formatter: (datum: Datum) => {
      //     return {
      //       name: datum.type,
      //       value: datum.value
      //         ? Number(datum.value).toFixed(3)
      //         : Number(datum.count).toFixed(3),
      //     };
      //   },
      //   showMarkers:true
      // },
      tooltip: {
        showMarkers: false,
        enterable: true,
        domStyles: {
          'g2-tooltip': {
            width: '270px',
            padding: 5,
          },
        },
        customContent: (title, items) => {
          let domList = '';
          items.forEach((item) => {
            const { color, name, value } = item;
            if (name === 'true' || name === 'false') {
            } else {
              const div = `<div class="custom-tooltip-list"><div class="circle-box"><div class="circle" style=" background-color: ${color} "></div><div>${name}</div></div><div>${Number(
                value,
              ).toFixed(2)}</div></div>`;
              domList = domList + div;
            }
          });
          return `<div class="box"><div>${title}</div><div>${domList}</div><div style="margin-top:10px"><a href="/#/explainer/${title}" target="_blank">查看当日Explainer</a></div></div>`;
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
          seriesField: 'color',
          color: ({ color }) => {
            return color ? '#ee6666' : '#30BF78';
          },
        },
        {
          geometry: 'line',
          seriesField: 'type',
          // color: ({ type }) => {
          //   return type === 'CSI300 benchmark cumulative return'
          //     ? '#ffc53d'
          //     : '#13c2c2';
          // },
        },
      ],
      legend: {
        // itemWidth: 300,
        // maxWidth: 3000,
        itemSpacing: 20,
        autoEllipsis: false,
        itemName: {
          spacing: 10,
        },
      },
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
