import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap';
import IncomingMessageComponent from './IncomingMessageComponent';
import OutgoingMessageComponent from './OutgoingMessageComponent';
import MessageTextbox from './MessageTextbox';
import { Card } from 'react-bootstrap';
import AuthContext from "../AuthContext";

function Chat() {
  let context = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState([]);
  const [receiver, setReceiver] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const responseAllMessages = await axios.post('https://localhost:7130/api/Chat/getAllMessages', {
          "first": context.userId,
          "second": context.doctorId
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const responseSender = await axios.get('https://localhost:7130/api/Login/getInfo', { params: { userId:  context.userId } });
        const responseReceiver = await axios.get('https://localhost:7130/api/Chat/getAllMessages');
        setMessages(responseAllMessages.data);
        scrollToBottom();
      } catch (error) {
        console.error("Could not fetch messages:", error);
      }
    };

    fetchMessages();
  }, []);


  return (
    <Card style={{
      border: 'none',
      boxShadow: 'none',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Card.Body style={{
        flex: 1,
        padding: '1rem',
        overflowY: 'auto'
      }}>
        // Fill messages from the request to the url: 'https://localhost:7130/api/Chat/getAllMessages'

        {messages.map((msg, index) => (
          <IncomingMessageComponent key={index} senderName={msg.senderName} message={msg.message} />
        ))}
        <div ref={messagesEndRef} />
      </Card.Body>
      <MessageTextbox />
    </Card>
  );
};


export default Chat;
