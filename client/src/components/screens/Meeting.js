import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import BoardTable from './board/BoardTable';

class Board extends Component {

    constructor() {
        super();
        this.state = {
            expandedRow : null
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
            <tr key={"row-expanded-" + item.id}>
               <td colSpan="4">
                    <div className="card card-body" style={{backgroundColor:"rgba(255,255,255,0.5)", height:"1000px"}}>
                        {item.contents}
                    </div>
               </td>
            </tr>
          );
        }
        return itemRows;
    }
    componentDidMount() {
      //  this.props.getMeeting();
    }


    
    render() {
        let allItemRows = [];
        const title = this.props.type;
        let items = this.props.data;

        Object.keys(items).forEach((item, index)=> {
            items[index].id = index;
            const perItemRows = this.renderItem(items[index]);
            allItemRows = allItemRows.concat(perItemRows);
        });
    
        return (
            <div className="jumbotron" >
                <h1 className="display-4">{title}</h1>
                <p className="lead kr">
                </p>
                <div className="view-body">
                    {
                        this.props.isAdmin ?
                            <div style={{ textAlign: "right", fontSize: "10px" }}>
                                <button type="submit" className="btn" >New</button>
                                <button type="submit" className="btn" >Delete</button>
                                <button type="submit" className="btn" >Edit</button>
                            </div>
                            : null
                    }
                    <BoardTable/>
                     {/**
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
                            
                            {/**
                            {Object.keys(items).map(item => (
                                <tr key={item} onClick= {handleClick}>
                                    <td className="col1 auto kr">{items[item].index}</td>
                                    <td className="col2 w-50 kr">{items[item].title} {items[item].comment_count = 0 ? '' : items[item].comment_count}</td>
                                    <td className="col3 w-25 kr" style={{whiteSpace:"nowrap"}}> 
                                     { new Intl.DateTimeFormat('en-US',{month: "short", day:"numeric", year:"numeric"}).format(new Date(items[item].created))}</td>
                                    <td className="col4 auto kr">{items[item].author_name}</td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                */}
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

export default connect(mapStateToProps, actions)(Board);