import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getEventsAction, setGetEventsLoading } from '../actions';
import { NavLink } from 'react-router-dom'
import { Button, Col, Card, Spinner } from 'react-bootstrap'
import './EventList.css'
import '../assets/css/general.css'

function EventList () {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.stateData);
	const { events, loadEventsError, loadEventsLoading } = data;

  useEffect(() => {
    dispatch(setGetEventsLoading())
    dispatch(getEventsAction())
  }, [dispatch])
  
  if (loadEventsError) {
    return (
      <div className='Loading d-flex flex-column'>
        <h1>Something Went Wrong!</h1>
        <iframe src="https://giphy.com/embed/TpkhbFd6ap0pq" width="480" height="360" frameBorder="0" title="Error-gif" allowFullScreen></iframe>
        <p>{loadEventsError}</p>
      </div>
    )
  }
  const loading = (
    <div className='Loading'>
      <Spinner animation='border' role='status' variant='primary'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  )
  const eventsList = (
    <div className='events-container'>
      {
        events && events.map((event) => {
          const isDisable = new Date(event.start_time) < new Date()
          return (
            <Col
              key={`event-${event._id}`}
              lg={4}
              md={6}
              sm={8}
              xs={9}
              className='event mx-auto my-5'
            >
              <Card className='border-0 event-card shadow text-center'>
                <NavLink className='p-0' to={`/events/${event._id}`}>
                  <Card.Header className='text-dark'>{event.name}</Card.Header>
                  <Card.Body>
                    <Card.Img
                      src={event.flyer_img_url}
                      className='event-card-img'
                    />
                    <span className='img-time'> {new Date(event.end_time).toLocaleString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                    </span>
                  </Card.Body>
                </NavLink>
                <Card.Footer>
                  <Button
                    className='w-100 event-card-button'
                    disabled={isDisable}
                  >
                    {isDisable ? 'Event has Passed' : 'RSVP'}
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          )
        })
      }
    </div>
  )

  return <div className='EventList'>{loadEventsLoading ? loading : eventsList}</div>
}

export default EventList
