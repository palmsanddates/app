import React, { Component } from 'react'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'

import AuthService from '../services/auth.service'
import '../assets/css/general.css'

class LogIn extends Component {
  constructor (props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      error: ''
    }
  }

  onChangeEmail (e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword (e) {
    this.setState({
      password: e.target.value
    })
  }

  async handleLogin (e) {
    e.preventDefault()

    this.setState({
      isLoading: true
    })

    try {
      await AuthService.login(this.state.email, this.state.password)
      this.props.setAuthentification(true)
      this.props.onHide()
    } catch (err) {
      const resMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()

      this.setState({
        isLoading: false,
        error: resMessage
      })
    }
  }

  render () {
    let buttonContent

    if (this.state.isLoading) {
      buttonContent = (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )
    } else {
      buttonContent = <span>Login</span>
    }
    return (
      <Modal
        {...this.props}
        size='sm'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Admin Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='example@dominican.edu'
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            type='button'
            disabled={this.state.isLoading}
            onClick={this.handleLogin}
          >
            {buttonContent}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default LogIn
