
const add_node = (text) => {
    return {
        type: "ADD_NODE",
        payload: {text: text}
    }
}


export default {
    add_node,
}