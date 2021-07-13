import clone from "clone";

const sample = [[161,162, 4,5]]


const coreferenceDict = (state = sample, action) => {
  switch (action.type) {
    case 'CREATE_COREFERENCEDICT':
      console.log(action.type, action.payload)
      const parsed = action.payload.document.split(' ').reduce((acc, e, i) => {
          // console.log(acc, e, i);
          acc.push({text : e, id: i, label: null});
          return acc;
      }, []);
      return [];
    case 'UPDATE_COREFERENCEDICT':
      console.log(action.type, action.payload)
      var cloned = clone(state);
      const idx = cloned.findIndex(x => x.text === action.payload.tokenText);
      if (idx > 0){
        return cloned[idx].indices.concat(action.payload.tokenId);
      }
      else {
        cloned.push({text: action.payload.tokenText, indices: action.payload.tokenId})
        return cloned;
      }
    case 'DELETE_COREFERENCE':
      console.log(action.type, action.payload);
      var cloned = clone(state);
      cloned.forEach((arr, i) => {
        
        const found = action.payload.tokenArray.some(x => arr.indexOf(x) >= 0);
        if (found){
          ///A.filter(n => !B.includes(n)))
          cloned[i] = arr.filter(n => !action.payload.tokenArray.includes(n));
        }
      })
      return cloned;
    default:
      return state;
  }
}

export default coreferenceDict