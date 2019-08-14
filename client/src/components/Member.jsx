import React, { useEffect, memo, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import TableComponent from './member/Table.jsx';
import FormComponent from './member/Form.jsx';
import * as actions from '../actions';

const Member = memo(({ data, getMembers }) => {
  const [row, setRow] = useState({ show: false, data: [] });
  //action => store
  useEffect(() => {
    const fetchData = async () => await getMembers();
    fetchData();
  }, [getMembers]);

  const onClickRow = (item) => setRow({ show: true, data: item });
  const onCloseRow = () => setRow({ show: false, data: [] });

  return (
    <Jumbotron
      className='jumbotron-main'
      style={{
        wordWrap: 'break-word',
        padding: '15px 15px',
        backgroundColor: 'rgba(255,255,255,0.8)'
      }}
    >
      <div className='jumbotron-inner-frame' >
        <h1 style={{ height: '5rem', fontSize: '3rem', padding:'8px 14px' }} >
          Members
        </h1>
        <hr className='my-2' />
        <TableComponent
          data={data}
          onClick={onClickRow}
        />
        <FormComponent
          data={row.data}
          show={row.show}
          onClose={onCloseRow}
        />
      </div>
    </Jumbotron>
  );
});
const mapStateToProps = (state) => {
  return {
    data: state.member.data,
    errorMessage: state.errorMessage
  };
}

export default connect(mapStateToProps, actions)(Member);
