import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import Legend from './legend';

interface PropsType {
  suits: { source: string; target: string; type: string }[];
  id?: string;
  width?: number;
}

const RelationColor = {
  'SW belongs to': '#f5222d',
  'managed by': '#fa541c',
  'company locate in city': '#fa8c16',
  'work for': '#faad14',
  hold: '#fadb14',
  same_industry: '#a0d911',
  rise: '#52c41a',
  compete: '#13c2c2',
  cooperate: '#1677ff',
  'increase holding': '#2f54eb',
  fall: '#722ed1',
  supply: '#eb2f96',
  'be reduced holding': '#8c8c8c',
  'be invested': '#5d0066',
  'reduce holding': '#002766',
  superior: '#ffbb96',
  'be increased holding': '#5c0011',
  subordinate: '#eaff8f',
  invest: '#874d00',
  dispute: '#b5f5ec',
  'be supplied': '#efdbff',
  unknown: 'black',
};

const SubGraph = (props: PropsType) => {
  const { suits, id = 'graph-svg-container', width = 928 } = props;
  const [svgNode, setSvgNode] = useState<any>();

  useEffect(() => {
    if (suits.length !== 0) {
      // 清空上一次渲染
      if (svgNode) {
        svgNode.selectAll('*').remove();
      }
      const height = 600;
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const types = Array.from(new Set(suits.map((d) => d.type)));
      const nodes = Array.from(
        new Set(suits.flatMap((l) => [l.source, l.target])),
        (id) => ({ id }),
      );
      const links = suits.map((d) => Object.create(d));
      // Create a simulation with several forces.
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3.forceLink(links).id((d: { id: any }) => {
            return d.id;
          }),
        )
        .force('charge', d3.forceManyBody().strength(-1000))
        .force('x', d3.forceX())
        .force('y', d3.forceY());

      // Create the SVG container.
      const svg = d3
        .select(`#${id}`)
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .attr('style', 'max-width: 100%; height: auto;');

      // Per-type markers, as they don't inherit styles.
      svg
        .append('defs')
        .selectAll('marker')
        .data(types)
        .join('marker')
        .attr('id', (d: any) => `arrow-${d}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 15)
        .attr('refY', -0.5)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('fill', color)
        .attr('d', 'M0,-5L10,0L0,5');

      setSvgNode(svg);

      const link = svg
        .append('g')
        .attr('fill', 'none')
        .selectAll('g')
        .data(links)
        .join('g')
        .append('path')
        .attr('stroke-width', (d: any) => {
          if (d && d.tag) {
            return 10;
          }
          return 3;
        })
        .attr('stroke', (d: { type: 'invest' }) => {
          return RelationColor[d.type] || '#000000';
        });
      // .attr(
      //   'marker-end',
      //   (d: { type: any }) =>
      //     `url(${new URL(
      //       `#arrow-${d.type}`,
      //       window.location as unknown as string,
      //     )})`,
      // );

      function dragstarted(
        event: { active: any },
        d: { fx: any; x: any; fy: any; y: any },
      ) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event: { x: any; y: any }, d: { fx: any; fy: any }) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event: { active: any }, d: { fx: null; fy: null }) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      const node = svg
        .append('g')
        .attr('fill', 'currentColor')
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')
        .selectAll('g')
        .data(nodes)
        .join('g')
        .call(
          d3
            .drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended),
        );

      node
        .append('circle')
        .attr('stroke', 'white')
        .attr('stroke-width', 1.5)
        .attr('r', 10)
        .attr('fill', () => '#1677ff');

      // node.append('title').text((d: { id: any }) => d.id);

      node
        .append('text')
        .attr('x', 8)
        .attr('y', '0.31em')
        .text((d: { id: any }) => d.id)
        .clone(true)
        .lower()
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', 3);

      // Set the position attributes of links and nodes each time the simulation ticks.
      function linkArc(d: {
        target: { x: number; y: number };
        source: { x: number; y: number };
      }) {
        const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
        return `
            M${d.source.x},${d.source.y}
            A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
          `;
      }
      simulation.on('tick', () => {
        link.attr('d', linkArc);
        node.attr(
          'transform',
          (d: { x: any; y: any }) => `translate(${d.x},${d.y})`,
        );
      });
    }
  }, [suits, id]);

  return (
    <div>
      <Legend relationColor={RelationColor} />
      <svg id={id}></svg>
    </div>
  );
};

export default SubGraph;
