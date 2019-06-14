import React, { Fragment, memo } from 'react';
import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import karmaLogo from '../images/karma_logo.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const AuthMenu = memo((props) => {
    const signOut = () => {
      props.signOut();
    }
    return (
      <Fragment>
        {props.isAuth ?
          <Nav className="ml-auto">
            <Nav.Link className="nav-link" as={Link} to="/signOut" onClick={signOut()}>
              Sign Out</Nav.Link>
          </Nav>
          :
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
    <NavDropdown title="About" id="about-dropdown">
      <NavDropdown.Item as={Link} to="/home">Greeting</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/summary">Summary</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/history">History</NavDropdown.Item>
    </NavDropdown>
  )
}

const MemebershipMenu = () => {
  return (
    <NavDropdown title="Members" id="member-dropdown">
      <NavDropdown.Item as={Link} to="/howtojoin">Membership</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/memberlist">Members</NavDropdown.Item>
    </NavDropdown>
  );
}

const BoardsMenu = () => {
  return (
    <NavDropdown title="Boards" id="board-dropdown">
      <NavDropdown.Item as={Link} to="/meeting">Meetings</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/notice">Notices</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/event">Events</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/Discussion">Discussion</NavDropdown.Item>
    </NavDropdown>
  );
}

const LinksMenu = () => {
  return (
    <NavDropdown title="Links" id="link-dropdown">
      <NavDropdown.Item href="https://recyclebc.ca/">Recycle BC</NavDropdown.Item>
      <NavDropdown.Item href="https://www.return-it.ca/">ENCORP: Return It</NavDropdown.Item>
      <NavDropdown.Item href="https://www.electrorecycle.ca/">Electro Recycle</NavDropdown.Item>
    </NavDropdown>
  );
}

const Header = memo((props) => {
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
          <BoardsMenu />
          <LinksMenu />
        </Nav>
        <AuthMenu {...props} />
      </Navbar.Collapse>
    </Navbar>
  );
});

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated
  };
}
export default connect(mapStateToProps, actions)(Header);