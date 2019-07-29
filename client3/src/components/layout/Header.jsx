import React, { Fragment, memo, useEffect, useState } from 'react';
import { Nav, Navbar, NavDropdown, Image, Badge } from 'react-bootstrap';
import karmaLogo from '../images/karma_logo.jpg';

import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {BOARD_TYPE, BADGE_MARK_DAYS} from '../../config';
import * as actions from '../../actions';
import axios from 'axios';

const AuthMenu = memo(({signOut, isAuth}) => {
    const onClickSignOut = async () => {
      await signOut();
    }
    return (
      <Fragment>
        {isAuth ?
          <Nav className="ml-auto">
            <Nav.Link className="nav-link" as={Link} to="/signin" onClick={onClickSignOut}>
              Sign Out</Nav.Link>
          </Nav>:
          <Nav className="ml-auto">
            <Nav.Link className="nav-link" as={Link} to="/signin">
              Sign In</Nav.Link>
            <Nav.Link className="nav-link" as={Link} to="/signup">
              Sign Up</Nav.Link>
          </Nav>}
      </Fragment>
    );
  });


const AboutMenu = () => {
  return (
    <NavDropdown title={"About" } id="about-dropdown">
      <NavDropdown.Item as={Link} to="/home">Greeting</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/summary">Summary</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/history">History</NavDropdown.Item>
    </NavDropdown>
  )
}

const MemebershipMenu = () => {
  return (
    <NavDropdown title="Members " id="member-dropdown">
      <NavDropdown.Item as={Link} to="/howtojoin">Membership</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/member">Members</NavDropdown.Item>
    </NavDropdown>
  );
}

const BoardsMenu = memo(({isAuth}) => {
  const [badgeData, setBadgeData] = useState({MEETING: false, NOTICE:false, EVENT: false, DISCUSSION: false });
  useEffect(()=> {
    const fetchBadgeData = async () => {
      try{
        let {data:{type}} = await axios.post(`http://localhost:4000/post/getNew`, { days: BADGE_MARK_DAYS });
        setBadgeData({
          [BOARD_TYPE.MEETING.NAME]: type.includes(BOARD_TYPE.MEETING.NAME),
          [BOARD_TYPE.NOTICE.NAME]: type.includes(BOARD_TYPE.NOTICE.NAME),
          [BOARD_TYPE.EVENT.NAME]: type.includes(BOARD_TYPE.EVENT.NAME),
          [BOARD_TYPE.DISCUSSION.NAME]: type.includes(BOARD_TYPE.DISCUSSION.NAME)});
      } catch(err) {
        console.log(err.message);
      }
    }

    if(isAuth) {
      fetchBadgeData();
    } else {
      setBadgeData({
        MEETING: false, 
        NOTICE:false, 
        EVENT: false, 
        DISCUSSION: false });
    }
  }, [isAuth]);
  return (
    <NavDropdown title={["Boards ", (badgeData.MEETING||badgeData.NOTICE||badgeData.EVENT||badgeData.DISCUSSION)&&<Badge key="new" variant="danger">N</Badge>]} id="board-dropdown">
      <NavDropdown.Item as={Link} to="/meeting">{"Meetings "}{badgeData.MEETING&&<Badge variant="danger">N</Badge>}</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/notice">{"Notices "}{badgeData.NOTICE&&<Badge variant="danger">N</Badge>}</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/event">{"Events "}{badgeData.EVENT&&<Badge variant="danger">N</Badge>}</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/Discussion">{"Discussion "}{badgeData.DISCUSSION&&<Badge variant="danger">N</Badge>}</NavDropdown.Item>
    </NavDropdown>
  );
});

const LinksMenu = () => {
  return (
    <NavDropdown title="Links " id="link-dropdown">
      <NavDropdown.Item href="https://recyclebc.ca/">Recycle BC</NavDropdown.Item>
      <NavDropdown.Item href="https://www.return-it.ca/">ENCORP: Return It</NavDropdown.Item>
      <NavDropdown.Item href="https://www.electrorecycle.ca/">Electro Recycle</NavDropdown.Item>
    </NavDropdown>
  );
}

const Header = memo(({signOut, isAuth, history}) => {
  return (
    <Navbar collapseOnSelect expand="sm" bg="light" variant="light" >
      <Navbar.Brand as={Link} to="home" >
        <Image className="d-inline-block align-center"
          src={karmaLogo}
          height="25px"
          width="30px"
          bg="" />
        {'  KARMA'}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <AboutMenu />
          <MemebershipMenu />
          <BoardsMenu isAuth={isAuth} />
          <LinksMenu />
        </Nav>
        <AuthMenu signOut={signOut} isAuth={isAuth} history={history} />
      </Navbar.Collapse>
    </Navbar>
  );
});

const mapStateToProps = (state) => {
  console.log(state)
  return {
    isAuth: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps, actions)(Header);