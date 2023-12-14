import React, {useState} from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import img_add_file from '../icons/chat/add_file.png'
import img_send from '../icons/chat/send.png'


function MessageTextbox({handleSent})
{
  let [messageText, setMessageText] = useState('');

  const handleInputChange = (event) => {
    setMessageText(event.target.value);
  };

  const sendMessage = () => {
    if (messageText.trim() !== '') { 
      handleSent(messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <InputGroup className="mb-3" style={{ 
      borderRadius: '30px', 
      border: '2px solid #459BFF', 
      overflow: 'hidden', 
      marginTop: '20px',
      padding: '5px'
    }}>
      <Form.Control
          type="text"
          placeholder="Type your message..."
          style={{ 
            width: '80%', 
            border: 'none', 
            boxShadow: 'none' 
          }}
          value={messageText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
      />
      <Button  style={{ 
          width: '5%',  
          border: 'none', 
          backgroundColor: "transparent", 
          backgroundImage: `url(${img_send})`, 
          backgroundRepeat: "no-repeat", 
          backgroundPosition: 'center', 
          backgroundSize: 'contain'
        }}
        onClick={sendMessage}
      />
    </InputGroup>
  );
};

export default MessageTextbox;
