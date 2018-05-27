import styled from 'react-emotion';

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
  margin: 0 1rem;
  color: rgb(42, 81, 211);
  font-size: 0.8rem;
`;

export default () => (
  <Nav>
    <NavMenu>
      <NavMenuItem>Home</NavMenuItem>
      <NavMenuItem>What is worship</NavMenuItem>
      <NavMenuItem>Worship directory</NavMenuItem>
      <NavMenuItem>Worship aids</NavMenuItem>
      <NavMenuItem>Useful links</NavMenuItem>
    </NavMenu>
  </Nav>
);
