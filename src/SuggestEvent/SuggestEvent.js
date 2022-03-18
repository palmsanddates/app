import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

import EventService from '../services/event.service';
import ClubService from '../services/club.service';

import tokenPayload from '../services/token-payload';

function SuggestEvent(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [clubs, setClubs] = useState([]);

  const [suggestionForm, setSuggestionForm] = useState({
    club_id: '',
    name: '',
  });
  const [error, setError] = useState('');
  const token = tokenPayload();

  useEffect(() => {
    const fetchData = async () => {
      console.log(token);
      const clubsRes = await ClubService.getClubs(token.institution);
      setClubs(clubsRes.data.clubs.map((x) => ({ _id: x._id, name: x.name })));
    };
    fetchData();
    setIsLoading(false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(suggestionForm);
      await EventService.createSuggestion(suggestionForm);
      props.onHide();
      setIsLoading(false);
    } catch (err) {
      setError(
        (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString()
      );
      setIsLoading(false);
    }
  }

  function handleChangeForm(e) {
    setSuggestionForm({
      ...suggestionForm,
      [e.target.name]: e.target.value,
    });
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
          <Form.Group className="mb-3" controlId="formBasicSelect">
            <Form.Label>Club</Form.Label>
            <Form.Select
              name="club_id"
              onChange={handleChangeForm}
              value={suggestionForm.club_id}
            >
              <option>Select Club</option>
              {clubs &&
                clubs.map((club) => {
                  return (
                    <option key={club._id} value={club._id}>
                      {club.name}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Suggestion</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="name"
              value={suggestionForm.name}
              onChange={handleChangeForm}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          type="button"
          disabled={suggestionForm.name === '' || suggestionForm.club_id === ''}
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
