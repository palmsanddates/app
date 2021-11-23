import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { deleteEventAction, setGetEventsLoading } from '../actions';

import { Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import '../assets/css/general.css'
import API from '../utils/API'
import tokenPayload from '../services/token-payload'
import './EventDetail.css'

function EventDetail (props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.stateData);
  const { deleteEventError } = data;
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    API.get(props.match.url)
      .then(res => {
        setEvent(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        setError(err)
        setIsLoading(false)
      })
  }, [props.match.url])

  function handleDeleteClick(){
    setIsLoading(true)
    dispatch(setGetEventsLoading())
    dispatch(deleteEventAction(props.match.params.eventId))
    setIsLoading(false)
    props.history.push('/')
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
  let pageContent
  if (isLoading) {
    pageContent = (
      <div className="d-flex justify-content-center align-items-center" style={{height:"50vh"}}>
        <Spinner animation='border' role='status' variant='primary'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    )
  } else {
    const isDisable = new Date(event.start_time) < new Date()
    let classFooter = ''
    let isCreator = true
    const payload = tokenPayload()
    if (
      !Object.keys(payload).length ||
      payload._id !== event.creator
    ) {
      classFooter += 'd-none'
      isCreator = false
    }

    pageContent = (
      <Card className='event-detail-card'>
        { deleteEventError && <div className='alert alert-danger'>{deleteEventError}</div> }
        <Card.Img
          variant='top'
          src={event.flyer_img_url}
          className='event-detail-card-img'
        />
        <Card.Body className='p-3'>
          <Row className='mx-auto'>
            <Col>
              <b className='center m-4 mb-0'>Event Details</b>
              <hr className='mt-0' />
              <p className='detail-entry'>
                <b>Name:</b> <span>{event.name}</span>
              </p>
              <p className='detail-entry'>
                <b>Location:</b> <span>{event.location}</span>
              </p>
              <p className='detail-entry'>
                <b>Start Time:</b>{' '}
                <span>
                  {new Date(event.start_time).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                  })}
                </span>
              </p>
              <p className='detail-entry'>
                <b>End Time:</b>{' '}
                <span>
                  {new Date(event.end_time).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                  })}
                </span>
              </p>
              <div className='detail-entry'>
                <b>Club or Organization:</b>
                <ul style={{textAlign:"right", listStyleType:"none"}}>
                  {event.clubs && event.clubs.map(club => <li className="" key={club.name}>{club.name}</li>)}
                </ul>
              </div>
              <p className='center pt-2 mb-0'>
                <b>Event Description</b>
              </p>
              <hr className='mt-0' />
              <p className='center'>{event.description}</p>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className='d-flex'>
          {!isCreator &&
            <Button className='w-100' disabled={isDisable} variant='primary'>
              {isDisable ? 'Event has Passed' : 'RSVP'}
            </Button>}

          <Button
            variant='outline-danger'
            onClick={handleDeleteClick}
            className={`${classFooter} ms-auto`}
          >
            Delete
          </Button>
          {/* <Button variant="outline-warning">Update</Button> */}
        </Card.Footer>
      </Card>
    )
  }
  return (
    <div className='detail-container'>
      <Row className='justify-content-center py-4'>
        <Col md={6}>{pageContent}</Col>
      </Row>
    </div>
  )
}

export default EventDetail;
