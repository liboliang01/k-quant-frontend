import * as d3 from 'd3';

// interface RelaNodeType {
//   source: string;
//   target: string;
//   rela: string;
// }

// function getSubGraph(
//   graphData: RelaNodeType[],
//   nodeName: string,
//   relationType: string,
// ) {
//   let result = graphData.filter((link) => {
//     if (relationType === 'all') {
//       if (link.source === nodeName && link.rela !== 'unknown') {
//         return true;
//       } else {
//         return false;
//       }
//     }
//     if (
//       link.source === nodeName &&
//       link.rela === relationType &&
//       link.rela !== 'unknown'
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   });
//   return result;
// }

// class GraphNode {
//   name: string;
//   x: number;
//   y: number;
//   level: number;
//   subGraph: RelaNodeType[];
//   constructor(name: string, x: number, y: number, level: number, rela: string) {
//     this.name = name;
//     this.x = x;
//     this.y = y;
//     this.level = level;
//     this.subGraph = getSubGraph([], name, rela);
//   }
// }

class WindowManager {
  containerId: string;
  svg: any;
  simulation: any;
  node: any;
  link: any;

  constructor(containerId: string, nodes: any[], links: any[]) {
    this.containerId = containerId;
    this.init(nodes, links);
  }

  init(nodes: any[], links: any[]) {
    const container = document.getElementById(this.containerId) as HTMLElement;
    const height = container?.offsetHeight;
    const width = container?.offsetWidth;
    this.svg = d3
      .select(`#${this.containerId}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .attr('style', 'max-width: 100%; height: auto;');

    this.simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(links).id((d: any) => d.id),
      )
      .force('charge', d3.forceManyBody())
      .force('x', d3.forceX())
      .force('y', d3.forceY());
    // Add a line for each link, and a circle for each node.
    this.link = this.svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d: any) => Math.sqrt(d.value));

    this.node = this.svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', () => 'black');

    this.node.append('title').text((d: any) => d.id);

    // Add a drag behavior.
    this.node.call(
      d3
        .drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended),
    );
  }

  render() {
    // Set the position attributes of links and nodes each time the simulation ticks.
    this.simulation.on('tick', () => {
      this.link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      this.node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
    });
  }

  addNode() {}

  addLink() {}

  // Reheat the simulation when drag starts, and fix the subject position.
  dragstarted(event: any) {
    if (!event.active) this.simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  // Update the subject (dragged node) position during drag.
  dragged(event: any) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  // Restore the target alpha so the simulation cools after dragging ends.
  // Unfix the subject position now that it’s no longer being dragged.
  dragended(event: any) {
    if (!event.active) this.simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
}

export default WindowManager;
