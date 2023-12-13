import React from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import img_add_file from '../icons/chat/add_file.png'
import img_send from '../icons/chat/send.png'


function MessageTextbox()
{
  return (
    <InputGroup className="mb-3" style={{ 
      borderRadius: '30px', 
      border: '2px solid #459BFF', 
      overflow: 'hidden', 
      marginTop: '20px',
      padding: '5px'
    }}>
        <Button  style={{ 
        width: '5%',  
        border: 'none', 
        backgroundColor: "transparent", 
        backgroundImage: `url(${img_add_file})`, 
        backgroundRepeat: "no-repeat", 
        backgroundPosition: 'center', 
        backgroundSize: 'contain'
      }}/>
        <Form.Control
            type="text"
            placeholder="Type your message..."
            style={{ 
              width: '80%', 
              border: 'none', 
              boxShadow: 'none' 
            }}
        />
        <Button  style={{ 
        width: '5%',  
        border: 'none', 
        backgroundColor: "transparent", 
        backgroundImage: `url(${img_send})`, 
        backgroundRepeat: "no-repeat", 
        backgroundPosition: 'center', 
        backgroundSize: 'contain'
      }}/>
    </InputGroup>
  );
};

export default MessageTextbox;
