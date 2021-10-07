import { Modal, Button, Form } from 'react-bootstrap'
import '../assets/css/general.css'

function CreateEvent (props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          CREATE AN EVENT
        </Modal.Title>
        <Button onClick={props.onHide}>CLOSE</Button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>NAME</Form.Label>
            <Form.Control type='text' placeholder='EVENT NAME' />
            <Form.Label>DESCRIPTION</Form.Label>
            <Form.Control type='text' placeholder='EVENT DESCRIPTION' />
            <Form.Label>START DATETIME</Form.Label>
            <Form.Control type='datetime-local' placeholder='EVENT DATE' />
            <Form.Label>END DATETIME</Form.Label>
            <Form.Control type='datetime-local' placeholder='EVENT TIME' />
            <Form.Label>LOCATION</Form.Label>
            <Form.Control type='text' placeholder='EVENT LOCATION' />
            <Form.Text className='text-muted' />
          </Form.Group>
          <Form.Label>EVENT FLYER</Form.Label>
          <Form.Group controlId='formFile' className='mb-3'>
            <Form.Control type='file' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword' />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' type='submit'>CREATE</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateEvent
