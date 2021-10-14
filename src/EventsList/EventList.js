import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import axios from 'axios';

import '../assets/css/general.css';
class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      isLoading: false,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const res = await axios.get('http://localhost:5000/events');
      if (res.status !== 200) {
        throw new Error(res.data.message);
      }
      this.setState({ events: res.data, isLoading: false });
    } catch (err) {
      this.setState({ error: err, isLoading: false });
    }
  }

  render() {
    const { events, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className="EventList">
        {events.map((event) => (
          <Col key={`event-${event._id}`} md={6} className="mx-auto mt-5">
            <NavLink className="nav-link" to={`/events/${event._id}`}>
              <Card>
                <Card.Img variant="top" src={event.flyer_img_url} />
                <Card.Body>
                  <Card.Text>{event.name}</Card.Text>
                </Card.Body>
              </Card>
            </NavLink>
          </Col>
        ))}
      </div>
    );
  }
}

export default EventList;
