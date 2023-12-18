import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AnnotationModal = ({ showModal, handleClose, onSave }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    onSave(inputValue);
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Створення анотації</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formInput">
            <Form.Label>Введіть текст:</Form.Label>
            <Form.Control type="text" onChange={handleInputChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="primary" onClick={handleSave}>
          Зберегти
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Закрити
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AnnotationModal;