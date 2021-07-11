const relation = (state= new Set(), action) => {
  switch (action.type) {
    case 'ADD_RELATION':
      state.add([action.payload.src, action.payload.dest]);
      return state;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

export default relation