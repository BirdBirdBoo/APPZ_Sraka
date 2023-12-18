import React from 'react';
import { Card } from 'react-bootstrap';

import '../styles/styles.css';
import img_user from '../icons/chat/user.png'
import img_link from '../icons/chat/link_out.png'

function OutgoingMessageComponent({senderName, message, messageType}){
  return (
    <div className="outgoing-message">
      <Card style={{ border: 'none', boxShadow: 'none' }}>
        <Card.Body className="card-body-outgoing">
          {messageType==1 && <a className='outgoing-annotation-link'>Annotation</a>}
          {messageType==1 && <a><img src={img_link} alt="User" className="link-icon-outcoming" /></a>}
          <div className="message-header">
            <div className="sender-name">{senderName}</div>
            <img src={img_user} alt="User" className="user-icon" />
          </div>
          <Card.Text className="card-text-outcoming">
            {message}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OutgoingMessageComponent;
