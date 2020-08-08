// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// @reducer: responsible for changing user login/logout state based
//           based on the action
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

import {SIGN_IN, SIGN_OUT} from '../actions/type.js';

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

/**
 * Reducer function to update the user login/logout state
 * @function {reducer}
 * @param {object} props - Component props specific to this setup
 * @param {any} state - Initial state for setup
 * @returns {newState}
 */
export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null };
        default:
            return state;
    }
};
