import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// @class_component
// StreamEdit: allows user to edit a specific stream by recording title and description
//             if user is logged in
// highlights: 
//          redux-forms - Field, reduxForm, renderInput
//          validate - error display using meta
//          helper func - onSubmit
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
class StreamEdit extends Component {

    // @lifecycle_method: fetch a stream based on the id
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    // @helper_function: executes editStream callback function with id and formValues
    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        if (!this.props.stream){
            return <div>Loading...</div>
        }

        return(
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    // initialValues={ this.props.stream }
                    initialValues={{ title: this.props.stream.title , description: this.props.stream.description }} 
                    onSubmit={this.onSubmit} 
                />
            </div>
        );
    }
}

// @execution: anytime store is updated, mapStateToProps will be called.container
// @output   : it always return an object
// @input    : maximum 2 parameters - state and it's own props
const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
}

// connect: this function connects a react component to the redux store.
// https://react-redux.js.org/api/connect
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);