import streams from '../apis/streams';
import history from '../history';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, EDIT_STREAM, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM } from './type.js';

/**
 * Action_creator to record user sign in
 * @function {action creator}
 * @param {number} userid
 * @returns {action} - type SIGN_IN
 */
export const signIn = userId => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

/**
 * Action_creator to record user sign out
 * @function {action creator}
 * @returns {action} - type SIGN_IN
 */
export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

/**
 * Action_creator to insert the values of form in REST server using streams axios api call
 * this would allow user to call this api asynchronously using async syntax
 * it uses the streams.post because all the create operations are done using post
 * @function {action creator}
 * @param {string} formValues
 */
export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const response = await streams.post('/streams', { ...formValues, userId } );

        dispatch({ type: CREATE_STREAM, payload: response.data });

        // Do some Programmatic navigation to get the user back to the root route
        history.push('/');
    };
};

/**
 * Action_creator to fetch list of total streams currently present on the server
 * It uses async await syntax in conjunction with redux thunk and dispatch action
 * with actions payload
 * @function {action creator}
 */
export const fetchStreams = () => {
    return async dispatch => {
        const response = await streams.get('/streams');
        dispatch({ type: FETCH_STREAMS, payload: response.data });
    }
};

/**
 * Action_creator to fetch a single stream
 * @function {action creator}
 * @param {number} id
 */
export const fetchStream = (id) => async dispatch =>{
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: FETCH_STREAM, payload: response.data });
};

/**
 * Action_creator for edit a stream created by the user. User cannot edit the stream
 * created by other users
 * @function {action creator}
 * @param {number} id
 * @param {string} formValues
 * @important - Note: it uses patch instead of put because put delete the required fields if not mentioned
 *              in the put action
 */
export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data });

    // Do some Programmatic navigation to get the user back to the root route
    history.push('/');
}

/**
 * Action_creator to delete a node create by the user
 * @function {action creator}
 * @param {number} id
 */
export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
    // Do some Programmatic navigation to get the user back to the root route
    history.push('/');
};
