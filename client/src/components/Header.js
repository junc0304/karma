import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/karma_logo.jpg';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        this.props.signOut();
        if (!this.props.errorMessage) {
            this.props.history.push('/home');
          }
    }
    render() {
        return (
            <nav className="navbar navbar-expand-md bg-light navbar-light sticky-top " id="header">
                <Link className="navbar-brand" to="/home" id="karmaBrand"  >
                    <nav className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <img height="30px" src={logo} alt="bg" />
                        KARMA
                    </nav>
                </Link>
            <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#responsive-navbar-nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    aria-controls="responsive-navbar-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="responsive-navbar-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="navbarDropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                About
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/Greeting" >Greeting</Link>
                                <Link className="dropdown-item" to="/Download" >Summary</Link>
                                <Link className="dropdown-item" to="/about/history" >History</Link>
                                <Link className="dropdown-item" to="/QA" >Hierarchy</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="navbarDropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                Membership
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/membership/conditions" >Conditions</Link>
                                <Link className="dropdown-item" to="#">ActiveMembers</Link>
                            </div>
                        </li>
                        {/*  <Link className="nav-link" to="/about"  >About</Link>*/}
                        <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="navbarDropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">Boards</Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/board/Notice"  >Notices</Link>
                                <Link className="dropdown-item" to="/board/Meeting" >Meetings</Link>
                                <Link className="dropdown-item" to="/board/Event" >Events</Link>
                                <Link className="dropdown-item" to="/" >FreeChat</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="navbarDropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">Links</Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="https://recyclebc.ca/">Recycle BC</a>
                                <a className="dropdown-item" href="https://www.return-it.ca/">ENCORP Return It</a>
                                <a className="dropdown-item" href="https://www.electrorecycle.ca/">Electro Recycle</a>
                            </div>
                        </li>

                    </ul>
                    {this.props.isAuth ?
                        <ul className="navbar-nav">
                            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                                <Link className="nav-link" to="/signout" onClick={this.signOut}>Sign Out</Link>
                            </li>
                        </ul> :
                        <ul className="navbar-nav">
                            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                                <Link className="nav-link" to="/signin">Sign In</Link>
                            </li>
                            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                                <Link className="nav-link" to="/signup">Sign Up</Link>
                            </li>
                        </ul>}

                </div>
            </nav>
        );
    }
}
function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps, actions)(Header);