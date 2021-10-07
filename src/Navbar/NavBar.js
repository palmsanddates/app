import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../Logo.png'
import '../assets/css/general.css'

function NavBar (props) {
  const authentificatedButtons = (
    <Nav className='ms-auto'>
      <Nav.Link href='#' onClick={() => props.setModalCreateEvent(true)}>CREATE EVENT</Nav.Link>
      <Nav.Link href='#' onClick={() => props.setAuthentification(false)}>LOG OUT</Nav.Link>
    </Nav>
  )
  const unauthentificatedButtons = (
    <Nav className='ms-auto'>
      <Nav.Link href='#' onClick={() => { props.setModalLogin(true) }}>ADMIN LOG IN</Nav.Link>
    </Nav>
  )
  return (
    <Navbar className='NavBar'>
      <Container>
        <Navbar.Brand href='/'><img
          src={logo}
          width='60'
          height='30'
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
