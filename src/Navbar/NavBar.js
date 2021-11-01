import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import logo from '../Logo.png';
import '../assets/css/general.css';

import AuthService from '../services/auth.service';

function NavBar(props) {
  const authentificatedButtons = (
    <Nav fixed="top" className="ms-auto">
      <Nav.Link href="#" onClick={() => props.setModalCreateEvent(true)}>
        <Button variant="outline-primary">Create Event</Button>
      </Nav.Link>
      <Nav.Link
        href="#"
        onClick={() => {
          props.setAuthentification(false);
          AuthService.logout();
        }}
      >
        <Button variant="outline-primary">Logout</Button>
      </Nav.Link>
    </Nav>
  );
  const unauthentificatedButtons = (
    <Nav className="ms-auto">
      <Nav.Link
        href="#"
        onClick={() => {
          props.setModalLogin(true);
        }}
      >
        <Button variant="outline-primary">Admin Login</Button>
      </Nav.Link>
    </Nav>
  );
  return (
    <Navbar className="NavBar shadow-sm">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="120"
            height="60"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {props.authentification
            ? authentificatedButtons
            : unauthentificatedButtons}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
