import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class BoardTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPageNumber: 0,
            currentPageNumberSet: 0,
            isPrevButtonActive: false,
            isNextButtonActive: true
        };
        
        this.onClickPageNumber = this.onClickPageNumber.bind(this);
    }

    getNumberOfPages(lists, itemsPerPage) {
        console.log(lists.length);
        const numberOfPages = Math.ceil(lists.length / itemsPerPage);
        return Array.from(Array(numberOfPages).keys());
    }

    getNumberOfPageSets(lists, itemsPerPageSet) {
        return Math.ceil(lists.length / itemsPerPageSet);
    }

    paginatedSetsLists(lists, itemsPerPageSet) {
        const { currentPageNumberSet } = this.state;
        if (!Array.isArray(lists)) new Error('Invalid supplied Lists.');

        return lists.slice(
            currentPageNumberSet * parseInt(itemsPerPageSet, 0),
            (currentPageNumberSet + 1) * parseInt(itemsPerPageSet, 0)
        );
    }

    paginatedLists(lists, itemsPerPage) {
        const { currentPageNumber } = this.state;
        if (!Array.isArray(lists)) new Error('Invalid supplied Lists.');

        return lists.slice(
            currentPageNumber * parseInt(itemsPerPage, 0),
            (currentPageNumber + 1) * parseInt(itemsPerPage, 0)
        );
    }

    onClickPageNumber(page) {
        this.setState({ currentPageNumber: page });
    }

    onClickNextPage(numberOfPageSets) {
        if (this.state.currentPageNumberSet < numberOfPageSets - 1) {
            this.setState({
                currentPageNumberSet: this.state.currentPageNumberSet + 1
            });
            this.setButtonState(numberOfPageSets);
        }
    }

    onClickPrevPage(numberOfPageSets) {
        if (!this.state.currentPageNumberSet === 0) {
            this.setState({
                currentPageNumberSet: this.state.currentPageNumberSet - 1
            });
            this.setButtonState(numberOfPageSets);
        }
    }

    setButtonState(numberOfPageSets) {
        switch (this.state.currentPageNumberSet) {
            case numberOfPageSets - 1:
                this.setState({
                    isNextButtonActive: false
                })
                break;
            case 0:
                this.setState({
                    isPrevButtonActive: false
                })
                break;
            default:
                this.setState({
                    isNextButtonActive: true,
                    isPrevButtonActive: true
                })
        }
    }

    componentDidMount() {
        this.props.getItem(this.props.BoardType);
    }

    render() {
        let articleList = Object.values(this.props.data);
        let pages = this.getNumberOfPages(articleList, 9);
        let items = this.paginatedLists(articleList, 9);

        let numberOfPageSets = this.getNumberOfPageSets(pages, 5);
        let setItems = this.paginatedSetsLists(pages, 5);
        return (
            <>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="col1 auto" >#</th>
                            <th className="col2 w-50">Title</th>
                            <th className="col3 w-25">Date</th>
                            <th className="col4 auto">By</th>
                        </tr>
                    </thead>
                    <tbody>
                        { items.map((item) =>
                            <tr key={"row-data-" + item.id} >
                                <td className="col1 auto kr" key={"row-data-" + item.id}>{item.index}</td>
                                <td className="col2 w-50 kr">{item.title} {item.comments_count === 0 ? '' : '[' + item.comment_count + ']'}</td>
                                <td className="col3 w-25 kr" style={{ whiteSpace: "nowrap" }}>
                                    {new Intl.DateTimeFormat('en-US', { month: "short", day: "numeric", year: "numeric" }).format(new Date(item.created))}
                                </td>
                                <td className="col4 auto kr">{item.author_name}</td>
                            </tr>) }
                    </tbody>
                </table>
                <nav>
                    <ul className="pagination pagination-sm justify-content-center">
                        <li className="page-item"
                            onClick={() => this.onClickPrevPage(numberOfPageSets)}>
                            <a className="page-link" style={{ color: "black" }} href="#">&laquo;</a>
                        </li>
                        { setItems.map((page) =>
                            <li className="page-item"
                                style={{ minWidth: '26px' }}
                                onClick={() => { this.onClickPageNumber(page) }}>
                                <a className="page-link" style={{ color: "black" }} href="#">{page + 1}</a>
                            </li>)}
                        <li className="page-item"
                            onClick={() => this.onClickNextPage(numberOfPageSets)}>
                            <a className="page-link" style={{ color: "black" }} href="#">&raquo;</a>
                        </li>
                    </ul>
                </nav>
            </>
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