import React from 'react';
import { Navbar } from "react-bootstrap";
import './Footer.css';

const style = {
  position: "sticky",
  top: "100%",
  bottom: "0px"
}

const Footer = () => {
  return (
    <Navbar bg="light" variant="light" style={style}>
      <Navbar.Text>Copyright © 2018 KARMA. All Rights Reserved.</Navbar.Text>
    </Navbar>
  )
}

export default Footer;