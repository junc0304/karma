import React, { Component } from 'react';
import CustomInput from '../../CustomInput';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../../actions';
import ReactDOM from 'react-dom';
import TextEditor from './RichText';
import { BOARD_TYPE } from '../../../configuration'
import { EditorState } from 'draft-js';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            editorState: EditorState.createEmpty()
        };
    }
    onSubmit(formData) {
        this.props.postItem(BOARD_TYPE.MEETING, formData);
    }
    onChange(editorState) {
        this.setState({editorState});
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="modal fade" id="newModal">
                <div class="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center">
                            <h5 className="modal-title">
                                Create New
                            </h5>   
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>                  
                        </div> 
                        <div class="modal-body">
                        <form onSubmit={handleSubmit(this.onSubmit)}>                
                            <div className="form-row" style={{height: "10%"}}>
                                <div className="form-group col"  style={{marginBottom:"5px"}}>
                                    <label htmlFor="inputTitle" style={{margin:'2px', lineHeight:"90%", fontSize:"20px"}}>
                                        <span>Title</span>
                                    </label>
                                    <Field name="title" type="text" id="inputTitle" placeholder="Enter Title" component={CustomInput} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label htmlFor="inputContent" style={{margin:'2px', lineHeight:"90%", fontSize:"20px"}}>
                                        <span>Content</span>
                                    </label>
                                    <TextEditor
                                        editorState={this.state.editorState}
                                        onChange={this.onChange()} />
                                    {/*<Field name="content" type="text" id="inputContent" placeholder="Add something here!"  component={this.state.editorState} style= {{width:'100%'}} /> */}
                                </div>
                            </div>
                            <div className="form-row" style={{height: "10%"}}>
                                <div className="form-group col-6">
                                    <label htmlFor="inputPassword"style={{margin:'2px', lineHeight:"90%", fontSize:"20px"}}>
                                        Password
                                    </label>
                                    <Field name="password" type="password" id="inputPassword" placeholder="Password"  component= {CustomInput}  />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="inputPasswordConfirm" style={{margin:'2px', lineHeight:"90%", fontSize:"20px"}}>
                                       *Password
                                    </label>
                                    <input type="password" className="form-control" id="inputPasswordConfirm" placeholder="Confirm password" />
                                </div>
                            </div>
                        </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" class="btn btn-primary">Save</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
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
    reduxForm({ form: 'post' })
)(CreatePost)
