import React, { useEffect, memo, useState } from 'react';
import { Jumbotron, Table, Container } from 'react-bootstrap';
import { connect } from 'react-redux'

import * as actions from '../../actions';
import Pagination from './Board.Components/Board.Pagination';
import {MEMBER_PROPERTY} from '../../config';

const {PAGE_SIZE, PAGINATION_SIZE} = MEMBER_PROPERTY;

const TableBody = memo(({ pageSize, data, currentPage }) => {
    const [currentData, setCurrentData] = useState([]);
    //props => localState
    useEffect(() => {
      const loadPageData = async () =>
        setCurrentData(
          Object.values(data)
            .slice((currentPage - 1) * pageSize, currentPage * pageSize));
      loadPageData();
    }, [data, pageSize, currentPage]);
    
    return (
      <tbody>
        { Object.values(currentData).map((item, index) =>
          <tr key={index}>
            <td key={`#-col-${index}`}>{item.depot}</td>
            <td key={`title-col-${index}`}>{item.location}</td>
            <td key={`date-col-${index}`}>{item.name}</td>
            <td key={`by-col-${index}`}>{item.contact}</td>
            <td key={`role-col-${index}`}>{item.role}</td>
          </tr>)}
      </tbody>
    );
  });

const MemberList = memo(({member, getMembers}) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  //action => store
  useEffect(() => {
    const fetchData = async () => {
      try {
        member.data=[];
        await getMembers();
      }
      catch(err) {
        setError('network error.. please try again later..');
      }
    }
    fetchData();
  }, [getMembers]);
  //store => localState
  useEffect(()=> {
    setData(member.data);
  }, [member.data])
  
  return (
    <Jumbotron>
      <Container>
        <h6>{error}</h6>
        <h1 className="display-4">Members</h1>
        <hr className="my-3" />
        <Table variant="light">
          <thead>
            <tr>
              <th className="col1 w-25">Depot</th>
              <th className="col2 w-25">Location</th>
              <th className="col3 w-25">Owner</th>
              <th className="col5 w-auto">Contact</th>
              <th className="col6 w-auto">Role</th>
            </tr>
          </thead>
          <TableBody
              data={data}
              pageSize={PAGE_SIZE}
              currentPage={currentPage} />
        </Table>
        <Pagination
           dataSize={data.length }
           pageSize={PAGE_SIZE}
           paginationSize={PAGINATION_SIZE}
           currentPage={currentPage}
           setCurrentPage={setCurrentPage} />
      </Container>
    </Jumbotron>
  );
});

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    user: state.user,
    member: state.member,
    errorMessage: state.errorMessage
  };
}

export default connect(mapStateToProps, actions)(MemberList);
