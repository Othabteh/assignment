import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { If } from 'react-if';

function Login(props) {
  const contextType = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    contextType.login(username, password);
  };

  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Signin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formBasicUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={handleChange} name='username' type='text' placeholder='Enter username' />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange} name='password' type='password' placeholder='Password' />
          </Form.Group>
        </Form>
      </Modal.Body>
      <If condition={contextType.error}>
        <Alert variant='danger'>Wrong username or password</Alert>
      </If>
      <Modal.Footer>
        <Button variant='info' className='btnAdd' onClick={handleSubmit}>
          Signin
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Login;
