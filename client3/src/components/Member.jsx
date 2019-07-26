import React, { useEffect, memo, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import TableComponent from './member/Table.jsx';
import ViewComponent from './member/View.jsx';
import * as actions from '../actions';

const Member = memo(({member, getMembers}) => {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  //action => store
  useEffect(() => {
    const fetchData = async () => {
      await getMembers();
    }
    fetchData();
  }, [getMembers]);

  const onClickRow = (item) => {
    setModalData(item);
    setShowModal(true);
  }

  useEffect(()=> {
    setData(Object.values(member.data))
  }, [member])

  return (
    <Jumbotron style={{ wordWrap: "break-word", padding: "15px 15px", backgroundColor:"rgba(255,255,255,0.8)" }}>
        <h1 className="display-4">Members</h1>
        <hr className="my-3" />
        <TableComponent data={data} onClick={onClickRow}/>
        <ViewComponent data={modalData} setShow={setShowModal} show={showModal} />
    </Jumbotron>
  );
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
    member: state.member,
    errorMessage: state.errorMessage
  };
}

export default connect(mapStateToProps, actions)(Member);
