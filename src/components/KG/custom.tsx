import React, { useEffect } from 'react';
import styles from './index.less';

interface PropsType {
  data: { nodes: any; links: any };
  onClick: (item: any) => void;
}

const KGContainer: React.FC<PropsType> = (props) => {
  const { data, onClick } = props;
  const render = () => {
    try {
      const rootNode = document.getElementById('k-quant-kg-container');
      const svg = rootNode?.getElementsByTagName('svg')?.[0];
      if (svg) {
        rootNode?.removeChild(svg);
      }

      var config = {
        //鼠标mouseover后的弹窗
        // content: '11111111',
        // contentHook: (item: any) => item.desc || null,
        //节点配色方案（可为空)
        nodeColor: [
          //粉红
          {
            fill: 'rgb(249, 235, 249)',
            stroke: 'rgb(162, 84, 162)',
            text: 'rgb(162, 84, 162)',
          },
          //灰色
          {
            fill: 'rgb(112, 202, 225)',
            stroke: '#23b3d7',
            text: 'rgb(93, 76, 93)',
          },
          { fill: '#ccc', stroke: 'rgb(145, 138, 138)', text: '#333' },
          { fill: '#D9C8AE', stroke: '#c0a378', text: 'rgb(60, 60, 60)' },
          {
            fill: 'rgb(178, 229, 183)',
            stroke: 'rgb(98, 182, 105)',
            text: 'rgb(60, 60, 60)',
          },
          //红
          {
            fill: 'rgb(248, 152, 152)',
            stroke: 'rgb(233, 115, 116)',
            text: 'rgb(60, 60, 60)',
          },
        ],
        //连接线配色方案（可为空）
        linkColor: null,
        width:
          (document.getElementById('k-quant-kg-container')?.clientWidth || 5) -
          10,
        height:
          (document.getElementById('k-quant-kg-container')?.clientHeight || 5) -
          10,
        onClick,
      };
      const copyData = JSON.parse(JSON.stringify(data));
      initKG2(copyData, config, '#k-quant-kg-container');
    } catch (err) {
      Materialize.toast('渲染存在异常', 2000);
      console.info(err);
    }
  };

  useEffect(() => {
    render();
  }, [data.links, data.nodes]);
  return (
    <div id="k-quant-kg-container" className={styles.containerCustom}></div>
  );
};

export default KGContainer;
