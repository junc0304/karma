import React, { Component } from 'react';
import Board from './Board';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import BoardTable from './board/Table';
import CreatePost from './forms/CreatePost';
import {BOARD_TYPE} from '../../configuration';

class MeetingBoard extends Board {
    constructor(Props) {
        super(Props);
    }
    adminButton() {
        return (
            <div className="btn-toolbar justify-content-end" role="toolbar"> 
                <div className="btn-group mr-2" role="group" style={{ textAlign: "right", fontSize: "8px" }}>
                    <button type="button" className="btn btn-outline-success" data-toggle="modal" data-target="#newModal" >Add New</button>
                </div>
            </div>
        );
    }
    userButton() {
        return (
            <div style={{ textAlign: "right", fontSize: "10px" }}>            
            </div>
        );
    }
    renderTable() {
        return <BoardTable BoardType={BOARD_TYPE.MEETING} />
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        type: state.board.type,
        data: state.board.data,
        isAdmin: state.auth.role = 'admin' || 'owner' ? true : false
    }
}

export default connect(mapStateToProps, actions)(MeetingBoard);