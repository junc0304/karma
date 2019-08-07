import React, { Component } from 'react';

class BoardModal extends Component {

    constructor(props){
        super(props);
    }
    render(){
        let modalController = this.props.controller
        return (
        <div className="modal fade" id="contentModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered  modal-lg" role="document">
                <div className="modal-content jumbotron">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{this.state.modalItems.title}}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                   {this.state.modalItems.content}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>


        );
    }


}
