import React, { Component } from 'react'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'

import EventService from '../services/event.service'
import '../assets/css/general.css'

class CreateEvent extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEventParam = this.handleEventParam.bind(this)
    this.handleEventFlyer = this.handleEventFlyer.bind(this)
    this.state = {
      name: null,
      description: null,
      location: null,
      start_time: null,
      end_time: null,
      flyer_img: null,
      rsvp_url: null,
      clubs: [],
      isLoading: false,
      error: '',
      validated: false
    }
  }

  handleEventParam (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleEventFlyer (event) {
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]

    reader.onloadend = () => {
      this.setState({
        flyer_img: reader.result
      })
    }

    reader.readAsDataURL(file)
  }

  async handleSubmit (e) {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    this.setState({
      validated: true, isLoading: true
    })
    try {
      await EventService.createEvent({
        name: this.state.name,
        description: this.state.description,
        location: this.state.location,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        flyer_img: this.state.flyer_img
      })
      this.state = {
        name: null,
        description: null,
        location: null,
        start_time: null,
        end_time: null,
        flyer_img: null,
        isLoading: false,
        error: ''
      }
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
      buttonContent = <span>Create</span>
    }

    return (
      <Modal
        {...this.props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Create an Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={this.state.validated}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                placeholder='Event Name'
                type='text'
                name='name'
                minLength={1}
                maxLength={50}
                onChange={this.handleEventParam}
              />
              <Form.Control.Feedback type='invalid'>
                Please enter an event name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                name='description'
                placeholder='Event Description'
                minLength={1}
                maxLength={1000}
                as='textarea'
                onChange={this.handleEventParam}
              />
              <Form.Control.Feedback type='invalid'>
                Please enter an event description
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                placeholder='Event Location'
                type='text'
                name='location'
                minLength={1}
                maxLength={50}
                onChange={this.handleEventParam}
              />
              <Form.Control.Feedback type='invalid'>
                Please enter an event location
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                required
                type='datetime-local'
                name='start_time'
                min={new Date(
                  new Date() - new Date().getTimezoneOffset() * 60 * 1000
                )
                  .toISOString()
                  .substring(0, 16)}
                onChange={this.handleEventParam}
              />
              <Form.Control.Feedback type='invalid'>
                Please enter an event start time
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>End Time</Form.Label>
              <Form.Control
                required
                type='datetime-local'
                name='end_time'
                min={this.state.start_time}
                onChange={this.handleEventParam}
              />
              <Form.Control.Feedback type='invalid'>
                Please enter an event end time
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>RSVP URL</Form.Label>
              <Form.Control
                name='rsvp_url'
                type='url'
                placeholder='https://www.example.com'
                pattern='https://.*'
                size='30'
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a valid RSVP URL
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='formFile' className='mb-3'>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                required
                type='file'
                name='flyer_img'
                onChange={this.handleEventFlyer}
                accept='.jpg,.jpeg,.png'
              />
              <Form.Control.Feedback type='invalid'>
                Please upload an event image
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Clubs and Organizations</Form.Label>
              <Form.Control required as='select' name='clubs' onChange={this.handleEventParam} value={this.state.clubs} multiple={true}>
                <option value=''>Please select club or organization</option>
                <option value='1'>Barowsky Student Association</option>
                <option value='2'>Global Ambassadors</option>
                <option value='3'>Debate Club</option>
                <option value='3'>Other</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            type='buttton'
            disabled={this.state.isLoading}
            onClick={this.handleSubmit}
          >
            {buttonContent}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
export default CreateEvent
