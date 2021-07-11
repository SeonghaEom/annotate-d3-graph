import relation from './relation.js';
import tree from './tree.js';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    relation,
    tree
})

export default rootReducer