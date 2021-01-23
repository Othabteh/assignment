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
    <Modal style={{ textAlign: 'center', margin: '50px' }} {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'blue', fontSize: '25px', fontWeight: 'bold' }} id='contained-modal-title-vcenter'>
          Signin
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formBasicUsername'>
            <Form.Label style={{ color: 'blue', fontSize: '25px', fontWeight: 'bold', textAlign: 'center', marginRight: '50px' }}>Username</Form.Label>
            <Form.Control style={{ color: 'blue', fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }} onChange={handleChange} name='username' type='text' placeholder='Enter username' />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label style={{ color: 'blue', fontSize: '25px', fontWeight: 'bold', textAlign: 'center', marginRight: '50px' }}>Password</Form.Label>
            <Form.Control style={{ color: 'blue', fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }} onChange={handleChange} name='password' type='password' placeholder='Password' />
          </Form.Group>
        </Form>
      </Modal.Body>
      <If condition={contextType.error}>
        <Alert style={{ color: 'red', fontSize: '20px' }} variant='danger'>
          Wrong username or password
        </Alert>
      </If>
      <Modal.Footer>
        <Button style={{ backgroundColor: 'blue', color: 'white', fontSize: '20px', padding: '10px' }} variant='info' className='btnAdd' onClick={handleSubmit}>
          Signin
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Login;
