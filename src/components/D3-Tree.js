import React, { useState, useEffect}  from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ReactDOM from "react-dom";
import * as d3 from "d3";
import Tree from 'react-d3-tree';


import "./styles.css";

const debugData = [
  {
    name: "1",
    children: [
      {
        name: "2"
      },
      {
        name: "2"
      }
    ]
  }
];

const D3Tree = (tree) => {
  console.log("D3Tree props", tree.data);

  useEffect(()=>{
    console.log(tree.data);
  }, [tree]);

  return (
    <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
      <Tree
        data={tree.data}
        orientation={'vertical'}/>
    </div>
  )

}

export default D3Tree;

