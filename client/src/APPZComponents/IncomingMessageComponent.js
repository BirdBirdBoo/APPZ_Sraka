import React from 'react';
import { Card } from 'react-bootstrap';

import '../styles/styles.css';

function IncomingMessageComponent(){
  return (
    <div className="incoming-message">
      <Card>
        <Card.Body className="card-body-incoming">
          <Card.Text>blabla</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default IncomingMessageComponent;
