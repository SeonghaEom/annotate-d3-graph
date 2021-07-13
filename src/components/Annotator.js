import React, { useState, useEffect}  from 'react';
import NLPAnnotator from "react-nlp-annotate";
import allActions from '../actions'
import {useSelector, useDispatch} from 'react-redux';

const labels = [
  {
    id: "gryffindor",
    displayName: "Gryffindor",
    description: "Daring, strong nerve and chivalry."
  },
  {
    id: "slytherin",
    displayName: "Slytherin",
    description: "Cunning and ambitious. Possibly dark wizard."
  }
];

const Annotator = ({document: document}) => {
  console.log(document);
  const [output, setOutput] = useState({});
  const [relationCnt, setRelationCnt] = useState(0);

  const dispatch = useDispatch();
  
  //retrieve spanned text by id in sequence array
  const findTextById = (id, sequence) => {
    for (var i=0; i < sequence.length-1; i++){
      if (sequence[i].textId == id){
        console.log(sequence[i].text);
        return sequence[i].text;
      }
    }
  }

  const onAddRelation = (output) => {
    console.log(("onAddRelation called "));
    console.log(output.relationships);
    const newRel = output.relationships[output.relationships.length -1];
    console.log(newRel);
    const from = findTextById(newRel.from, output.sequence);
    const to = findTextById(newRel.to, output.sequence);
    console.log(from, to);
    // dispatch(allActions.nodeActions.add_node(from));
    // dispatch(allActions.nodeActions.add_node(to));
    dispatch(allActions.relationActions.add_link(to, from));
  };

  const onRemoveRelation = (output) => {
    console.log(("onRemoveRelation called "));
  }

  return (
    <NLPAnnotator
      hotkeysEnabled
      type="label-relationships"
      labels={labels}
      multipleLabels={false}
      document={document}
      onChange={(output) => {
        console.log("Output is...", output);
        setOutput(output);
        if (relationCnt < output.relationships.length){
          setRelationCnt(relationCnt + 1);
          onAddRelation(output);
        }
        else if (relationCnt > output.relationships.length){
          setRelationCnt(relationCnt - 1);
          onRemoveRelation(output);
        }
      }}
      // this is just for label-relationships
      entityLabels={labels}
      relationshipLabels={labels}
    />
  )
}

export default Annotator;