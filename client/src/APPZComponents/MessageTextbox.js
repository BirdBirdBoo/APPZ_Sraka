import React from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';

function MessageTextbox()
{
  return (
    <InputGroup className="mb-3">
        <Button variant="secondary">
          Add File
        </Button>
        <Form.Control
            type="text"
            placeholder="Type your message..."
        />
        <Button variant="primary">
          Send Message
        </Button>
    </InputGroup>
  );
};

export default MessageTextbox;
