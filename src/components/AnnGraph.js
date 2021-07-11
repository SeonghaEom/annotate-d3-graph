import React, { Component } from 'react';
import { Graph } from "react-d3-graph";
import * as d3 from 'd3';
// import { Grid, Image, Input, Icon, Segment } from "semantic-ui-react"

// import relation from '../assets/rel_info.json'
// import testdata from '../assets/test.json'
// import traindata from '../assets/train_annotated.json'
// import result from '../assets/DocRED_result.json'
import subgraph from '../assets/subgraph.json'

export default class AnnGraph extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            nodes: [],
            links: [],
            data: {},
            currentNode: subgraph['nodes'][0]['id'],
        }
        this.parseSubgraph = this.parseSubgraph.bind(this);
        this.clickNode = this.clickNode.bind(this);
    }

  componentDidUpdate(prevProps, prevState) {
      const { nodes, links } = this.state
      if (prevState.nodes !== this.state.nodes || prevState.links !== this.state.links) {
          this.setState({nodes: nodes, links: links})
          console.log(this.state.data)
      }
      
  }

  componentDidMount() {
      //this.parseTrainData()
      // this.parseResult(10)
      this.parseSubgraph()
  }

  parseSubgraph() {
  console.log(subgraph)
  this.setState({nodes: subgraph['nodes'], links: subgraph['links']})
  }

  clickNode = function(nodeId) {
      //window.alert(`Clicked node ${nodeId}`);
      console.log(nodeId)
      this.setState({
          currentNode: nodeId
      })
  }

  render() {
    const { nodes, links, data, currentNode } = this.state;
    const { clickNode } = this;

    const myConfig = {
        automaticRearrangeAfterDropNode: false,
        nodeHighlightBehavior: true,
        //renderLabel: true,
        maxZoom: 8,
        minZoom: 0.01,
        width: 1400,
        height: 700,
        collapsible: false,
        staticGraphWithDragAndDrop: false,
        highlightDegree: 1,
        highlightOpacity: 1,
        directed: true,
        d3: {
            gravity: -1000,
            linkLength: 100000,
            // disableLinkForce: true,
        },
        node: {
            color: "lightblue",
            highlightColor: "#2a9df4",
            highlightFontSize: 14,
            size: 1200,
            highlightStrokeColor: "#2a9df4",
            fontSize: 24,
            labelPosition: "center",
            opacity: 0.8,
        },
        link: {
            highlightColor: "#2a9df4",
            renderLabel: true,
            color: "grey",
            fontSize: 24,
            opacity: 0.8,
            labelProperty: "label",
        },
    };

  return (
    <div style={{margin: '20px', border: '2px solid grey', background: '#eeeeee'}}>
      <Graph
        id="graph"
        data={{nodes: nodes, links: links}}
        config={myConfig}
        onClickNode={clickNode}
        
        /*
        onDoubleClickNode={onDoubleClickNode}
        onRightClickNode={onRightClickNode}
        onClickGraph={onClickGraph}
        onClickLink={onClickLink}
        onRightClickLink={onRightClickLink}
        onMouseOverNode={onMouseOverNode}
        onMouseOutNode={onMouseOutNode}
        onMouseOverLink={onMouseOverLink}
        onMouseOutLink={onMouseOutLink}
        onNodePositionChange={onNodePositionChange}
        */
      />
    </div>
  )
  }
}
