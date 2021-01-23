import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { If } from 'react-if';

function Signup(props) {
  const context = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    context.signup(username, password);
  };

  return (
    <Modal style={{ textAlign: 'center' }} {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'blue', fontSize: '25px', fontWeight: 'bold', marginBottom: '20px' }} id='contained-modal-title-vcenter'>
          Signup
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ marginTop: '20px' }}>
          <Form.Group controlId='formBasicUsername'>
            <Form.Label style={{ color: 'blue', fontSize: '25px', fontWeight: 'bold', textAlign: 'center', marginRight: '50px' }}>Username</Form.Label>
            <Form.Control style={{ color: 'blue', fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }} onChange={handleChange} name='username' required type='text' placeholder='Enter username' />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label style={{ color: 'blue', fontSize: '25px', fontWeight: 'bold', textAlign: 'center', marginRight: '50px' }}>Password</Form.Label>
            <Form.Control style={{ color: 'blue', fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }} onChange={handleChange} name='password' required type='password' placeholder='Password' />
          </Form.Group>
        </Form>
      </Modal.Body>
      <If condition={context.error}>
        <Alert style={{ color: 'red', fontSize: '20px' }} variant='danger'>
          User already registered
        </Alert>
      </If>
      <Modal.Footer>
        <Button style={{ backgroundColor: 'blue', color: 'white', fontSize: '20px', padding: '10px', marginTop: '20px' }} variant='info' className='btnAdd' onClick={handleSubmit}>
          Signup
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Signup;
