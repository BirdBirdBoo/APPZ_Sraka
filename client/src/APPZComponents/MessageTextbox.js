import React from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';

function MessageTextbox()
{
  return (
    <InputGroup className="mb-3" style={{ borderRadius: '20px', borderColor: '#459BFF', overflow: 'hidden', marginTop: '20px' }}>
        <Button variant="secondary"  style={{ width: '10%',  border: 'none' }}>
          Add File
        </Button>
        <Form.Control
            type="text"
            placeholder="Type your message..."
            style={{ width: '80%'}}
        />
        <Button variant="primary" style={{ width: '10%',  border: 'none'  }}>
          Send Message
        </Button>
    </InputGroup>
  );
};

export default MessageTextbox;
