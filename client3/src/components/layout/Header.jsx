import React, { Fragment, memo, useEffect } from 'react';
import { Nav, Navbar, NavDropdown, Image, Badge } from 'react-bootstrap';
import karmaLogo from '../images/karma_logo.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { SettingsIcon } from '../icons';

import './Header.css';

const Header = memo(({ signOut, isAuth, history, headerData, getHeaderData }) => {

  useEffect(() => {
    const getHeader = async () => {
      await getHeaderData(5);
    }
    isAuth && getHeader();
  }, [isAuth, getHeaderData]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" >
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
          <BoardsMenu isAuth={isAuth} recentData={headerData} />
          <LinksMenu />
        </Nav>
        <AuthMenu signOut={signOut} isAuth={isAuth} history={history} />
      </Navbar.Collapse>
    </Navbar>
  );
});

const AuthMenu = memo(({ signOut, isAuth }) => {
  const onClickSignOut = async () => {
    await signOut();
  }
  return (
    <Fragment>
      {isAuth ?
        <Nav className="ml-auto">
          <Nav.Link className="nav-link" href="#sign-out" as={Link} href="#" active={false} to="/signin" onClick={onClickSignOut}>
            Sign Out</Nav.Link>
          <Nav.Link className="nav-link" as={Link} href="#" active={false} to="/profile">
            Setting
          {/* <SettingsIcon style={{alignItem:"center", fontSize:"30px"}} /> */}
          </Nav.Link>
        </Nav> :
        <Nav className="ml-auto">
          <Nav.Link className="nav-link" as={Link} href="#" active={false} to="/signin">
            Sign In</Nav.Link>
          <Nav.Link className="nav-link" as={Link} href="#" active={false} to="/signup">
            Sign Up</Nav.Link>
        </Nav>}
    </Fragment>
  );
});

const AboutMenu = () => {
  return (
    <NavDropdown title={"About"} id="about-dropdown">
      <NavDropdown.Item as={Link} href="#" active={false} to="/home">Greeting</NavDropdown.Item>
      <NavDropdown.Item as={Link} href="#" active={false} to="/summary">Summary</NavDropdown.Item>
      <NavDropdown.Item as={Link} href="#" active={false} to="/history">History</NavDropdown.Item>
    </NavDropdown>
  )
}

const MemebershipMenu = () => {
  return (
    <NavDropdown
      title="Members "
      id="member-dropdown">
      <NavDropdown.Item
        as={Link}
        to="/howtojoin"
        href="#" active={false}
      >Membership
      </NavDropdown.Item>
      <NavDropdown.Item
        as={Link}
        to="/member"
        href="#" active={false}
      >Members
      </NavDropdown.Item>
    </NavDropdown>
  );
}

const BoardsMenu = memo(({ isAuth, recentData }) => {
  let { newEvent, newNotice, newMeeting, newDiscussion } = recentData;
  let showNewItems = (newDiscussion || newNotice || newEvent || newMeeting) && isAuth;
  return (
    <NavDropdown
      id="board-dropdown"
      title={[
        "Boards ",
        showNewItems && <Badge key="new" variant="danger">N</Badge>
      ]}
    >
      <NavDropdown.Item as={Link} href="#" active={false} to="/meeting">
        {"Meetings "}
        {showNewItems && newMeeting && <Badge variant="danger">N</Badge>}
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} href="#" active={false} to="/notice">
        {"Notices "}
        {showNewItems && newNotice && <Badge variant="danger">N</Badge>}
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} href="#" active={false} to="/event">
        {"Events "}
        {showNewItems && newEvent && <Badge variant="danger">N</Badge>}
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} href="#" active={false} to="/Discussion">
        {"Discussion "}
        {showNewItems && newDiscussion && <Badge variant="danger">N</Badge>}
      </NavDropdown.Item>
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

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
    headerData: state.header
  };
}

export default connect(mapStateToProps, actions)(Header);