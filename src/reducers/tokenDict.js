import clone from "clone";

const sample = [{
  text: "linear regression",
  id: 0,
  label: "coreference"
},{
  text: "we",
  id: 1,
  label: "open relation"
}
];

const tokenDict = (state = sample, action) => {
  switch (action.type) {
    case 'CREATE_TOKENDICT':
      console.log(action.type)
      const parsed = action.payload.document.split(' ').reduce((acc, e, i) => {
          // console.log(acc, e, i);
          acc.push({text : e, id: i, label: null});
          return acc;
      }, []);
      return parsed;
    case 'UPDATE_TOKENDICT':
      console.log(action.type, action.payload)
      var cloned = clone(state);
      action.payload.tokenId.forEach((id) => {
        cloned[id].label = action.payload.label;
      })
      return cloned;
    default:
      return state;
  }
}

export default tokenDict