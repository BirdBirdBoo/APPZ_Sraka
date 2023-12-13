import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import IncomingMessageComponent from './IncomingMessageComponent';
import OutgoingMessageComponent from './OutgoingMessageComponent';
import MessageTextbox from './MessageTextbox';
import { Card } from 'react-bootstrap';

function Chat () {
  // Create a ref for the messages container
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Use useEffect to scroll to the bottom whenever the component updates
  useEffect(scrollToBottom, []); // The empty array ensures this only runs once after the initial render

  return (
    <Card style={{
      border: 'none', 
      boxShadow: 'none',
      height: '100%', // Ensure the Card takes up the full height of its container
      display: 'flex', // Use flex layout
      flexDirection: 'column' // Stack children vertically
  }}>
        <Card.Body style={{
          flex: 1, // Allow Card.Body to fill the available space
          padding: '1rem', // Give some padding around the messages
          overflowY: 'auto' // Add scrollbar if content overflows
        }}>
            <IncomingMessageComponent/>
            <OutgoingMessageComponent/>
            <IncomingMessageComponent/>
            <IncomingMessageComponent/>
            <IncomingMessageComponent/>
            <IncomingMessageComponent/>
            <OutgoingMessageComponent/>
            <IncomingMessageComponent/>
            <OutgoingMessageComponent/>
            <IncomingMessageComponent/>
            <OutgoingMessageComponent/>
            <IncomingMessageComponent/>
            <OutgoingMessageComponent/>
            <IncomingMessageComponent/>
            <OutgoingMessageComponent/>
            <IncomingMessageComponent/>
            <OutgoingMessageComponent/>
            <div ref={messagesEndRef} />
        </Card.Body>
        <MessageTextbox />
    </Card>
  );
};

export default Chat;
