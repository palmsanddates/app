import { Modal, Button, Form } from 'react-bootstrap'
import './CreateEvent.css';

function CreateEvent(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            CREATE AN EVENT
          </Modal.Title>
          <Button onClick={props.onHide}>CLOSE</Button>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>COLLABORATORS</Form.Label>
                <Form.Control type="text" placeholder="Collaborators" />
                <Form.Label>DEPARTMENT</Form.Label>
                <Form.Control type="text" placeholder="Department" />
                <Form.Label>EVENT NAME</Form.Label>
                <Form.Control type="email" placeholder="Event Name" />
                <Form.Label>EVENT DATE</Form.Label>
                <Form.Control type="date" placeholder="Event Date" />
                <Form.Label>EVENT TIME</Form.Label>
                <Form.Control type="email" placeholder="Event Time" />
                <Form.Label>EVENT LOCATION</Form.Label>
                <Form.Control type="email" placeholder="Event Location" />
                <Form.Label>CATERED TOWARDS</Form.Label>
                <Form.Control type="email" placeholder="Event Towards" />
                <Form.Label>EVENT FLYER</Form.Label>
                <Form.Control type="email" placeholder="Event Flyer" />
                <Form.Label>BUDGET</Form.Label>
                <Form.Control type="email" placeholder="Budget" />
                <Form.Label>NUMBER OF ATTENDEES</Form.Label>
                <Form.Control type="email" placeholder="Number of Attendees" />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" type="submit">CREATE</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default CreateEvent
