import React, { useState, useEffect, useReducer}  from 'react';
import {useSelector, useDispatch} from 'react-redux';
import clone from 'clone';

import allActions from './actions'

import AnnGraph from './components/AnnGraph.js';
import DagreD3 from './components/DagreD3.js';
import D3Tree from './components/D3-Tree.js';
import Annotator from './components/Annotator.js';
import Canvas from './components/Canvas.js';
import logo from './logo.svg';
import './App.css';

import collData from './assets/collection.json'
import docData from './assets/collection.json'
import documentData from './assets/document2.json'


const document = documentData.text

// const document = "You now know about linear regression with multiple variables. In this video, I wanna tell you a bit about the choice of features that you have and how you can get different learning algorithm, sometimes very powerful ones by choosing appropriate features. And in particular I also want to tell you about polynomial regression allows you to use the machinery of linear regression to fit very complicated, even very non-linear functions. Let's take the example of predicting the price of the house. Suppose you have two features, the frontage of house and the depth of the house. So, here's the picture of the house we're trying to sell. So, the frontage is defined as this distance is basically the width or the length of how wide your lot is if this that you own, and the depth of the house is how deep your property is, so there's a frontage, there's a depth. called frontage and depth. You might build a linear regression model like this where frontage is your first feature x1 and and depth is your second feature x2, but when you're applying linear regression, you don't necessarily have to use just the features x1 and x2 that you're given. What you can do is actually create new features by yourself. So, if I want to predict the price of a house, what I might do instead is decide that what really determines the size of the house is the area or the land area that I own. "

function App() {
    const [selected, setSelected] = useState("");
    const [highlightIndex, setHighlightIndex] = useState(0);
		const [src, setSrc] = useState(0);
		const [dest, setDest] =  useState(0);
		
		var parsed = document.split(' ').reduce((acc, e, i) => {
				// console.log(acc, e, i);
				acc.push({text : e, id: i, label: null});
				return acc;
		}, []);

    const tree = useSelector(state => state.tree);
		const tokenDict = useSelector(state => state.tokenDict);
		const coreferenceDict = useSelector(state => state.coreferenceDict);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(allActions.relationActions.add_link("from", "to"));
    // }, [])

		useEffect(() => {
			// console.log("create tokenDict");
			dispatch(allActions.tokenActions.create_tokenDict(document));
		}, [])

    useEffect(() => {
        dispatch(allActions.nodeActions.add_node("test"));
    }, [])

		const whichSpan = (token) => {
			if (token.label == "coreference"){
				return  <mark> {token.text} </mark> 
			}
			else if (token.label == "hover"){
				return <mark style={{color: 'red'}}> {token.text} </mark> 
			}
			else { return <text> {token.text} </text> }
		}
		
		// parse into list of tokens
		const parseText = () => {
			
			// console.log("parseText ", tokenDict);
			return tokenDict.map((token, i) => (
			<div key={i}
				// draggable = "true"
				// onDragStart = {(event) => handleMouseDown(event)}
				// onDrop = {(event) => handleMouseUp(event)}
				onMouseUp={(event) => handleMouseUp(event)}
				onMouseDown={(event) => handleMouseDown(event)}
				onMouseMove={(event) => handleMouseMove(event)}
				onMouseLeave={(event) => handleMouseLeave(event)}
				id={i}>
					{whichSpan(token)}
			</div>
			))
		}
		const handleMouseLeave = (e) => {
			// console.log("handleMouseLeave ", e.target.parentElement, e.target.parentElement.id, e.target.innerHTML);
			// which one the mouse is hovering?
			const hoverTarget = e.target.parentElement.id;
			const tokenId = parseInt(hoverTarget);
			// console.log(tokenDict[tokenId].label == "coreference");
			if (tokenId && tokenDict[tokenId].label == "hover"){ //hovering entity
				coreferenceDict.forEach((cor,i) => {
					// console.log(cor, i, tokenId);
					const corId = cor.findIndex(x => x == tokenId);
					if ( corId > -1){
						dispatch(allActions.tokenActions.update_tokenDict(cor, "coreference"));
					}
				})
			}
		}

		const handleMouseMove = (e) => {
			// console.log("handleMouseMove ", e.target.parentElement, e.target.parentElement.id, e.target.innerHTML);
			// which one the mouse is hovering?
			const hoverTarget = e.target.parentElement.id;
			const tokenId = parseInt(hoverTarget);
			// console.log(tokenDict[tokenId].label == "coreference");
			if (tokenId && tokenDict[tokenId].label == "coreference"){ //hovering entity
				coreferenceDict.forEach((cor,i) => {
					// console.log(cor, i, tokenId);
					const corId = cor.findIndex(x => x == tokenId);
					if ( corId > -1){
						dispatch(allActions.tokenActions.update_tokenDict(cor, "hover"));
					}
				})
			}
		}

    const handleMouseUp = (e) => {
			console.log("handleMouseUp ", e.target.parentElement, e.target.parentElement.id, e.target.innerHTML);
			const tokenId = parseInt(e.target.parentElement.id);
			const range = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min);
			var tokenArray = [];
			if (src < tokenId){
				tokenArray = range(src, tokenId);
			}
			else {
				tokenArray = range(tokenId, src);
			}
			console.log(tokenArray);
			if (tokenDict[tokenId].label == null){
				//add label
				dispatch(allActions.tokenActions.update_tokenDict(tokenArray, "coreference"));
				// dispatch(allActions.tokenActions.update_coreferenceDict(, tokenArray));
			}
			else if (tokenDict[tokenId].label == "hover") {
				//delete label
				dispatch(allActions.tokenActions.update_tokenDict(tokenArray, null));
				dispatch(allActions.coreferenceActions.delete_coreferenceDict(tokenArray, null));
				// dispatch(allActions.tokenActions.update_coreferenceDict(, []));
			}
			else if (tokenDict[tokenId].label == "coreference") {
				//delete label
				dispatch(allActions.tokenActions.update_tokenDict(tokenArray, null));
				dispatch(allActions.coreferenceActions.delete_coreferenceDict(tokenArray, null));
				// dispatch(allActions.tokenActions.update_coreferenceDict(, []));
			}
			
			setSelected(e.target.innerHTML)
    }

		const handleMouseDown = (e) => {
			console.log("handleMouseDown ", e.target.parentElement, parseInt(e.target.parentElement.id), e.target.innerHTML);
			setSrc(parseInt(e.target.parentElement.id));
		}


    // console.log(Object.entries(jsonData));
    return (
        <div >
        <div>
            selected text: {selected}
        </div>
				<div className="textbox">
					<pre className="textbox">
					{parseText()}
					</pre>
				</div>
        {/* <AnnGraph /> */}
        {/* <button onClick={()=> dispatch(allActions.relationActions.add_link(selected, "test"))}>src</button> */}
        {/* <DagreD3 graph={tree} /> */}
        {/* <Annotator document={document}/> */}
        <D3Tree data={tree} />
				<Canvas height={10000} width={10000}/>
        </div>
    );
}

export default App;