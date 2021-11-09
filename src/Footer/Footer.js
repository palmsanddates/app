import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer () {
  return (
    <div className='footer py-3'>
      <Container>
        <Row>
          <Col lg={12}>
            <div className='text-center'>
              <p className='text-white-50 font-size-15 mb-0'>
                {new Date().getFullYear()} © Palms and Dates
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer
