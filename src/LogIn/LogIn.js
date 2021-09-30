import { Modal, Button, Form } from 'react-bootstrap'
import './LogIn.css';

function LogIn(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            LOG IN
          </Modal.Title>
          <Button onClick={props.onHide}>CLOSE</Button>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                Please use your dominican.edu email address
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" type="submit">SUBMIT</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default LogIn
