// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// @reducer: responsible for updating stream state based on the actions
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

import _ from 'lodash';
import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
 } from '../actions/type.js';

 /**
  * Reducer function to update stream state based on the actions
  * @function {reducer}
  * @param {object} props - Component props specific to this setup
  * @param {any} state - Initial state for setup
  * @returns {newState}
  */
 export default ( state={}, action ) => {
    switch(action.type) {
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };

        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };

        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };

        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };

        case DELETE_STREAM:
            return _.omit(state, action.payload);

        default:
            return state;
    }
 }
