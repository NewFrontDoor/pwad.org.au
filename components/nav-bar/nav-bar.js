import React from 'react';
import styled from 'react-emotion';
import Link from 'mineral-ui/Link';
import NextLink from 'next/link';

const Nav = styled.nav`
  margin: 0 auto;
  padding: 15vh 0;
  width: 75vw;
`;

const NavMenu = styled.ul`
  letter-spacing: 1px;
  text-transform: uppercase;
  list-style: none;
  display: flex;
  margin: 0;
`;

const NavMenuItem = styled.li`
  &:nth-last-child(2) {
    margin-left: auto;
  }
`;

export default () => (
  <Nav>
    <NavMenu>
      <NavMenuItem>
        <Link href="/" element={NextLink}>
          Home
        </Link>
      </NavMenuItem>
      <NavMenuItem>
        <Link href="/" element={NextLink}>
          What is worship?
        </Link>
      </NavMenuItem>
      <NavMenuItem>
        <Link href="/" element={NextLink}>
          Worship directory
        </Link>
      </NavMenuItem>
      <NavMenuItem>
        <Link href="/" element={NextLink}>
          Worship aids
        </Link>
      </NavMenuItem>
      <NavMenuItem>
        <Link href="/" element={NextLink}>
          Useful links
        </Link>
      </NavMenuItem>
      <NavMenuItem>
        <Link href="/" element={NextLink}>
          Log in
        </Link>
      </NavMenuItem>
      <NavMenuItem>
        <Link href="/" element={NextLink}>
          Create account
        </Link>
      </NavMenuItem>
    </NavMenu>
  </Nav>
);
