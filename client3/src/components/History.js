import React, { useState, useEffect, memo } from 'react';
import { Col, Card, Form, ButtonToolbar, ButtonGroup, Container, Jumbotron, Table, FormCheck, Button, Accordion, Row } from 'react-bootstrap';

const AddButton = memo(() => {
  return (
    <ButtonToolbar
      style={{ position: "relative" }}>
      <Button
        variant="light"
        onClick={() => null}
        style={{ position: "absolute", right: "0px" }}>
        {"+"}</Button>
    </ButtonToolbar>
  );
});

const EditButton = memo(() => {
  return (
    <ButtonToolbar>
      <hr className="my-3" />
      <ButtonGroup className="d-flex ml-auto" >
        <Button
          variant="light"
          style={{ width: "6rem", marginRight: "5px" }}>
          Save</Button>
        <Button
          variant="light"
          style={{ width: "6rem" }}>
          Cancel</Button>
      </ButtonGroup>
    </ButtonToolbar>
  )
})


const NewForm = (props) => {

  return (
    <>
      <Form>



      </Form>
    </>
  );
}




const sampleData = [
  { year: "1111", month: "1월", title: "칼마 협회 창립총회 ", content: "(초대회장– 김 종진 / NORTH VAN RECYCLING LTD.)" },
  { year: "2222", month: "2월", title: "칼마 협회 은행계죄 설립 ", content: "( 밴쿠버 한인신용조합 )" },
  { year: "3333", month: "3월", title: "칼마 임시총회", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "4444", month: "4월", title: "칼마 6회 골프대회", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "5555", month: "5월", title: "ENCORP 핸드링피 미팅 1차", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "6666", month: "6월", title: "제 2회 정기총회", content: "(2대회장 – 이 명숙 / COURTENAY RETURN IT DEPOT)" },
  { year: "7777", month: "7월", title: "ENCORP 핸드링피 미팅 2차", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "8888", month: "8월", title: "ENCORP 핸드링피 미팅 3차", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  { year: "9999", month: "9월", title: "ENCORP 핸드링피 미팅 4차", content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }]

const TableBody = memo(({ data, onClick }) => {
  return (
    <tbody>
      {Object.values(data).map((item, index) =>
        <tr className="d-flex" key={`history-row-${index}`} onClick={() => onClick(item)}>
          <td className="col-3">
            {item.year}</td>
          <td className="col-2">
            {item.month}</td>
          <td className="col-7">
            {item.title}</td>
        </tr>)}
    </tbody>
  );
});

const TableBody2 = memo(({ data, onClick }) => {
  const [cardData, setCardData] = useState([]);

  useEffect(()=>  {
    setCardData(
      Object.values(data).map((item, index) =>
        <Card border="light" variant="light" key={`data-${index}`}>
          <Accordion.Toggle 
            as={Card.Header} 
            eventKey={`accordion-${index}`} 
            onClick={() => onClick(item)} >
            <Row className="d-flex">
              <Col className="col-3">{item.year}</Col>
              <Col className="col-2">{item.month}</Col>
              <Col className="col-7">{item.title}</Col>
            </Row>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={`accordion-${index}`}>
            <Card.Body>{item.content}</Card.Body>
          </Accordion.Collapse>
        </Card>
    ));
  }, [data])

  return (
    <div>    
      <Card>
        <Card.Header >
          <Row className="d-flex" >
            <Col className="col-3 justify-content-center" >년</Col>
            <Col className="col-2 justify-content-center">월</Col>
            <Col className="col-7 justify-content-center">내용</Col>
          </Row>
        </Card.Header>
    </Card>
    <Accordion >
    {cardData}
    </Accordion>
    </div>
  );
});


const History = ({ getHistory, role = 'Admin', historyData }) => {
  const [data, setData] = useState({});
  const [selectedData, setSelectedData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  //fetchData
  useEffect(() => {
    const fetchData = async () => {
      //await getHistory();
    }
    fetchData();
  }, [getHistory]);

  //load data from props
  useEffect(() => {
    setData(sampleData);
  }, [sampleData]);

  useEffect(() => {
    console.log(
      {
        data: data,
        selectedData: selectedData,
        editMode: editMode
      });
  });
  return (
    <Container>
      <Jumbotron >
        {role === 'Admin' ?
          <AddButton setEditMode={setEditMode} /> : null}
        <h1 className="display-4">
          History</h1>
        <p className="lead">
          karma</p>
        <hr className="my-3" />

        {/*  <Table
          borderless
          hover
          variant="light"
          style={{ textAlign: "center" }}>
          <thead>
            <tr className="d-flex">
              <th className="col-2">
                Year</th>
              <th className="col-2">
                Date</th>
              <th className="col-8">
                Achievement</th>
            </tr>
          </thead>
          <TableBody data={data} onClick={setSelectedData} />
        </Table> */}
        <Accordion>
          <TableBody2 data={data} onClick={setSelectedData} />
        </Accordion>

        <hr className="my-3" />
        {/* <EditButton/> */}
      </Jumbotron>
    </Container>
  );
}
export default memo(History);