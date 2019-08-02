import React, { useState, useEffect, memo } from 'react';
import { Jumbotron, Button, ButtonGroup } from 'react-bootstrap';
import { HistoryContext } from './history/HistoryContext';
import { connect } from 'react-redux';
import * as actions from '../actions';

import TableComponent from './history/Table';
import FormComponent from './history/Form';

import { auth } from '../helpers';
import { PlusIcon } from './icons';

/* const sampleData = [
  { year: "1980", month: "1", title: "칼마 협회 창립총회 ", content: "(초대회장– 김 종진 / NORTH VAN RECYCLING LTD.)" },
  { year: "1980", month: "2", title: "칼마 협회 은행계죄 설립 ", content: "( 밴쿠버 한인신용조합 )" },
  { year: "1980", month: "3", title: "칼마 임시총회", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "1980", month: "4", title: "칼마 6회 골프대회", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "1980", month: "5", title: "ENCORP 핸드링피 미팅 1차", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "1980", month: "6", title: "제 2회 정기총회", content: "(2대회장 – 이 명숙 / COURTENAY RETURN IT DEPOT)" },
  { year: "1980", month: "7", title: "ENCORP 핸드링피 미팅 2차", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "1980", month: "8", title: "ENCORP 핸드링피 미팅 3차", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "1980", month: "9", title: "ENCORP 핸드링피 미팅 4차", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }
] */

const History = memo(({
  data, user, getHistory, isAdmin
}) => {

  const [row, setRow] = useState({ data: {}, show: false });

  //fetchData
  useEffect(() => {
    const fetchData = async () => await getHistory(); //fech data to store
    fetchData();
  }, [getHistory]);

  const handleOpenForm = (data) => setRow({ data, show: true });
  const handleOpenEmptyForm = () => setRow({ data: {}, show: true });
  const handleCloseForm = () => [setRow({ data: {}, show: false })];

  useEffect(() => {
    console.log(user)
  })
  return (
    <HistoryContext.Provider value={{ isAdmin: true }}>
      <Jumbotron>
        <h1 className="display-4">
          History</h1>
        {isAdmin &&
          <CreateButton
            onClick={handleOpenEmptyForm}
          />}
        <hr className="my-4" />
        <TableComponent
          data={data}
          onClick={handleOpenForm}
        />
        <FormComponent
          data={row.data}
          show={row.show}
          onClose={handleCloseForm}
        />
      </Jumbotron>
    </HistoryContext.Provider>
  );
});


const CreateButton = memo(({ onClick }) => {
  return (
    <div style={{ position: "relative" }}>
      <ButtonGroup style={{ position: "absolute", right: "1px", bottom: "0px", minHeight: "30px", minWidth: "30px" }} >
        <Button
          size="sm"
          fontSize="large"
          variant="light"
          onClick={onClick}
          style={{ backgroundColor: "rgba(255,255,255,0)", border: "0px" }}
        >
          <PlusIcon style={{ textAlign: "center", verticalAlign: "middle" }} />
        </Button>
      </ButtonGroup>
    </div>
  );
});

const mapStateToProps = (state) => {
  console.log(state)
  return {
    data: state.history.data,
    user: state.auth.user,
    isAdmin: state.auth.isAdmin,
    errorMessage: state.auth.signInErrorMessage
  }
}

export default connect(mapStateToProps, actions)(History);