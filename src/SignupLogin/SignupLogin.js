import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

import AuthService from '../services/auth.service';
import InstitutionService from '../services/institution.service';

function SignupLogin(props) {
  const [isSignup, setIsSignup] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [error, setError] = useState('');

  const [signupForm, setSignForm] = useState({
    name: '',
    email: '',
    institutionId: '',
  });
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const institutionsRes = await InstitutionService.getInstitutions();
      setInstitutions(
        institutionsRes.data.institutions.map((x) => ({
          _id: x._id,
          name: x.name,
        }))
      );
    };

    fetchData();
    setIsLoading(false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignup)
        await AuthService.signup(
          signupForm.name,
          signupForm.email,
          signupForm.institutionId
        );
      else await AuthService.login(loginForm.email, loginForm.password);

      props.setauthentification(true);
      props.onHide();
      setIsLoading(false);
    } catch (err) {
      setError(
        (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString()
      );
      setIsLoading(false);
    }
  }

  function handleChangeForm(e) {
    if (isSignup) {
      setSignForm({
        ...signupForm,
        [e.target.name]: e.target.value,
      });
    } else {
      setLoginForm({
        ...loginForm,
        [e.target.name]: e.target.value,
      });
    }
  }

  function handleKeyPress(e) {
    if (e.keyCode === 13) this.handleSubmit(e);
  }

  let modalContent = (
    <Form onKeyDown={handleKeyPress}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ahmed"
          name="name"
          value={signupForm.name}
          onChange={handleChangeForm}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="example@dominican.edu"
          value={signupForm.email}
          onChange={handleChangeForm}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicSelect">
        <Form.Label>Institution</Form.Label>
        <Form.Select name="institutionId" onChange={handleChangeForm}>
          {institutions &&
            institutions.map((institution) => {
              return (
                <option key={institution._id} value={institution._id}>
                  {institution.name}
                </option>
              );
            })}
        </Form.Select>
      </Form.Group>
    </Form>
  );

  if (!isSignup) {
    modalContent = (
      <Form onKeyDown={handleKeyPress}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="example@dominican.edu"
            value={loginForm.email}
            onChange={handleChangeForm}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={handleChangeForm}
          />
        </Form.Group>
      </Form>
    );
  }

  let isDisabled = true;
  if (isSignup)
    isDisabled = signupForm.email === '' || signupForm.institutionId === '';
  else isDisabled = loginForm.email === '' || loginForm.password === '';

  let buttonContent = isSignup ? <span>Signup</span> : <span>Login</span>;
  if (isLoading) {
    buttonContent = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isSignup ? 'Signup' : 'Login'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          type="button"
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          {buttonContent}
        </Button>
        <Button variant="link" onClick={() => setIsSignup(!isSignup)}>
          Switch to {isSignup ? 'Login' : 'Signup'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignupLogin;
