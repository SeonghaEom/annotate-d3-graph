
const create_tokenDict = (document) => {
  return {
    type: "CREATE_TOKENDICT",
    payload: {document: document}
  }
}

const update_tokenDict = (tokenId, label) => {
  return {
    type: "UPDATE_TOKENDICT",
    payload: {tokenId: tokenId, label: label}
  }
}


export default {
  create_tokenDict,
  update_tokenDict,
}