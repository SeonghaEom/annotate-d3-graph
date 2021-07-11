import React, { useState, useEffect, useReducer}  from 'react';
import {useSelector, useDispatch} from 'react-redux';

import allActions from './actions'

import AnnGraph from './components/AnnGraph.js';
import DagreD3 from './components/DagreD3.js';
import D3Tree from './components/D3-Tree.js';
import logo from './logo.svg';
import './App.css';

import collData from './assets/collection.json'
import docData from './assets/collection.json'


function App() {
    const [src, setSrc] = useState("source");
    const [dest, setDest] = useState("dest");

    const tree = useSelector(state => state.tree);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(allActions.relationActions.add_link("from", "to"));
    // }, [])

    useEffect(() => {
        dispatch(allActions.nodeActions.add_node("test"));
    }, [])
    
    const onAddRelation = (from, to) => {
        console.log(("onAddRelation called "));
        dispatch(allActions.relationActions.add_relation(from, to));
    };

    // console.log(Object.entries(jsonData));
    return (
        <div >
        <div id="test" style={{margin: '20px', border: '2px solid grey', background: '#eeeeee'}} >
        </div>
        {/* <AnnGraph /> */}
        <button onClick={()=> dispatch(allActions.relationActions.add_link("child", "test"))}>src</button>
        {/* <DagreD3 graph={tree} /> */}
        <D3Tree data={tree} />

        </div>
    );
}

export default App;