import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import CustomInput from '../CustomInput';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    async onSubmit(formData) {
        console.log('form data',formData);
        await this.props.signUp(formData);
        if (!this.props.errorMessage) {
          this.props.history.push('/home');
        }
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="jumbotron" id="jsign" >
                <h1 className="display-4" >Sign Up</h1>
                <p className="lead">Sign up & get started today!</p>
                <hr className="my-4"/>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="inputName">Name</label>
                        <Field name="name" type="text" id="inputName" placeholder="John Doe" component= {CustomInput} />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail">Email</label>
                            <Field name="email" type="email" id="inputEmail" placeholder="Email"  component= {CustomInput} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword">Password</label>
                            <Field name="password" type="password" id="inputPassword" placeholder="Password"  component= {CustomInput}  />
                            <label htmlFor="inputPasswordConfirm">Confirm Password</label>
                            <input type="password" className="form-control" id="inputPasswordConfirm" placeholder="Confirm your password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Depot Name</label>
                        <Field name="depot_name" type="text" id="inputDepotName" placeholder="e.g. Burnaby Return-It bottle depot..."  component= {CustomInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Address</label>
                        <Field name="address1" type="text" id="inputAddress" placeholder="1234 Main St"  component= {CustomInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Address 2</label>
                        <Field name="address2" type="text" id="inputAddress2" placeholder="Apartment, studio, or floor" component= {CustomInput}  />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12 col-lg-4">
                            <label htmlFor="inputCity">City</label>
                            <Field name="city" type="text" id="inputCity" component= {CustomInput} />
                        </div>
                        <div className="form-group col-6 col-lg-4">
                            <label htmlFor="inputProvince">Province</label>
                            <Field name="province" type="text" id="inputProvince" component= {CustomInput} />
                        </div>
                        <div className="form-group col-6 col-lg-4">
                            <label htmlFor="inputPostalCode">Postal Code</label>
                            <Field name="postal_code" type="text" id="inputPostalCode"  component= {CustomInput} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="comment">Comments</label>
                        <textarea className="form-control" id="inputComments" placeholder="Comments" />
                    </div>

                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck" />
                            <label className="form-check-label" htmlFor="gridCheck">
                                Receive email updates from KARMA
                            </label>
                        </div>
                    </div>
                    
                    { this.props.errorMessage ? 
                        <div className="alert alert-danger">
                            { this.props.errorMessage }
                        </div>
                    : null}

                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup'})
)(SignUp)
