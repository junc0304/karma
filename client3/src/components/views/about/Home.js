import React from 'react';
import {Jumbotron} from 'react-bootstrap';
const Home = () => {
  return(
    <Jumbotron>
    <h1 className="display-4">Coming Soon...</h1>
    <p className="lead kr"></p>
    <hr className="my-4" />
    <div className="view-body">
        <p className="lead">Welcome to KARMA.<br /></p>
        <p className="kr">칼마 홈페이지를 제작중입니다.</p>
        <p className="kr">
            이용에 불편을 드려 죄송합니다. <br />
            빠른시일 내에 완성하도록 하겠습니다.<br />
        </p>
        <p style={{textAlign:"right"}}> - KARMA</p>
    </div>
    </Jumbotron>
  );
}

export default Home;