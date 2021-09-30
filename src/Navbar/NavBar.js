import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../Logo.png'
import './NavBar.css';

function NavBar(props) {
    return (
        <Navbar className="NavBar">
        <Container>
          <Navbar.Brand href="/"><img
        src={logo}
        width="60"
        height="30"
        className="d-inline-block align-top"
        alt="logo"
      /></Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#" onClick={()=>{ props.setModalCreateEvent(true)}}>Create Event</Nav.Link>
              <Nav.Link href="#" onClick={()=>{ props.setModalLogin(true)}}>Log In</Nav.Link>
              <Nav.Link href="#">Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavBar
