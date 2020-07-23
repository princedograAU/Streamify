import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams, editStream } from '../../actions';
import { Link } from 'react-router-dom'; 

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// @class_component
// StreamList: allows user to create a stream by recording title and description
// highlights: 
//          redux-forms - Field, reduxForm, renderInput
//          validate - error display using meta
//          helper func - renderError, renderInput, onSubmit
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
class StreamList extends Component {

    // @lifecycle_method: executes for the first time when component loads
    componentDidMount() {
        this.props.fetchStreams();
    }

    // @helper_function: returns Link ui buttons Edit, Delete after performing check on logged in user
    //                   If stream belongs to the user then these buttons will appear on the screen
    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            );
        }
    };

    // @helper_function: returns ui component with list of streams available on the server
    renderList = () => {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header" >
                            {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    };

    // @helper_function: returns ui component for creating a new stream
    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui green button" >Create Stream</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="ui container">
                <h2>STREAMS</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }
}

// @execution: anytime store is updated, mapStateToProps will be called.container
// @output   : it always return an object
// @input    : maximum 2 parameters - state and it's own props
const mapStateToProps = state => {
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
     };
}

// connect: this function connects a react component to the redux store.
// https://react-redux.js.org/api/connect
export default connect(mapStateToProps, {fetchStreams, editStream})(StreamList);