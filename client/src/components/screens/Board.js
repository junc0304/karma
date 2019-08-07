import React, { Component } from 'react';
import BoardTable from './board/Table';
import CreatePost from './forms/CreatePost';

class Board extends Component {
    constructor(props) {
        super(props);
    }
    
    adminButton() {
        return (
            <div class="btn-toolbar justify-content-end" role="toolbar"> 
                <div class="btn-group mr-2" role="group" style={{ textAlign: "right", fontSize: "8px" }}>
                    <button type="button" className="btn " data-toggle="modal" data-target="#newModal" >New</button>
                    <button type="button" className="btn " >Delete</button>
                    <button type="button" className="btn " >Edit</button>
                </div>
            </div>
        );
    }

    renderTitle() {
       return this.props.type;
    }

    userButton() {
        return (
            <div style={{ textAlign: "right", fontSize: "10px" }}>
                
            </div>
        );
    }

    renderTable() {
        return <BoardTable />
    }

    render() {
        const title = this.renderTitle();
        const table = this.renderTable();

        return (
            <div className="jumbotron" >
                <h1 className="display-4">{title}</h1>
                <p className="lead kr">
                </p>
                <div className="view-body">
                    { this.props.isAdmin  ?
                        this.adminButton()
                        : this.userButton() }
                    <CreatePost/>
                    <div className="modal fade" id="editModal">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <CreatePost />
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                    {table}
                </div>
            </div>
        );
    }
}

export default Board;