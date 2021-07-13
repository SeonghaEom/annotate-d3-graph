import relation from './relation.js';
import tree from './tree.js';
import tokenDict from './tokenDict.js';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    relation,
    tree,
    tokenDict,
})

export default rootReducer