import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';



class BoardTable extends Component {
    constructor() {
        super();
        this.state = {
            expandedRow : null
        }
    }
    componentDidMount() {
        this.props.getMeeting();
    }

    renderItem(item) {
        const clickCallback = () => this.handleRowClick(item.id);
         const itemRows = (
            <tbody key={"row-data-" + item.id} >
             <tr 
                className="clickable" 
                data-toggle="collapse" 
                data-target={"#group-of-rows-"+ item.id } 
                aria-expanded="false" 
                aria-controls={"group-of-rows"+item.id} >

                 <td className="col1 auto kr"  key={"row-data-" + item.id}>
                    {item.index}
                 </td>
                 <td className="col2 w-50 kr">
                    {item.title} {item.comments_count === 0 ? '' : '[' + item.comment_count + ']'}</td>
                 <td className="col3 w-25 kr" style={{whiteSpace:"nowrap"}}> 
                     {new Intl.DateTimeFormat('en-US',{month: "short", day:"numeric", year:"numeric"}).format(new Date(item.created))} </td>
                 <td className="col4 auto kr">{item.author_name}</td>
               
            </tr>
             <tr className="tableRow collapse" id={"group-of-rows-"+ item.id }>
                 <td className="container" colSpan="5" style={{flexGrow:"1",flexShrink:"1", flexBasis:"auto"  }}>
                    <div className="card card-body" style={{height:"400px",  transition:"height 0.3s ease-out"}}>
                    {item.contents}
                    </div>
                 </td>
             </tr>
             </tbody>
         );
        return itemRows;
    }

    render() {
        let allItemRows = [];
        let items = this.props.data;
        console.log(allItemRows);

        Object.keys(items).forEach((item, index) => {
            items[index].id = index;
            const perItemRows = this.renderItem(items[index]);
            allItemRows = allItemRows.concat(perItemRows);
        });

        return (

                <table className="table">
                    <thead>
                    <tr>
                        <th className="col1 auto" >#</th>
                        <th className="col2 w-50">Title</th>
                        <th className="col3 w-25">Date</th>
                        <th className="col4 auto">By</th>
                    </tr>
                </thead>
                
                {allItemRows}

                </table>
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