import './styles.scss';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
export default function Footer() {
  return (
    <>
      {/* <Navbar expand='sm' variant='light' bg='bg-transparent' className='footer'> */}

      <Container className='footer-container' fluid>
        <Container style={{ width: '85%', alignItems: 'baseline', backgroundcolor: '#e1e3e8' }}>
          <Row style={{ alignItems: 'baseline', justifyContent: 'center' }}>
            <Col xs={12} sm={12} md={6}>
              <Row className='first-row'>
                <Nav.Link>
                  <NavLink>Home </NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink>About</NavLink>
                </Nav.Link>
                <Nav.Link to='/about'>
                  <NavLink to='/about'>About</NavLink>
                </Nav.Link>
              </Row>
            </Col>
            <Col xs={12} md={6} className='sec-row'>
              <Navbar.Text className='footer-text'>© Jobify | 2020 All rights reserved.</Navbar.Text>
            </Col>
          </Row>
        </Container>
      </Container>
      {/* </Navbar> */}
    </>
  );
}
