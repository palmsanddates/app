import React, { Component } from 'react';
import { Col, Card } from 'react-bootstrap';
import '../assets/css/general.css';
import axios from 'axios';

class EventDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {
        _id: this.props.match.params.eventId,
      },
      isLoading: false,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const res = await axios.get(
        `http://localhost:5000/events/${this.state.event._id}`
      );
      if (res.status !== 200) {
        throw new Error(res.data.message);
      }
      this.setState({ event: res.data, isLoading: false });
    } catch (err) {
      this.setState({ error: err, isLoading: false });
    }
  }

  render() {
    const { event, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className="EventDetails">
        <Col md={6} className="mx-auto mt-5">
          <Card>
            <Card.Img variant="top" src={event.flyer_img_url} />
            <Card.Body>
              <Card.Text>
                {event.name}
                {/* <p>{event.description}</p> */}
                {/* <p>{event.rsvp_url}</p> */}
              </Card.Text>
              <Card.Text>{event.location}</Card.Text>
              <Card.Text>{event.start_time}</Card.Text>
              <Card.Text>{event.end_time}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </div>
    );
  }
}

export default EventDetail;
