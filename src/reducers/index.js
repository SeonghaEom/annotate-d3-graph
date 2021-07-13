import relation from './relation.js';
import tree from './tree.js';
import tokenDict from './tokenDict.js';
import coreferenceDict from './coreferenceDict.js';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    relation,
    tree,
    tokenDict,
    coreferenceDict,
})

export default rootReducer