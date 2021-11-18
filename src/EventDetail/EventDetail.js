import React, { Component } from 'react'
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import '../assets/css/general.css'
import API from '../utils/API'
import tokenPayload from '../services/token-payload'
import EventService from '../services/event.service'
import './EventDetail.css'

class EventDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      event: {
        _id: this.props.match.params.eventId
      },
      isLoading: false,
      error: null
    }

    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  async componentDidMount () {
    try {
      this.setState({ isLoading: true })
      const res = await API.get(`/events/${this.state.event._id}`)
      if (res.status !== 200) {
        throw new Error(res.data.message)
      }
      this.setState({ event: res.data, isLoading: false })
    } catch (err) {
      this.setState({ error: err, isLoading: false })
    }
  }

  async onDeleteClick () {
    this.setState({
      isLoading: true
    })
    try {
      await EventService.deleteEvent(this.state.event._id)
      this.setState({
        isLoading: false
      })
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
    const { event, isLoading, error } = this.state
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
      const isDisable = new Date(event.start_time) < new Date()
      let classFooter = ''
      let isCreator = true
      const payload = tokenPayload()
      if (
        !Object.keys(payload).length ||
        payload._id !== this.state.event.creator
      ) {
        classFooter += 'd-none'
        isCreator = false
      }

      pageContent = (
        <Card className='event-detail-card'>
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
                <p className='detail-entry'>
                  <b>Club or Organization:</b>
                  <ul style={{textAlign:"right", listStyleType:"none"}}>
                  {event.clubs && event.clubs.map(club => <li className="" key={club.name}>{club.name}</li>)}
                  </ul>
                  

                </p>
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
              onClick={this.handleDeleteClick}
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
}

export default EventDetail
