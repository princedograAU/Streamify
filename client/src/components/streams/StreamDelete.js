import React, { Component } from 'react';
import history from '../../history';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// @class_component
// StreamDelete: allows user to delete a stream by recording user's consent
// highlights: 
//          Modal - Field, reduxForm, renderInput
//          validate - error display using meta
//          helper func - renderError, renderInput, onSubmit
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
class StreamDelete extends Component {

    // @lifecycle_method: fetches a selected stream using the id passed as a url
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    // @helper_function: returns ui component with 2 buttons { Delete, Cancel }
    renderActions = () =>{
        return (
            <React.Fragment>
                <button 
                    onClick={() => this.props.deleteStream(this.props.match.params.id)} 
                    className="ui red button negative"
                >
                Delete
                </button>
                <Link to="/" className="ui green button">Cancel</Link>
            </React.Fragment>
        );
    }

    render() {
        return (
            <Modal 
                    title={ this.props.stream ? `Delete Stream - ${this.props.stream.title}`: ''}
                    content="Are you sure you want to delete this stream?"
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
        );
    }
}

// @execution: anytime store is updated, mapStateToProps will be called.container
// @output   : it always return an object
// @input    : maximum 2 parameters - state and it's own props
const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]};
}

// connect: this function connects a react component to the redux store.
// https://react-redux.js.org/api/connect
export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);