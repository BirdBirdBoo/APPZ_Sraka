import React from 'react';
import { Card } from 'react-bootstrap';

import '../styles/styles.css';
import img_user from '../icons/chat/user.png'

function IncomingMessageComponent(){
  return (
    <div className="incoming-message">
      <Card style={{ border: 'none', boxShadow: 'none' }}>
        <Card.Body className="card-body-incoming">
          <div className="message-header">
            <div className="sender-name">Коваль Андрій Іванович</div>
            <img src={img_user} alt="User" className="user-icon" />
          </div>
          <Card.Text className="card-text-incoming">Так звісно!</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default IncomingMessageComponent;
