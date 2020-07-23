import streams from '../apis/streams';
import history from '../history';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, EDIT_STREAM, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM } from './type.js';

// @action_creator to record user sign in
export const signIn = userId => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

// @action_creator to record user sign out
export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

// @action_creator to insert the values of form in REST server using streams axios api call
// this would allow user to call this api asynchronously using async syntax
// it uses the streams.post because all the create operations are done using post
export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const response = await streams.post('/streams', { ...formValues, userId } );
        
        dispatch({ type: CREATE_STREAM, payload: response.data });
        
        // Do some Programmatic navigation to get the user back to the root route
        history.push('/');
    };
};

// @action_creator to fetch list of total streams currently present on the server
// It uses async await syntax in conjunction with redux thunk and dispatch action 
// with actions payload
export const fetchStreams = () => {
    return async dispatch => {
        const response = await streams.get('/streams');
        dispatch({ type: FETCH_STREAMS, payload: response.data });
    }
};

// @action_creator to fetch a single stream
export const fetchStream = (id) => async dispatch =>{
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: FETCH_STREAM, payload: response.data });
};

// @action_creator for edit a stream created by the user. User cannot edit the stream
// created by other users
// Note: it uses patch instead of put because put delete the required fields if not mentioned
//       in the put action 
export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data });
    
    // Do some Programmatic navigation to get the user back to the root route
    history.push('/');
}

// @action_creator to delete a node create by the user
export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
    // Do some Programmatic navigation to get the user back to the root route
    history.push('/');
};