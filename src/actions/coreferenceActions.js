
const create_coreferenceDict = (document) => {
  return {
    type: "CREATE_COREFERENCEDICT",
    payload: {document: document}
  }
}

const update_coreferenceDict = (tokenArray) => {
  return {
    type: "UPDATE_COREFERENCEDICT",
    payload: {tokenArray: tokenArray}
  }
}

const delete_coreferenceDict = (tokenArray) => {
  return {
    type: "DELETE_COREFERENCEDICT",
    payload: {tokenArray: tokenArray}
  }
}


export default {
  create_coreferenceDict,
  update_coreferenceDict,
  delete_coreferenceDict

}