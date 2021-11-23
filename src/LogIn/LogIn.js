import React, { Component } from 'react'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'

import AuthService from '../services/auth.service'
import '../assets/css/general.css'

class LogIn extends Component {
  constructor (props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      error: ''
    }
  }

  handleChangeEmail (e) {
    this.setState({
      email: e.target.value
    })
  }

  handleChangePassword (e) {
    this.setState({
      password: e.target.value
    })
  }

  handleKeyPress (e) {
    if (e.keyCode === 13) {
      this.handleLogin(e)
    }
  }

  async handleLogin (e) {
    e.preventDefault()

    this.setState({
      isLoading: true
    })

    try {
      await AuthService.login(this.state.email, this.state.password)
      this.props.setauthentification(true)
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
    let isDisable = true
    if (this.state.email !== '' && this.state.password !== '') {
      isDisable = false
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
          <Form onKeyDown={this.handleKeyPress}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='example@dominican.edu'
                value={this.state.email}
                onChange={this.handleChangeEmail}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={this.state.password}
                onChange={this.handleChangePassword}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            type='button'
            disabled={isDisable}
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
