import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Col, Card, Spinner } from 'react-bootstrap'
import API from '../utils/API'
import './EventList.css'
import '../assets/css/general.css'

function EventList () {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [error, setError] = useState(false)
  useEffect(() => {
    API.get('/events')
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.data.message)
        }
        res.data.sort(
          (a, b) => new Date(b.start_time) - new Date(a.start_time)
        )
        setEvents(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err)
      })
  }, [])

  if (error) {
    return (
      <div className='Loading'>
        <h1>Error</h1>
        <p>{error.message}</p>
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
        events.map((event) => {
          const isDisable = new Date(event.start_time) < new Date()
          return (
            <Col
              key={`event-${event._id}`}
              lg={5}
              md={7}
              sm={10}
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

  return <div className='EventList'>{isLoading ? loading : eventsList}</div>
}

export default EventList
