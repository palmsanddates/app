import React, { Component } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

import EventService from '../services/event.service';
import '../assets/css/general.css';

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeEventParam = this.onChangeEventParam.bind(this);
    this.onChangeEventFlyer = this.onChangeEventFlyer.bind(this);

    this.state = {
      name: null,
      description: null,
      location: null,
      start_time: null,
      end_time: null,
      flyer_img: null,
      isLoading: false,
      error: '',
    };
  }

  onChangeEventParam(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onChangeEventFlyer(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        flyer_img: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({
      isLoading: true,
    });

    try {
      await EventService.createEvent({
        name: this.state.name,
        description: this.state.description,
        location: this.state.location,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        flyer_img: this.state.flyer_img,
      });
      this.state = {
        name: null,
        description: null,
        location: null,
        start_time: null,
        end_time: null,
        flyer_img: null,
        isLoading: false,
        error: '',
      };
      this.props.onHide();
    } catch (err) {
      const resMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      this.setState({
        isLoading: false,
        error: resMessage,
      });
    }
  }

  render() {
    let buttonContent;

    if (this.state.isLoading) {
      buttonContent = (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    } else {
      buttonContent = <span>Create</span>;
    }

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create an Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={this.onChangeEventParam}
              />
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                rows={3}
                as="textarea"
                onChange={this.onChangeEventParam}
              />
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                onChange={this.onChangeEventParam}
              />
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="start_time"
                onChange={this.onChangeEventParam}
              />
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="end_time"
                onChange={this.onChangeEventParam}
              />

              <Form.Text className="text-muted" />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Flyer Image</Form.Label>
              <Form.Control
                type="file"
                name="flyer_img"
                onChange={this.onChangeEventFlyer}
                accept=".jpg,.jpeg,.png"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="buttton"
            disabled={this.state.isLoading}
            onClick={this.handleSubmit}
          >
            {buttonContent}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default CreateEvent;
