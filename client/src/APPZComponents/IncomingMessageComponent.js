import { React, useState } from 'react';
import { Card } from 'react-bootstrap';
import ApplicationPaths from '../paths';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import '../styles/styles.css';
import img_user from '../icons/chat/user.png'
import img_link from '../icons/chat/link.png'

function IncomingMessageComponent({ messageId, senderName, message, messageType }) {
  const [analysisId, setAnalysisId] = useState('')

  function getAnalysisIdByMessageId(id) {
    let result = ''
    axios.get('https://localhost:7130/api/Annotations/getAnalysisId', {
      params: {
        "messageId": id
      }
    }).then(res => {
      console.log("anal id: " + res.data)
      result = res.data
      setAnalysisId(result)
    })
  }

  if (messageType == 1) {
    getAnalysisIdByMessageId(messageId)
  }

  return (
    <div className="incoming-message">
      <Card style={{ border: 'none', boxShadow: 'none' }}>
        <Card.Body className="card-body-incoming">
          {messageType == 1 && <a className='ingoing-annotation-link'>Annotation</a>}
          {messageType == 1 && <NavLink to={`${ApplicationPaths.AnalysisPage}?analysis_id=${analysisId}`}>
            <img src={img_link} alt="Link" className="link-icon-incoming" />
          </NavLink>
          }
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
