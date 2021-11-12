import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer () {
  return (
    <div className='footer py-4 shadow'>
      <Container>
        <Row>
          <Col lg={12}>
            <div className='text-center'>
              <p className='text-primary font-size-15 mb-0'>
                {new Date().getFullYear()} Copyright © Palms & Dates. All rights reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer
