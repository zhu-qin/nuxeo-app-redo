import { merge } from 'lodash';

import {
    SET_CURRENT_NODE
} from '../actions/tree_actions';

const defaultState = {
  root: {},
  currentNode: {}
};

const FileTreeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CURRENT_NODE:
            let newState =  merge({}, state, {currentNode: action.currentNode});
            return newState;
        default:
            return state;
    }
};

export default FileTreeReducer;