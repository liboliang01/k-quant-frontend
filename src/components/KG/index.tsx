import React, { useEffect } from 'react';
import styles from './index.less';

interface PropsType {
  data: { nodes: any; links: any };
  title: string;
}

const KGContainer: React.FC<PropsType> = (props) => {
  const { data, title } = props;
  const render = () => {
    try {
      const rootNode = document.getElementById('k-quant-kg-container');
      const svg = rootNode?.getElementsByTagName('svg')?.[0];
      if (svg) {
        rootNode?.removeChild(svg);
      }

      var config = {
        //鼠标mouseover后的弹窗
        content: null,
        contentHook: (item: any) => item.desc || null,
        //节点配色方案（可为空)
        nodeColor: null,
        //连接线配色方案（可为空）
        linkColor: null,
        width:
          (document.getElementById('k-quant-kg-container')?.clientWidth || 5) -
          10,
        height:
          (document.getElementById('k-quant-kg-container')?.clientHeight || 5) -
          10,
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
    <div id="k-quant-kg-container" className={styles.container}>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default KGContainer;
