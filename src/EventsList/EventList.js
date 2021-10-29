import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Container, Col, Card, Spinner } from 'react-bootstrap'
import API from '../utils/API'
import './EventList.css'

import '../assets/css/general.css'
class EventList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      events: [],
      isLoading: false,
      error: null
    }
  }

  async componentDidMount () {
    try {
      this.setState({ isLoading: true })
      const res = await API.get('/events')
      if (res.status !== 200) {
        throw new Error(res.data.message)
      }
      this.setState({ events: res.data, isLoading: false })
    } catch (err) {
      this.setState({ error: err, isLoading: false })
    }
  }

  render () {
    const { events, isLoading, error } = this.state

    if (error) {
      return <p>{error.message}</p>
    }

    let pageContent

    if (isLoading) {
      pageContent = (
        <Spinner animation='border' role='status' variant='primary'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )
    } else {
      pageContent = events.map((event) => (
        <Col
          key={`event-${event._id}`}
          xl={3}
          lg={4}
          md={6}
          sm={8}
          xs={7}
          className='mx-auto my-4'
        >
          <Card className='border-0 event-card shadow text-center rounded-3'>
            <NavLink className='nav-link p-0' to={`/events/${event._id}`}>
              <Card.Img
                variant='top'
                src={event.flyer_img_url}
                className='event-card-img rounded-3'
              />
            </NavLink>
            <Card.Footer>
              <Button className='w-100 event-card-button'>RSVP</Button>
            </Card.Footer>
          </Card>
        </Col>
      ))
    }

    return (
      <div className='EventList'>
        <Container>{pageContent}</Container>
      </div>
    )
  }
}

export default EventList
