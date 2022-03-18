import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

import EventService from '../services/event.service';

function SuggestEvent(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [error, setError] = useState('');
  
  async function handleSubmit(e) {
     e.preventDefault();
     setIsLoading(true);
     try {
       await EventService.createSuggestion(suggestion);
        props.onHide();
        setIsLoading(false);
     } catch(err) {
       setError(
         (err.response && err.response.data && err.response.data.message) ||
           err.message ||
           err.toString()
       );
       setIsLoading(false);
     }
  }

    function handleChangeForm(e) {
      setSuggestion(e.target.value);
    }

  let buttonContent = 'Submit';
  if (isLoading) {
    buttonContent = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Have an Idea for an Event?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Suggestion</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={suggestion}
              onChange={handleChangeForm}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          type="button"
          disabled={suggestion === ''}
          onClick={handleSubmit}
          className="w-100"
        >
          {buttonContent}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuggestEvent;