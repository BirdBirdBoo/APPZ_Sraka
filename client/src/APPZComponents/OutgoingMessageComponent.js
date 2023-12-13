import React from 'react';
import { Card } from 'react-bootstrap';

import '../styles/styles.css';

function OutgoingMessageComponent(){
  return (
    <div className="outgoing-message">
      <Card bg="primary" text="white">
        <Card.Body className="card-body-outgoing">
          <Card.Text>
            blablasdasdasdasdalba
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OutgoingMessageComponent;
