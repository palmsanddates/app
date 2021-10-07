import { Modal, Button, Form } from 'react-bootstrap'
import '../assets/css/general.css'

function LogIn (props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          ADMIN LOG IN
        </Modal.Title>
        <Button onClick={props.onHide}>CLOSE</Button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>EMAIL ADDRESS</Form.Label>
            <Form.Control type='email' placeholder='EMAIL ADDRESS' />
            <Form.Text className='text-muted'>
              Please use your dominican.edu email address
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>PASSWORD</Form.Label>
            <Form.Control type='password' placeholder='PASSWORD' />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary' type='button'
          onClick={() => {
            props.setAuthentification(true)
            props.onHide()
          }}
        >SUBMIT
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LogIn
