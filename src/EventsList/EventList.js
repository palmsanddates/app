import React from 'react'
import { NavLink } from 'react-router-dom'
import data from '../data.json'
import { Col, Card } from 'react-bootstrap'
import '../assets/css/general.css'

function EventList () {
  const event = data.map(({ id, event_flyer, event_name, date, location, description }) => {
    return (
      <Col key={`event-${id}`} md={6} className='mx-auto mt-5'>
        <NavLink className='nav-link' to={`/eventDetails/${id}`}>
          <Card>
            <Card.Img variant='top' src='https://www.dominican.edu/sites/default/files/styles/width_1160/public/2020-01/caleuega-dining-hero.jpg?itok=cuezDcoB://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg' />
            <Card.Body>
              <Card.Text>
                {event_name}
              </Card.Text>
            </Card.Body>
          </Card>
        </NavLink>
      </Col>
    )
  })
  return (
    <div className='EventList'>
      {event}
    </div>
  )
}

export default EventList
