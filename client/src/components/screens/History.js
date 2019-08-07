import React, {Component} from 'react';


class History extends Component {
  render() {
    return(
        <div className="jumbotron" >
            <h1 className ="display-4">History</h1>
            <p className="lead kr"></p>
            <hr className="my-4"/>
            <div className="view-body justify-content-center">
            <table className="table table-hover table-borderless fluid">
                <tbody >
                <tr className="d-flex">
                    <td className="col-2">Year</td>
                    <td className="col-2">Month</td>
                    <td className="col-8">Achievement</td>
                </tr>
                <tr className="d-flex">
                    <td className="col-2">2016</td>
                    <td className="col-2">
                        <span style={{whiteSpace:"nowrap"}}>5월</span>
                    </td>
                    <td className="col-8">
                        <span>칼마 협회 창립총회 (초대회장 – 김 종진 / NORTH VAN RECYCLING LTD.)</span>
                    </td>
                </tr>
                <tr className="d-flex">
                    <td className="col-2">2016</td>
                    <td className="col-2">
                        <span>6월</span>
                    </td>
                    <td className="col-8">
                    <span>칼마 협회 은행계죄 설립 ( 밴쿠버 한인신용조합 )</span>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    );
  }
}


export default History