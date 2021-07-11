import React, { useState, useEffect}  from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ReactDOM from "react-dom";
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import Tree from 'react-d3-tree';


import "./styles.css";




const DagreD3 = (newgraph) => {
  console.log("DagreeD3 props", newgraph);
  const [graph, setGraph] = useState(newgraph);
  const edges = useSelector(state => state.relation);
  console.log(edges);

  useEffect(()=>{
    setGraph(newgraph);
  }, [newgraph]);

  useEffect(()=>{
    console.log(newgraph);
  }, [newgraph]);

  // var g = new dagreD3.graphlib.Graph({ compound: true })
  //   .setGraph({})
  //   .setDefaultEdgeLabel(function() {
  //     return {};
  //   });

  // const [g, setG] = useState(()=>{
  //   return new dagreD3.graphlib.Graph({ compound: true })
  //   .setGraph({})
  //   .setDefaultEdgeLabel(function() {
  //     return {};
  //   });
  // });
  // const [render, setRender] = useState(()=>{
  //   return new dagreD3.render();
  // });


  // componentDidMount() {
  // useEffect(() => {

  //   // Create the input graph
  //   var g = new dagreD3.graphlib.Graph({ compound: true })
  //     .setGraph({})
  //     .setDefaultEdgeLabel(function() {
  //       return {};
  //     });

  //   // Here we're setting the nodes
  //   g.setNode("a", { label: "A" });
  //   g.setNode("b", { label: "B" });
  //   g.setNode("c", { label: "C" });
  //   g.setNode("d", { label: "D" });
  //   g.setNode("e", { label: "E" });
  //   g.setNode("f", { label: "F" });
  //   g.setNode("g", { label: "G" });
  //   g.setNode("group", {
  //     label: "Group",
  //     clusterLabelPos: "top",
  //     style: "fill: #d3d7e8"
  //   });
  //   g.setNode("top_group", {
  //     label: "Top Group",
  //     clusterLabelPos: "bottom",
  //     style: "fill: #ffd47f"
  //   });
  //   g.setNode("bottom_group", {
  //     label: "Bottom Group",
  //     style: "fill: #5f9488"
  //   });


  //   // Set the parents to define which nodes belong to which cluster
  //   g.setParent("top_group", "group");
  //   g.setParent("bottom_group", "group");
  //   g.setParent("b", "top_group");
  //   g.setParent("c", "bottom_group");
  //   g.setParent("d", "bottom_group");
  //   g.setParent("e", "bottom_group");
  //   g.setParent("f", "bottom_group");

  //   // Set up edges, no special attributes.
  //   g.setEdge("a", "b");
  //   g.setEdge("b", "c");
  //   g.setEdge("b", "d");
  //   g.setEdge("b", "e");
  //   g.setEdge("b", "f");
  //   g.setEdge("b", "g");

  //   if (edges.length > 0){
  //     g.setNode(edges[-1][0]);
  //     g.setEdge(edges[-1][0], edges[-1][1]);
  //   }
    


    

  //   g.nodes().forEach(function(v) {
  //     var node = g.node(v);
  //     // Round the corners of the nodes
  //     node.rx = node.ry = 5;
  //   });

  //   // Create the renderer
  //   var render = new dagreD3.render();

  //   // Set up an SVG group so that we can translate the final graph.
  //   var svg = d3.select("svg"),
  //     svgGroup = svg.append("g");

  //   // Run the renderer. This is what draws the final graph.
  //   render(d3.select("svg g"), g);

  //   // Center the graph
  //   console.log(svg);
  //   console.log(svg.attr("width"));
  //   var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
  //   console.log(xCenterOffset);
  //   svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
  //   svg.attr("height", g.graph().height + 40);
  // },[newgraph,graph, edges])

    // return (
    //   <div style={{margin: '20px', border: '2px solid grey', background: '#eeeeee'}} >
    //     <h1>Hello CodeSandbox</h1>
    //     <h2>Start editing to see some magic happen!</h2>
    //     <svg id="svg-canvas" width="800" height="600" />
    //   </div>
    // );

  return (
    <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
      <Tree data={newgraph} />
    </div>
  )

}

export default DagreD3;

