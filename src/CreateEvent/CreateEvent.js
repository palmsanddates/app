import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import Multiselect from 'multiselect-react-dropdown';
import API from '../utils/API'
import EventService from '../services/event.service'
import '../assets/css/general.css'
import './CreateEvent.css'

function CreateEvent (props) {
  const [form, setForm] = useState({
    name: null,
    description: null,
    location: null,
    start_time: null,
    end_time: null,
    flyer_img: null,
    rsvp_url: null,
    clubs: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [validated, setValidated] = useState(false)
  const [clubs, setClubs] = useState([])
  function handleEventParam (event) {
    if(event.target.name === 'clubs') {
      if(event.target.value !== '') {
        let newClubs = form.clubs
        newClubs.push(event.target.value)
        setForm({
          ...form,
          clubs: newClubs
        })
      }
    }
    else if (event.target.name === 'flyer_img') {
      const reader = new FileReader()
      const file = event.target.files[0]
      reader.onloadend = () => {
        setForm({
          ...form,
          [event.target.name]: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
    else {
      setForm({
        ...form,
        [event.target.name]: event.target.value
      })
    }
  }
  useEffect(() => {
    API.get('/clubs')
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.data.message)
        }
        setClubs(res.data.clubs)
      })
      .catch((err) => {
        setError(err)
      })
  }, []) 
    
  async function handleSubmit (e) {
    e.preventDefault()
    setValidated(true)
    if (e.currentTarget.checkValidity()) {
      setIsLoading(true)
      try {
        await EventService.createEvent(form)
      } catch (err) {
        setError(err.message)
      }
      setIsLoading(false)
      setForm({
        name: null,
        description: null,
        location: null,
        start_time: null,
        end_time: null,
        flyer_img: null,
        rsvp_url: null,
        clubs: [],
        })
    }
  }
<<<<<<< HEAD
  return(
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {error && <Alert variant="danger">{error}</Alert>}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event name"
              name='name'
              minLength={1}
              maxLength={50}
              onChange={handleEventParam}
              required
            />
            <Form.Control.Feedback type="invalid">
              This field is required.   </Form.Control.Feedback>  </Form.Group>   
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              minLength={1}
              maxLength={1000}
              placeholder="Enter event description"
              name="description"
              onChange={handleEventParam}
              required
            />
            <Form.Control.Feedback type="invalid">
               This field is required.   </Form.Control.Feedback>  </Form.Group>
          <Form.Group controlId="formBasicLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event location"
              name="location"
              onChange={handleEventParam}
              minLength={1}
              maxLength={50}
              required
            />
            <Form.Control.Feedback type="invalid">
              This field is required.   </Form.Control.Feedback>  </Form.Group>
          <Form.Group controlId="formBasicStartTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="datetime-local"
              placeholder="Enter event start time"
              name="start_time"
              onChange={handleEventParam}
              min={new Date(
                new Date() - new Date().getTimezoneOffset() * 60 * 1000
              ).toISOString()
              .substring(0, 16)}
              required
            />
            <Form.Control.Feedback type="invalid">
              This field is required.   </Form.Control.Feedback>  </Form.Group>
          <Form.Group controlId="formBasicEndTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              placeholder="Enter event end time"
              name="end_time"
              onChange={handleEventParam}
              min={form.start_time}
              required
            />
            <Form.Control.Feedback type="invalid">
              This field is required.   </Form.Control.Feedback>  </Form.Group>
          <Form.Group controlId="formBasicFlyer">
            <Form.Label>Flyer Image</Form.Label>
            <Form.Control
              name="flyer_img"
              type="file"
              placeholder="Enter event flyer image"
              onChange={handleEventParam}
              accept='.jpg,.jpeg,.png'
              required
            />
            <Form.Control.Feedback type="invalid">
              This field is required.   </Form.Control.Feedback>  </Form.Group>
          <Form.Group controlId="formBasicRsvp">
            <Form.Label>RSVP URL</Form.Label>
            <Form.Control
              type="text"
              name="rsvp_url"
              placeholder='https://www.example.com'
              pattern='https://.*'
              size='30'
              onChange={handleEventParam}
            />
            <Form.Control.Feedback type='invalid'>
              Please enter a valid RSVP URL
            </Form.Control.Feedback></Form.Group>
          <Form.Group controlId="formBasicClubs">
            <Form.Label>Clubs</Form.Label>
            <Multiselect
              required
              options={clubs} 
              selectedValues={form.clubs} 
              displayValue='name'
              placeholder='Select clubs or organizations'
              onSelect={(selected) => setForm({...form, clubs: selected})}
              onRemove={(removed) => setForm({...form, clubs: removed})}
              selectionLimit={3}
=======

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
            Create Event
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
>>>>>>> 04c4dc6bddead919919e212f4b6b6a078c6de316
              />
            <Form.Control.Feedback type="invalid">
              This field is required.   </Form.Control.Feedback>  </Form.Group> 
              
          <Button variant="primary" type="submit" className="mt-3" disabled={isLoading}>
            {isLoading ? 'Creating Event...' : 'Create Event'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateEvent
