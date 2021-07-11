
const add_link = (text, parent) => {
    return {
        type: "ADD_LINK",
        payload: {text: text, parent: parent}
    }
}

const remove_link = (from, to) => {
    return {
        type: "REMOVE_RELATION",
        payload: {src: from, dest: to}
    }
}

export default {
    add_link,
    remove_link
}