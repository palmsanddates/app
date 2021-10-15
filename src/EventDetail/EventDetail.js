import React, { Component } from 'react';
import { Col, Card, Button, Spinner } from 'react-bootstrap';
import '../assets/css/general.css';
import API from '../utils/API';
import tokenPayload from '../services/token-payload';
import EventService from '../services/event.service';

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

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const res = await API.get(`/events/${this.state.event._id}`);
      if (res.status !== 200) {
        throw new Error(res.data.message);
      }
      this.setState({ event: res.data, isLoading: false });
    } catch (err) {
      this.setState({ error: err, isLoading: false });
    }
  }

  async onDeleteClick() {
    this.setState({
      isLoading: true,
    });
    try {
      await EventService.deleteEvent(this.state.event._id);
      this.setState({
        isLoading: false,
      });
    } catch (err) {
      const resMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      this.setState({
        isLoading: false,
        error: resMessage,
      });
    }
  }

  render() {
    const { event, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    let pageContent;

    if (isLoading) {
      pageContent = (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    } else {
      let classFooter = '';
      const payload = tokenPayload();

      if (
        !Object.keys(payload).length ||
        payload._id !== this.state.event.creator
      ) {
        classFooter += 'd-none';
      }

      pageContent = (
        <Card>
          <Card.Img variant="top" src={event.flyer_img_url} />
          <Card.Body>
            <Card.Text>{event.name}</Card.Text>
            <Card.Text>{event.location}</Card.Text>
            <Card.Text>{event.start_time}</Card.Text>
            <Card.Text>{event.end_time}</Card.Text>
          </Card.Body>
          <Card.Footer className={classFooter}>
            <Button variant="outline-danger" onClick={this.onDeleteClick}>
              Delete
            </Button>
            {/* <Button variant="outline-warning">Update</Button> */}
          </Card.Footer>
        </Card>
      );
    }

    return (
      <div className="EventDetails">
        <Col md={6} className="mx-auto mt-5">
          {pageContent}
        </Col>
      </div>
    );
  }
}

export default EventDetail;
