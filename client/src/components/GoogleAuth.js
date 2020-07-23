// https://github.com/google/google-api-javascript-client
// above link for google documentation
import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// @class_component
// GoogleAuth: allows user to create a stream by recording title and description
// highlights: 
//          redux-forms - Field, reduxForm, renderInput
//          validate - error display using meta
//          helper func - renderError, renderInput, onSubmit
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn) { 
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };
    
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={() => this.auth.signOut()}>
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className="ui red google button" onClick={() => this.auth.signIn()}>
                    <i className="google icon"/>
                    Sign In
                </button>
            );
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

// @execution: anytime store is updated, mapStateToProps will be called.container
// @output   : it always return an object
// @input    : maximum 2 parameters - state and it's own props
const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
