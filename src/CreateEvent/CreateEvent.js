import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createEventAction, setGetEventsLoading } from '../actions';
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import Multiselect from 'multiselect-react-dropdown';
import API from '../utils/API';
import '../assets/css/general.css'
import './CreateEvent.css'
import { setToInvalid, setToValid, setDeaultValue } from '../utils/MultiselectValidate';

function CreateEvent (props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.stateData);
	const { createEventError } = data;
  const [error, setError] = useState('');
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
    setValidated(false)
  }
  useEffect(() => {
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
    setValidated(false)
  }, [props.show])
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
    if(document.getElementById('search_input')) {
      if(form.clubs.length === 0) {
        setToInvalid();
      } else {
        setToValid();
      }
    }
    if (e.currentTarget.checkValidity()) {
      setIsLoading(true)
      dispatch(setGetEventsLoading())
      dispatch(createEventAction(form))
      setIsLoading(false)
      props.onHide()
    } 
  }
  if (error) {
    return (
      <div className='Loading d-flex flex-column'>
        <h1>Something Went Wrong!</h1>
        <iframe src="https://giphy.com/embed/TpkhbFd6ap0pq" width="480" height="360" frameBorder="0" title="Error-gif" allowFullScreen></iframe>
        <p>{error.message}</p>
      </div>
    )
  }
  return(
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {createEventError && <Alert variant="danger">{createEventError}</Alert>}
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-flex flex-column">
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
          <Form.Group controlId="search_input">
            <Form.Label>Clubs</Form.Label>
            <Multiselect
              options={clubs} 
              selectedValues={form.clubs} 
              displayValue='name'
              placeholder='Select clubs or organizations'
              onSelect={(selected) => {
                setForm({...form, clubs: selected})
                setValidated(false)
                setDeaultValue()
              }}
              onRemove={(removed) => {
                setForm({...form, clubs: removed})
                setValidated(false) 
                setDeaultValue()
              }}
              selectionLimit={3}
              closeOnSelect={true}
              />
            <Form.Control.Feedback type="invalid" id="valid-club">
              This field is required.</Form.Control.Feedback> </Form.Group> 
          <Button variant="primary" type="submit" className="mt-3 ms-auto" disabled={isLoading}>
            {isLoading ? 'Creating Event...' : 'Create'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateEvent
