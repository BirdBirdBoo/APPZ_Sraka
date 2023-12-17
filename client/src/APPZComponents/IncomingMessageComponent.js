import React from 'react';
import { Card } from 'react-bootstrap';

import '../styles/styles.css';
import img_user from '../icons/chat/user.png'
import img_link from '../icons/chat/link.png'

function IncomingMessageComponent({senderName, message, messageType}){
  return (
    <div className="incoming-message">
      <Card style={{ border: 'none', boxShadow: 'none' }}>
        <Card.Body className="card-body-incoming">
          {messageType==1 && <a className='ingoing-annotation-link'>Annotation</a>}
          {messageType==1 && <a><img src={img_link} alt="Link" className="link-icon-incoming" /></a>}
          <div className="message-header">
            <div className="sender-name">{senderName}</div>
            <img src={img_user} alt="User" className="user-icon" />
          </div>
          <Card.Text className="card-text-incoming">{message}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default IncomingMessageComponent;
