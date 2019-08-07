import React, { Component } from 'react';
import CustomInput from '../CustomInput';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    async onSubmit(formData) {
        await this.props.signIn(formData);
        if (!this.props.errorMessage) {
          this.props.history.push('/home');
        }
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="jumbotron" >
            <h1 className="display-4">Sign In</h1>
                <p className="lead">Sign in with your account!</p>
                <hr className="my-4"/>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="inputEmail">Email</label>
                            <Field name="email" type="email" id="inputEmail" placeholder="Email" component= {CustomInput} />
                        </div>
                    </div>  
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="inputPassword">Password</label>
                            <Field name="password" type="password" id="inputPassword" placeholder="Password"  component= {CustomInput}  />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Sign In
                    </button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signin'})
)(SignIn)
