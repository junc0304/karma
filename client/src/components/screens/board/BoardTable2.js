import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';


class BoardTable extends Component {
    constructor() {
        super();
        this.state = {
            expandedRow: null
        }
    }


    handleRowClick(rowId) {
        const currentExpandedRow = this.state.expandedRow;
        this.setState({ expandedRow: (rowId === currentExpandedRow) ? null : rowId })
    }

    renderItem(item) {
       const clickCallback = () => this.handleRowClick(item.id);
        const itemRows = [
            <tr key={"row-data-" + item.id} onClick={clickCallback} >
                <td className="col1 auto kr"  key={"row-data-" + item.id}>{item.index}</td>
                <td className="col2 w-50 kr">{item.title} {item.comments_count === 0 ? '' : '[' + item.comment_count + ']'}</td>
                <td className="col3 w-25 kr" style={{whiteSpace:"nowrap"}}> 
                    {new Intl.DateTimeFormat('en-US',{month: "short", day:"numeric", year:"numeric"}).format(new Date(item.created))} </td>
                <td className="col4 auto kr">{item.author_name}</td>
           </tr>
         ];
         
        if (this.state.expandedRow === item.id) {
          itemRows.push(
            <tr key={"row-expanded-" + item.id} >
               <td colSpan="4">
                    <div className="container" style={{backgroundColor:"rgba(255,255,255,0.5)", minHeight:"100px"}}>
                        {item.contents}
                    </div>
               </td>
            </tr>
          );
        }
        
        return itemRows;
    }
    componentDidMount() {
        this.props.getMeeting();
    }

    render() {

        let allItemRows = [];
        let items = this.props.data;
        console.log(allItemRows);

        Object.keys(items).forEach((item, index) => {
            console.log(item);
            console.log(items[index]);

            items[index].id = index;
            const perItemRows = this.renderItem(items[index]);
            allItemRows = allItemRows.concat(perItemRows);
        });

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="col1 auto" >#</th>
                            <th className="col2 w-50">Title</th>
                            <th className="col3 w-25">Date</th>
                            <th className="col4 auto">By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allItemRows}
                    </tbody>
                </table>
                <div className="modal fade " id="orderModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered " role="document">
                        <div className="modal-content jumbotron">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
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

export default connect(mapStateToProps, actions)(BoardTable);