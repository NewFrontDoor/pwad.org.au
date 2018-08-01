import React from 'react';
import styled from 'react-emotion';

import NavBar from '../components/nav-bar/nav-bar';
import Home from '../components/home';

const Footer = styled.footer`
  margin: 0 auto;
  padding: 15vh 0;
  width: 75vw;
`;

export default () => (
  <React.Fragment>
    <NavBar/>
    <Home slug="home"/>
    <Footer>
      <hr/>
      © 2007 - 2018 PWAD & the Presbyterian Church of Australia
    </Footer>
  </React.Fragment>
);
