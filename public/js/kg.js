initKG = function (data, config, container) {
  //data:nodes 至少需要一个name
  const nodeDict = data.nodes;

  const links = data.links;

  const nodes = {};

  //   console.log('nodeDict',nodeDict)
  //   links.forEach(item=>{
  //     console.log(item.source)
  //   })
  //   console.log('links',links)

  links.forEach(function (link) {
    //利用source和target名称进行连线以及节点的确认
    link.source = nodeDict[link.source];
    nodes[link.source.name] = link.source;
    link.target = nodeDict[link.target];
    nodes[link.target.name] = link.target;
  });

  //默认的节点配色方案
  if (!config.nodeColor || config.nodeColor === '')
    var defaultNodeColor = [
      //粉红
      {
        fill: 'rgb(249, 235, 249)',
        stroke: 'rgb(162, 84, 162)',
        text: 'rgb(162, 84, 162)',
      },
      //灰色
      { fill: '#ccc', stroke: 'rgb(145, 138, 138)', text: '#333' },
      {
        fill: 'rgb(112, 202, 225)',
        stroke: '#23b3d7',
        text: 'rgb(93, 76, 93)',
      },
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
    ];
  else var defaultNodeColor = config.nodeColor;

  //默认的关系配色方案
  if (!config.linkColor || config.linkColor === '')
    var defaultLinkColor = [
      { color: 'rgb(162, 84, 162)' },
      { color: 'rgb(145, 138, 138)' },
      { color: '#23b3d7' },
      { color: '#c0a378' },
      { color: 'rgb(98, 182, 105)' },
      { color: 'rgb(233, 115, 116)' },
    ];
  else var defaultLinkColor = config.linkColor;

  //为node分配方案
  var colorDict = new Array();
  //配色循环指针
  var point = 0;
  Object.keys(data.nodes).forEach(function (key) {
    var type =
      data.nodes[key].type == null
        ? (data.nodes[key].type = 'default')
        : data.nodes[key].type;
    if (colorDict[type] == null) {
      colorDict[type] = defaultNodeColor[point];
      point = (point + 1) % defaultNodeColor.length;
    }
  });

  //为link分配配色方案
  var colorLinkDict = new Array();
  //配色循环指针
  var point = 0;
  Object.keys(data.links).forEach(function (key) {
    var type =
      data.links[key].type == null
        ? (data.links[key].type = 'default')
        : data.links[key].type;
    if (colorLinkDict[type] == null) {
      colorLinkDict[type] = defaultLinkColor[point];
      point = (point + 1) % defaultLinkColor.length;
    }
  });

  var width = config.width ? config.width : 1560,
    height = config.height ? config.height : 800;

  //json格式转化
  var force = d3.layout
    .force()
    //设定节点数组
    .nodes(d3.values(nodes))
    //设定关系数组
    .links(links)
    //canvas大小
    .size([width, height])
    //连接线长度
    .linkDistance(200)
    //作用力，大于0吸引小于0排斥
    .charge(-1200)
    //指时间间隔，隔一段时间刷新一次画面
    .on('tick', tick)
    //开始转换
    .start();

  //缩放配置
  var zoom = d3.behavior
    .zoom()
    .scaleExtent([0, 2])
    //缩放callback
    .on('zoom', zoomed);

  //缩放回调函数
  function zoomed() {
    //svg下的g标签移动大小
    svg
      .selectAll('g')
      .attr(
        'transform',
        'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')',
      );
  }

  //添加svg元素进行图形的绘制
  var svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .call(zoom);
  //箭头
  var marker =
    //添加一个marker标签来绘制箭头
    svg
      .append('marker')
      .attr('id', 'resolved') //箭头id，用于其他标记进行引用时的url
      .attr('markerUnits', 'userSpaceOnUse') //定义标记的坐标系统，userSpaceOnUse表示按照引用的元件来决定，strokeWidth按照用户单位决定
      .attr('viewBox', '0 -5 10 10') //坐标系的区域
      .attr('refX', 30) //箭头坐标
      .attr('refY', 0)
      .attr('markerWidth', 12) //标识的大小
      .attr('markerHeight', 12)
      .attr('orient', 'auto') //绘制方向，可设定为：auto（自动确认方向）和 角度值
      .attr('stroke-width', 3) //箭头宽度
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5') //绘制箭头，路径为一个三角形，有疑问参考svg的path http://www.runoob.com/svg/svg-path.html
      .attr('fill', '#000000'); //箭头颜色

  //设置连接线
  var edges_line = svg
    .append('g')
    .selectAll('.edgepath')
    .data(force.links()) //连线数据
    .enter() //当数组中的个数大于元素个数时，由d3创建空元素并与数组中超出的部分进行绑定。
    //可以参考http://www.ourd3js.com/wordpress/797/ enter、exit、update的区别
    .append('path') //添加path标签
    .attr({
      d: function (d) {
        return (
          'M ' +
          d.source.x +
          ' ' +
          d.source.y +
          ' L ' +
          d.target.x +
          ' ' +
          d.target.y
        );
      }, //变量 d 是由D3.js提供的一个在匿名函数中的可用变量。这个变量是对当前要处理的元素的_data_属性的引用。
      class: 'edgepath', //定义该path标签class为edgepath
      id: function (d, i) {
        return 'edgepath' + i;
      },
    }) // i也是d3.js提供的变量，表示当前处理的HTML元素在已选元素选集中的索引值
    .style('stroke', function (link) {
      //config:边框色
      return colorLinkDict[link.type].color;
    }) //设置线条颜色
    .style('stroke-width', (d) => (d.type === 'update' ? 10 : 1)) //线条粗细
    .attr('marker-end', 'url(#resolved)'); //根据箭头标记的id号引用箭头

  //连线上的文字
  var edges_text = svg
    .append('g')
    .selectAll('.edgelabel')
    .data(force.links())
    .enter()
    .append('text') //添加text标签
    .attr({
      class: 'edgelabel', //定义该text标签class为edgelabel
      id: function (d, i) {
        return 'edgepath' + i;
      },
      dx: (d) => getLineTextDx(d), //在连线上的坐标
      dy: 0,
    });

  //设置线条上的文字路径
  edges_text
    .append('textPath')
    .attr('xlink:href', function (d, i) {
      return '#edgepath' + i;
    })
    .style('pointer-events', 'none')
    .text(function (d) {
      return d.rela;
    });

  function drag() {
    //拖拽函数
    return force.drag().on('dragstart', function (d) {
      d3.event.sourceEvent.stopPropagation(); //取消默认事件
      //d.fixed = true;    //拖拽开始后设定被拖拽对象为固定
    });
    //.on("drag", dragmove);
  }

  //圆圈的提示文字 根据需要到数据库中进行读取数据
  var tooltip = d3
    .select('body')
    .append('div') //添加div并设置成透明
    .attr('class', 'tooltip')
    .style('opacity', 0.0);

  //圆圈
  //当前选中的节点
  var lastFocusNode;
  var circle = svg
    .append('g')
    .selectAll('circle')
    .data(force.nodes()) //表示使用force.nodes数据
    .enter()
    .append('circle')
    //config:背景色
    .style('fill', function (node) {
      return colorDict[node.type].fill;
    })
    .style('stroke', function (node) {
      //config:边框色
      return colorDict[node.type].stroke;
    })
    .attr('r', (d) => {
      if (d.type === '已退市公司') {
        return 20;
      }
      if (d.name === '中国石油 (601857)' || d.name === '中国石化 (600028)') {
        return 40;
      }
      return 30;
    })
    .on('click', function (node) {
      //单击时让连接线加粗
      //再次点击还原
      edges_line.style('stroke-width', function (line) {
        //当与连接点连接时变粗
        if (line.type === 'update') {
          return 10;
        }
        if (line.source.name == node.name || line.target.name == node.name) {
          if (line.focus && node.focus) {
            line.focus = false;
            return 1;
          } else {
            line.focus = true;
            return 2.5;
          }
        } else {
          return 1;
        }
      });
      circle.style('stroke-width', 1); //所有的圆圈边框
      //焦点取反
      node.focus = !node.focus;
      //判断是不是点击的同一个node
      if (lastFocusNode != node && lastFocusNode != null) {
        lastFocusNode.focus = false;
      }
      //进行判断
      if (node.focus) {
        //被选中的圆圈边框
        d3.select(this).style('stroke-width', 2.5);
      } else {
        d3.select(this).style('stroke-width', 1);
      }
      lastFocusNode = node;
    })
    .on('dblclick', function (d) {
      //双击节点时节点恢复拖拽
      d.fixed = false;
    })
    .on('mouseover', function (d) {
      //config：替换成需要回显的html
      var content;
      if (config.contentHook) {
        content = config.contentHook(d);
      } else {
        content = config.content;
      }
      tooltip
        .html(content)
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY + 20 + 'px')
        .style('opacity', 1.0);
    })
    .on('mousemove', function (d) {
      tooltip
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY + 20 + 'px');
    })
    .on('mouseout', function (d) {
      tooltip.style('opacity', 0.0);
    })
    .call(drag()); //使顶点可以被拖动

  svg.selectAll('g').call(drag()); //为svg下的所有g标签添加拖拽事件
  //svg.selectAll("circle").call(drag());
  //svg.selectAll("path").call(drag());
  svg.on('dblclick.zoom', function () {}); //取消svg和圆圈的双击放大事件（d3中默认开启7个事件，关闭防止与上面的双击事件冲突）
  circle.on('dblclick.zoom', null);

  var text = svg
    .append('g')
    .selectAll('text')
    .data(force.nodes())
    //返回缺失元素的占位对象（placeholder），指向绑定的数据中比选定元素集多出的一部分元素。
    .enter()
    .append('text') //添加text标签
    .attr('dy', '.35em') //将文字下移
    .attr('text-anchor', 'middle') //在圆圈中加上数据
    .style('fill', function (node) {
      return colorDict[node.type].text;
    })
    .attr('x', function (d) {
      var re_en = /[a-zA-Z]+/g;
      //如果是全英文，不换行
      if (d.name.match(re_en)) {
        d3.select(this)
          .append('tspan') //添加tspan用来方便时使用绝对或相对坐标来调整文本
          .attr('x', 0)
          .attr('y', 2)
          .text(function () {
            return d.name;
          });
      }
      if (d.name.split(' ').length > 1) {
        var top = d.name.split(' ')[0];
        var bot = d.name.split(' ')[1];

        d3.select(this).text(function () {
          return '';
        });

        d3.select(this)
          .append('tspan')
          .attr('x', 0)
          .attr('y', -7)
          .text(function () {
            return top;
          });

        d3.select(this)
          .append('tspan')
          .attr('x', 0)
          .attr('y', 10)
          .text(function () {
            return bot;
          });
      }
      //如果小于8个字符，不换行
      else if (d.name.length <= 8) {
        d3.select(this)
          .append('tspan')
          .attr('x', 0)
          .attr('y', 2)
          .text(function () {
            return d.name;
          });
      } else if (d.name.length >= 16) {
        //大于16个字符时，将14个字后的内容显示为。。。
        var top = d.name.substring(0, 8);
        var bot = d.name.substring(8, 14) + '...';

        d3.select(this).text(function () {
          return '';
        });

        d3.select(this)
          .append('tspan') //前n个字
          .attr('x', 0)
          .attr('y', -7)
          .text(function () {
            return top;
          });

        d3.select(this)
          .append('tspan') //后n个字
          .attr('x', 0)
          .attr('y', 10)
          .text(function () {
            return bot;
          });
      } else {
        //8-16字符分两行显示
        // var top = d.name.substring(0, 8);
        // var bot = d.name.substring(8, d.name.length);

        // d3.select(this).text(function () { return ''; });

        // d3.select(this).append('tspan')
        //     .attr('x', 0)
        //     .attr('y', -7)
        //     .text(function () { return top; });

        // d3.select(this).append('tspan')
        //     .attr('x', 0)
        //     .attr('y', 10)
        //     .text(function () { return bot; });
        d3.select(this)
          .append('tspan')
          .attr('x', 0)
          .attr('y', 2)
          .text(function () {
            return d.name;
          });
      }
    });

  function tick() {
    //刷新页面函数

    circle.attr('transform', transform1); //圆圈
    text.attr('transform', transform1); //顶点文字
    edges_line.attr('d', function (d) {
      //连接线
      var path =
        'M ' +
        d.source.x +
        ' ' +
        d.source.y +
        ' L ' +
        d.target.x +
        ' ' +
        d.target.y;
      return path;
    });

    edges_text
      .attr('transform', function (d, i) {
        //连线上的文字
        if (d.target.x < d.source.x) {
          //判断起点和终点的位置，来让文字一直显示在线的上方且一直是正对用户
          let bbox = this.getBBox(); //获取矩形空间,并且调整翻转中心。（因为svg与css中的翻转不同，具体区别可看http://www.zhangxinxu.com/wordpress/2015/10/understand-svg-transform/）
          let rx = bbox.x + bbox.width / 2;
          let ry = bbox.y + bbox.height / 2;
          return 'rotate(180 ' + rx + ' ' + ry + ')';
        } else {
          return 'rotate(0)';
        }
      })
      .attr('dx', function (d, i) {
        return (
          Math.sqrt(
            Math.pow(d.target.x - d.source.x, 2) +
              Math.pow(d.target.y - d.source.y, 2),
          ) /
            2 -
          20
        );
        //设置文字一直显示在线的中间
      });
  }
  //设置圆圈和文字的坐标
  function transform1(d) {
    return 'translate(' + d.x + ',' + d.y + ')';
  }

  function getLineTextDx(d) {
    const sx = d.source.x;
    const sy = d.source.y;
    const tx = d.target.x;
    const ty = d.target.y;
    const distance = Math.sqrt(Math.pow(tx - sx, 2) + Math.pow(ty - sy, 2));

    const textLength = d.rela.length;
    const lineTextFontSize = 8;
    const textWidth = 80;
    const radius = 30;

    const dx = (distance - 2 * radius - textWidth) / 2 - 32;

    return dx;
  }
};

initKG2 = function (data, config, container) {
  var width = config.width ? config.width : 1560,
    height = config.height ? config.height : 800;
  //默认的节点配色方案
  if (!config.nodeColor || config.nodeColor === '')
    var defaultNodeColor = [
      //粉红
      {
        fill: 'rgb(249, 235, 249)',
        stroke: 'rgb(162, 84, 162)',
        text: 'rgb(162, 84, 162)',
      },
      //灰色
      { fill: '#ccc', stroke: 'rgb(145, 138, 138)', text: '#333' },
      {
        fill: 'rgb(112, 202, 225)',
        stroke: '#23b3d7',
        text: 'rgb(93, 76, 93)',
      },
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
    ];
  else var defaultNodeColor = config.nodeColor;

  //默认的关系配色方案
  if (!config.linkColor || config.linkColor === '')
    var defaultLinkColor = [
      { color: 'rgb(162, 84, 162)' },
      { color: 'rgb(145, 138, 138)' },
      { color: '#23b3d7' },
      { color: '#c0a378' },
      { color: 'rgb(98, 182, 105)' },
      { color: 'rgb(233, 115, 116)' },
    ];
  else var defaultLinkColor = config.linkColor;

  //为node分配方案
  var colorDict = new Array();
  //配色循环指针
  var point = 0;
  Object.keys(data.nodes).forEach(function (key) {
    var type =
      data.nodes[key].type == null
        ? (data.nodes[key].type = 'default')
        : data.nodes[key].type;
    if (colorDict[type] == null) {
      colorDict[type] = defaultNodeColor[point];
      point = (point + 1) % defaultNodeColor.length;
    }
  });

  //为link分配配色方案
  var colorLinkDict = new Array();
  //配色循环指针
  var point = 0;
  Object.keys(data.links).forEach(function (key) {
    var type =
      data.links[key].type == null
        ? (data.links[key].type = 'default')
        : data.links[key].type;
    if (colorLinkDict[type] == null) {
      colorLinkDict[type] = defaultLinkColor[point];
      point = (point + 1) % defaultLinkColor.length;
    }
  });
  const links = data.links;
  var linkGroup = {};
  //对连接线进行统计和分组，不区分连接线的方向，只要属于同两个实体，即认为是同一组
  var linkmap = {};
  for (var i = 0; i < links.length; i++) {
    var key =
      links[i].source < links[i].target
        ? links[i].source + ':' + links[i].target
        : links[i].target + ':' + links[i].source;
    if (!linkmap.hasOwnProperty(key)) {
      linkmap[key] = 0;
    }
    linkmap[key] += 1;
    if (!linkGroup.hasOwnProperty(key)) {
      linkGroup[key] = [];
    }
    linkGroup[key].push(links[i]);
  }
  //为每一条连接线分配size属性，同时对每一组连接线进行编号
  for (var i = 0; i < links.length; i++) {
    var key =
      links[i].source < links[i].target
        ? links[i].source + ':' + links[i].target
        : links[i].target + ':' + links[i].source;
    links[i].size = linkmap[key];
    //同一组的关系进行编号
    var group = linkGroup[key];
    var keyPair = key.split(':');
    var type = 'noself'; //标示该组关系是指向两个不同实体还是同一个实体
    if (keyPair[0] == keyPair[1]) {
      type = 'self';
    }
    //给节点分配编号
    setLinkNumber(group, type);
  }
  const nodeDict = data.nodes;
  var nodes = {};

  links.forEach(function (link) {
    //利用source和target名称进行连线以及节点的确认
    link.source = nodeDict[link.source];
    nodes[link.source.name] = link.source;
    link.target = nodeDict[link.target];
    nodes[link.target.name] = link.target;
  });

  var force = d3.layout
    .force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(200)
    .charge(-1200)
    .on('tick', tick)
    .start();

  //添加svg元素进行图形的绘制
  var svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  var path = svg
    .append('svg:g')
    .selectAll('path')
    .data(force.links())
    .enter()
    .append('svg:path')
    .attr('class', function (d) {
      return 'link ' + d.type;
    })
    .attr('id', function (d, i) {
      return 'edgepath' + i;
    })
    .style('stroke', function (link) {
      //config:边框色
      return colorLinkDict[link.type].color;
    }) //设置线条颜色
    .style('stroke-width', (d) => (d.type === 'update' ? 10 : 1)) //线条粗细
    .attr('marker-end', 'url(#resolved)'); //根据箭头标记的id号引用箭头

  var edges_text = svg
    .append('g')
    .selectAll('.edgelabel')
    .data(force.links())
    .enter()
    .append('text') //添加text标签
    .attr({
      class: 'edgelabel', //定义该text标签class为edgelabel
      id: function (d, i) {
        return 'edgepath' + i;
      },
      dx: (d) => 60, //在连线上的坐标
      dy: 0,
    });

  //设置线条上的文字路径
  edges_text
    .append('textPath')
    .attr('xlink:href', function (d, i) {
      return '#edgepath' + i;
    })
    .style('pointer-events', 'none')
    .text(function (d) {
      return d.rela;
    });

  function getLineTextDx(d) {
    const sx = d.source.x;
    const sy = d.source.y;
    const tx = d.target.x;
    const ty = d.target.y;
    const distance = Math.sqrt(Math.pow(tx - sx, 2) + Math.pow(ty - sy, 2));

    const textLength = d.rela.length;
    const lineTextFontSize = 8;
    const textWidth = 80;
    const radius = 30;

    const dx = (distance - 2 * radius - textWidth) / 2 - 32;

    return dx;
  }

  var circle = svg
    .append('svg:g')
    .selectAll('circle')
    .data(force.nodes())
    .enter()
    .append('svg:circle')
    //config:背景色
    .style('fill', function (node) {
      return colorDict[node.type].fill;
    })
    .style('stroke', function (node) {
      //config:边框色
      return colorDict[node.type].stroke;
    })
    .attr('r', (d) => {
      if (d.type === '已退市公司') {
        return 20;
      }
      if (d.type === 'curr') {
        return 50;
      }
      if (d.type === '公司1') {
        return 45;
      }
      if (d.type === '公司2') {
        return 35;
      }
      if (d.type === '公司3') {
        return 25;
      }
      if (d.type === '公司4' ||d.type==='empty_node') {
        return 15;
      }
      if (d.name === '中国石油 (601857)' || d.name === '中国石化 (600028)') {
        return 40;
      }
      return 30;
    })
    .call(force.drag);

  var text = svg
    .append('g')
    .selectAll('text')
    .data(force.nodes())
    //返回缺失元素的占位对象（placeholder），指向绑定的数据中比选定元素集多出的一部分元素。
    .enter()
    .append('text') //添加text标签
    .attr('dy', '.35em') //将文字下移
    .attr('text-anchor', 'middle') //在圆圈中加上数据
    .style('fill', function (node) {
      return colorDict[node.type].text;
    })
    .attr('x', function (d) {
      var re_en = /[a-zA-Z]+/g;
      //如果是全英文，不换行
      if (d.name.match(re_en)) {
        d3.select(this)
          .append('tspan') //添加tspan用来方便时使用绝对或相对坐标来调整文本
          .attr('x', 0)
          .attr('y', 2)
          .text(function () {
            return d.name;
          });
      }
      if (d.name.split(' ').length > 1) {
        var top = d.name.split(' ')[0];
        var bot = d.name.split(' ')[1];

        d3.select(this).text(function () {
          return '';
        });

        d3.select(this)
          .append('tspan')
          .attr('x', 0)
          .attr('y', -7)
          .text(function () {
            return top;
          });

        d3.select(this)
          .append('tspan')
          .attr('x', 0)
          .attr('y', 10)
          .text(function () {
            return bot;
          });
      }
      //如果小于8个字符，不换行
      else if (d.name.length <= 8) {
        d3.select(this)
          .append('tspan')
          .attr('x', 0)
          .attr('y', 2)
          .text(function () {
            return d.name;
          });
      } else if (d.name.length >= 16) {
        //大于16个字符时，将14个字后的内容显示为。。。
        var top = d.name.substring(0, 8);
        var bot = d.name.substring(8, 14) + '...';

        d3.select(this).text(function () {
          return '';
        });

        d3.select(this)
          .append('tspan') //前n个字
          .attr('x', 0)
          .attr('y', -7)
          .text(function () {
            return top;
          });

        d3.select(this)
          .append('tspan') //后n个字
          .attr('x', 0)
          .attr('y', 10)
          .text(function () {
            return bot;
          });
      } else {
        d3.select(this)
          .append('tspan')
          .attr('x', 0)
          .attr('y', 2)
          .text(function () {
            return d.name;
          });
      }
    });

  // Use elliptical arc path segments to doubly-encode directionality.
  function tick() {
    path.attr('d', function (d) {
      //如果连接线连接的是同一个实体，则对path属性进行调整，绘制的圆弧属于长圆弧，同时对终点坐标进行微调，避免因坐标一致导致弧无法绘制
      if (d.target == d.source) {
        dr = 30 / d.linknum;
        return (
          'M' +
          d.source.x +
          ',' +
          d.source.y +
          'A' +
          dr +
          ',' +
          dr +
          ' 0 1,1 ' +
          d.target.x +
          ',' +
          (d.target.y + 1)
        );
      } else if (d.size % 2 != 0 && d.linknum == 1) {
        //如果两个节点之间的连接线数量为奇数条，则设置编号为1的连接线为直线，其他连接线会均分在两边
        return (
          'M ' +
          d.source.x +
          ' ' +
          d.source.y +
          ' L ' +
          d.target.x +
          ' ' +
          d.target.y
        );
      }
      //根据连接线编号值来动态确定该条椭圆弧线的长半轴和短半轴，当两者一致时绘制的是圆弧
      //注意A属性后面的参数，前两个为长半轴和短半轴，第三个默认为0，第四个表示弧度大于180度则为1，小于则为0，这在绘制连接到相同节点的连接线时用到；第五个参数，0表示正角，1表示负角，即用来控制弧形凹凸的方向。本文正是结合编号的正负情况来控制该条连接线的凹凸方向，从而达到连接线对称的效果
      var curve = 1.5;
      var homogeneous = 1.2;
      var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr =
          (Math.sqrt(dx * dx + dy * dy) * (d.linknum + homogeneous)) /
          (curve * homogeneous);
      //当节点编号为负数时，对弧形进行反向凹凸，达到对称效果
      if (d.linknum < 0) {
        dr =
          (Math.sqrt(dx * dx + dy * dy) * (-1 * d.linknum + homogeneous)) /
          (curve * homogeneous);
        return (
          'M' +
          d.source.x +
          ',' +
          d.source.y +
          'A' +
          dr +
          ',' +
          dr +
          ' 0 0,0 ' +
          d.target.x +
          ',' +
          d.target.y
        );
      }
      return (
        'M' +
        d.source.x +
        ',' +
        d.source.y +
        'A' +
        dr +
        ',' +
        dr +
        ' 0 0,1 ' +
        d.target.x +
        ',' +
        d.target.y
      );
    });

    edges_text
    .attr('transform', function (d, i) {
      //连线上的文字
      if (d.target.x < d.source.x) {
        //判断起点和终点的位置，来让文字一直显示在线的上方且一直是正对用户
        let bbox = this.getBBox(); //获取矩形空间,并且调整翻转中心。（因为svg与css中的翻转不同，具体区别可看http://www.zhangxinxu.com/wordpress/2015/10/understand-svg-transform/）
        let rx = bbox.x + bbox.width / 2;
        let ry = bbox.y + bbox.height / 2;
        return 'rotate(180 ' + rx + ' ' + ry + ')';
      } else {
        return 'rotate(0)';
      }
    })
    .attr('dx', function (d, i) {
      return (
        Math.sqrt(
          Math.pow(d.target.x - d.source.x, 2) +
            Math.pow(d.target.y - d.source.y, 2),
        ) /
          2 -
        20
      );
      //设置文字一直显示在线的中间
    });

    circle.attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });

    text.attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });
  }

  function setLinkNumber(group, type) {
    if (group.length == 0) return;
    //对该分组内的关系按照方向进行分类，此处根据连接的实体ASCII值大小分成两部分
    var linksA = [],
      linksB = [];
    for (var i = 0; i < group.length; i++) {
      var link = group[i];
      if (link.source < link.target) {
        linksA.push(link);
      } else {
        linksB.push(link);
      }
    }
    //确定关系最大编号。为了使得连接两个实体的关系曲线呈现对称，根据关系数量奇偶性进行平分。
    //特殊情况：当关系都是连接到同一个实体时，不平分
    var maxLinkNumber = 0;
    if (type == 'self') {
      maxLinkNumber = group.length;
    } else {
      maxLinkNumber =
        group.length % 2 == 0 ? group.length / 2 : (group.length + 1) / 2;
    }
    //如果两个方向的关系数量一样多，直接分别设置编号即可
    if (linksA.length == linksB.length) {
      var startLinkNumber = 1;
      for (var i = 0; i < linksA.length; i++) {
        linksA[i].linknum = startLinkNumber++;
      }
      startLinkNumber = 1;
      for (var i = 0; i < linksB.length; i++) {
        linksB[i].linknum = startLinkNumber++;
      }
    } else {
      //当两个方向的关系数量不对等时，先对数量少的那组关系从最大编号值进行逆序编号，然后在对另一组数量多的关系从编号1一直编号到最大编号，再对剩余关系进行负编号
      //如果抛开负号，可以发现，最终所有关系的编号序列一定是对称的（对称是为了保证后续绘图时曲线的弯曲程度也是对称的）
      var biggerLinks, smallerLinks;
      if (linksA.length > linksB.length) {
        biggerLinks = linksA;
        smallerLinks = linksB;
      } else {
        biggerLinks = linksB;
        smallerLinks = linksA;
      }

      var startLinkNumber = maxLinkNumber;
      for (var i = 0; i < smallerLinks.length; i++) {
        smallerLinks[i].linknum = startLinkNumber--;
      }
      var tmpNumber = startLinkNumber;

      startLinkNumber = 1;
      var p = 0;
      while (startLinkNumber <= maxLinkNumber) {
        biggerLinks[p++].linknum = startLinkNumber++;
      }
      //开始负编号
      startLinkNumber = 0 - tmpNumber;
      for (var i = p; i < biggerLinks.length; i++) {
        biggerLinks[i].linknum = startLinkNumber++;
      }
    }
  }
};
