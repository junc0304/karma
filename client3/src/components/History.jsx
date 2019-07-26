import React, { useState, useEffect, memo } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { TrashIcon, EditIcon, ExIcon } from './icons';
import TableComponent from './history/Table.jsx';
import {HistoryContext} from './history/HistoryContext.jsx';
import _ from 'lodash';

const sampleData = [
  { year: "1980", month: "1", title: "칼마 협회 창립총회 ", content: "(초대회장– 김 종진 / NORTH VAN RECYCLING LTD.)" },
  { year: "1980", month: "2", title: "칼마 협회 은행계죄 설립 ", content: "( 밴쿠버 한인신용조합 )" },
  { year: "1980", month: "3", title: "칼마 임시총회", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "1980", month: "4", title: "칼마 6회 골프대회", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "1980", month: "5", title: "ENCORP 핸드링피 미팅 1차", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "1980", month: "6", title: "제 2회 정기총회", content: "(2대회장 – 이 명숙 / COURTENAY RETURN IT DEPOT)" },
  { year: "1980", month: "7", title: "ENCORP 핸드링피 미팅 2차", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "1980", month: "8", title: "ENCORP 핸드링피 미팅 3차", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "1980", month: "9", title: "ENCORP 핸드링피 미팅 4차", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }
]

const History = memo(({ getHistory, isAdmin, historyData }) => {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  //fetchData
  useEffect(() => {
    const fetchData = async () => {
      //fetch history data
    }
    fetchData();
  }, [getHistory]);

  //load data from props
  useEffect(() => {
    setData(sampleData);
  }, [sampleData]);

  const handleSubmit = (formData) => {
    //submig formData
  }

  const showRowData = (rowData) => {
    setFormData(rowData);
    setShowModal(true);
  }

  const deleteRow = () => {

  }

  const closeModal = () => {
    setShowModal(false);
  }

  const openModal = () => {
    setShowModal(true);
  }

  return (
    <HistoryContext.Provider value={{ showRowData, openModal, data }}>
      <Jumbotron>
        <h1 className="display-4">
          History</h1>
        <hr className="my-4" />
        <TableComponent data={data} />
      </Jumbotron>
    </HistoryContext.Provider>
  );
});


export default memo(History);