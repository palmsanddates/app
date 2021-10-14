import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../Logo.png'
import '../assets/css/general.css'

import AuthService from '../services/auth.service';

function NavBar (props) {
  const authentificatedButtons = (
    <Nav className='ms-auto'>
      <Nav.Link href='#' onClick={() => props.setModalCreateEvent(true)}>Create Event</Nav.Link>
      <Nav.Link href='#' onClick={() => AuthService.logout()}>Logout</Nav.Link>
    </Nav>
  )
  const unauthentificatedButtons = (
    <Nav className='ms-auto'>
      <Nav.Link href='#' onClick={() => { props.setModalLogin(true) }}>Admin Login</Nav.Link>
    </Nav>
  )
  return (
    <Navbar className='NavBar'>
      <Container>
        <Navbar.Brand href='/'><img
          src={logo}
          width='120'
          height='60'
          className='d-inline-block align-top'
          alt='logo'
                               />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {props.authentification ? authentificatedButtons : unauthentificatedButtons}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
