// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
import orgChartJson from '../assets/org-chart.json';
import clone from 'clone';


const addChildNode = (state, text) => {
  // console.log("state ", state)
  const data = clone(state);
  const children = data.children
  // this.addedNodesCount++;
  children.push({
    name: text,
    // id: text,
    children: [],
    
  });
  // console.log("data ", data)
  return data;
};

function findNested(obj, key, value) {
  // Base case
  if (obj.name === value) {
    return obj;
  } else {
    const len = obj.children ? obj.children.length : 0
    for (var i = 0; i < len; i++) {
      // console.log(obj.children[i], value);
      {
        var found = findNested(obj.children[i], key, value);
        if (found) {
          // If the object was found in the recursive call, bubble it up.
          return found;
        }
      }
    }
  }
}

const addChildNodeFromParent = (state, text, parent) => {
  // console.log("state ", state)
  const data = clone(state);
  const target = findNested(data, "name", parent);
  // console.log("target", target);
  target.children.push({
    name: text,
    children: [],
  })
  // console.log("data ", data)
  return data;
};


const tree = (state = orgChartJson, action) => {
  switch (action.type) {
    case 'ADD_NODE':
      return addChildNode(state, action.payload.text);
    case 'ADD_LINK':
      return addChildNodeFromParent(state, action.payload.text, action.payload.parent);
    default:
      return state;
  }
}

export default tree

