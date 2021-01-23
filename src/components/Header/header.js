import React, { useState, useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Signin from '../regestration/login';
import Signup from '../regestration/signup';
import { If, Else, Then } from 'react-if';
import { AuthContext } from '../../context/auth';

function Header() {
  const contextType = useContext(AuthContext);
  const [signinShow, setSigninShow] = useState(false);
  const [signupShow, setSignupShow] = useState(false);

  if (!contextType.error && contextType.loggedIn && signinShow) {
    setSigninShow(false);
  }

  if (!contextType.error && contextType.loggedIn && signupShow) {
    setSignupShow(false);
  }

  return (
    <Navbar className='nav' variant='dark'>
      <Nav className='mr-auto'>
        <Nav.Link href='' style={{ color: '#eeeeee' }}>
          Home
        </Nav.Link>
      </Nav>
      <If condition={contextType.loggedIn}>
        <Then>
          <Button variant='outline-info' onClick={contextType.logout}>
            Logout
          </Button>
        </Then>
        <Else>
          <Button style={{ marginRight: '10px' }} variant='outline-info' onClick={() => setSigninShow(true)}>
            Signin
          </Button>

          <Button className={'.text-danger'} variant='outline-danger' onClick={() => setSignupShow(true)}>
            Signup
          </Button>
        </Else>
      </If>
      <Signin
        show={signinShow}
        onHide={() => {
          setSigninShow(false);
          contextType.setError(false);
        }}
      />
      <Signup
        show={signupShow}
        onHide={() => {
          setSignupShow(false);
          contextType.setError(false);
        }}
      />
    </Navbar>
  );
}

export default Header;
