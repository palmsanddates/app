import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Col, Card, Spinner } from 'react-bootstrap';
import API from '../utils/API';
import './EventList.css';
import '../assets/css/general.css';

function EventList(){
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    API.get('/events').then(res => {
      if (res.status !== 200) {
        throw new Error(res.data.message)
      }
      const sortedEvent = res.data.sort(function(a,b){
        return new Date(b.start_time) - new Date(a.start_time);
      });
      setEvents(sortedEvent);
      setIsLoading(false);
    }).catch(err => {
      setError(err);
    });
  }, [events]);

  if (error) {
    return <div className="Loading">
        <h1>Error</h1>
        <p>{error.message}</p>
    </div>;
  }
    const loading = (
      <div className="Loading">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
    const eventsList = (
      <Container>
          {events.map((event) => {
            const isDisable = new Date(event.start_time) < new Date() ? true : false;
            return (
                  <Col
                key={`event-${event._id}`}
                lg={5}
                md={7}
                sm={10}
                className="event mx-auto my-5">
                <Card className="border-0 event-card shadow text-center rounded-3">
                  <NavLink className="p-0" to={`/events/${event._id}`}>
                    <Card.Body>
                        <Card.Img
                          src={event.flyer_img_url}
                          className="event-card-img rounded-3"
                        />
                    </Card.Body>
                  </NavLink>
                  <Card.Footer>
                    <Button className="w-100 event-card-button" disabled={isDisable}>{isDisable ? "Event has Passed" : "RSVP"}</Button>
                  </Card.Footer>
                </Card>
              </Col> );})}
      </Container>
    );

    return (
      <div className="EventList">
        {isLoading ? loading : eventsList}      
      </div>
    );
}

export default EventList
