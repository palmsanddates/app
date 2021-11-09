import React, { Component } from 'react'
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import '../assets/css/general.css'
import API from '../utils/API'
import tokenPayload from '../services/token-payload'
import EventService from '../services/event.service'
import './EventDetails.css'

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
      let classFooter = ''
      const payload = tokenPayload()

      if (
        !Object.keys(payload).length ||
        payload._id !== this.state.event.creator
      ) {
        classFooter += 'd-none'
      }

      pageContent = (
        <Card className='event-detail-card'>
          <Card.Img
            variant='top'
            src={event.flyer_img_url}
            className='event-detail-card-img'
          />
          <Card.Body>
            <Row>
              <Col>
                <p>
                  <b>Name:</b>
                </p>
                <p>{event.name}</p>
                <p>
                  <b>Location:</b>
                </p>
                <p>{event.location}</p>
              </Col>
              <Col>
                <p>
                  <b>Start Time:</b>
                </p>
                <p>{event.start_time}</p>
                <p>
                  <b>End Time:</b>
                </p>
                <p>{event.end_time}</p>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Button variant='primary'>RSVP</Button>
            <Button
              variant='outline-danger'
              onClick={this.onDeleteClick}
              className={`${classFooter} mx-2`}
            >
              Delete
            </Button>
            {/* <Button variant="outline-warning">Update</Button> */}
          </Card.Footer>
        </Card>
      )
    }

    return (
      <Container>
        <Row className='justify-content-center py-4'>
          <Col md={6}>{pageContent}</Col>
        </Row>
      </Container>
    )
  }
}

export default EventDetail
