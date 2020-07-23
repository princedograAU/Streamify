import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// @class_component
// StreamForm: returns a form component with input fields - { title, description }
// highlights: 
//          redux-forms - Field, reduxForm, renderInput
//          validate - error display using meta
//          helper func - renderError, renderInput, onSubmit
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
class StreamForm extends Component {
    
    // @helper_function: return error message div using error and touched 
    //                   properties of unstructured meta
    renderError = ({ error, touched }) => {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    // @helper_function: return rendered input fields to the Field component
    // @parameters: 
    //              input, meta - extracted from formProps passed in as props when Field component renders 
    //              label       - is a prop sent to provide dynamic label to the fields
    renderInput = ({ input, label, meta }) => {
        return (
            <div className={`field ${meta.error && meta.touched ? 'error' : '' }`}>
                <label>{ label }</label>
                <input {...input} autoComplete="off" />
                <div>{this.renderError(meta)}</div>
            </div>
        );
    }

    // @helper_function: executes callback function with formValues passed from the render function
    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <div className="ui container">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="title" component={this.renderInput} label="Enter Title" />
                    <Field name="description" component={this.renderInput} label="Enter Description" />
                    <button className="ui button primary">Submit</button>
                </form>
            </div>
        );
    }
}

// @helper_function: it executes every time user enters a value in the input field.
// Ìt returns error messages in form of an object if any of the field is empty
const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        // executes if user enters no title value
        errors.title = "You must enter a title";
    }

    if (!formValues.description) {
        // executes if user enters no description
        errors.description = "You must enter a description";
    }

    // return error object
    return errors;
};

// redux form behaves similar to connect with 1 required parameter i.e. form name
// In this case form name is streamForm
export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);