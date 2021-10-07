import React from 'react'
import data from '../data.json'
import { Col, Card } from 'react-bootstrap'
import '../assets/css/general.css'

function EventDetails (props) {
  const { id } = props.match.params
  const { event_name, date, location, description } = data[id]
  return (
    <div className='EventDetails'>
      <Col md={6} className='mx-auto mt-5'>
        <Card>
          <Card.Img variant='top' src='https://www.dominican.edu/sites/default/files/styles/width_1160/public/2020-01/caleuega-dining-hero.jpg?itok=cuezDcoB://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg' />
          <Card.Body>
            <Card.Text>
              <p>{event_name}</p>
              <p>{date}</p>
              <p>{location}</p>
              <p>{description}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </div>
  )
}

export default EventDetails
