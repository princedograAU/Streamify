import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// @class_component
// StreamCreate: allows user to create a stream by recording title and description
// highlights: 
//          redux-forms - Field, reduxForm, renderInput
//          validate - error display using meta
//          helper func - renderError, renderInput, onSubmit
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
class StreamCreate extends Component {

    onSubmit = formValues => {
        this.props.createStream(formValues);
    }
    render() {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
            
        );
    }
}

// connect: this function connects a react component to the redux store.
// https://react-redux.js.org/api/connect
export default connect(null, { createStream })(StreamCreate);