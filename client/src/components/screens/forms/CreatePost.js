import React, { Component } from 'react';
import CustomInput from '../CustomInput';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../../actions';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    async onSubmit(formData) {
        await this.props.postNewItem(formData);
        if (!this.props.errorMessage) {
          this.props.history.push('/home');
        }
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="jumbotron" >
            <h1 className="display-4">{this.props.boards.type}</h1>
                <p className="lead">Create New Post</p>
                <hr className="my-4"/>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="inputTitle">Title</label>
                            <Field name="title" type="text" id="inputTitle" placeholder="Enter Title" component= {CustomInput} />
                        </div>
                    </div>  
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="inputContent">Content</label>
                            <Field name="content" type="text" id="inputContent" placeholder="Add something here!"  component= {CustomInput}  />
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                            <label htmlFor="inputPassword">Password</label>
                            <Field name="password" type="password" id="inputPassword" placeholder="Password"  component= {CustomInput}  />
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
                    <div className="form-row">
                    
                    <div className="form-group col">
                            <Field name="board_type" type="text" value={this.props.boards.type} component= {CustomInput}/>
                    </div>
                    </div>  
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
    reduxForm({ form: 'post'})
)(CreatePost)
