import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import IncomingMessageComponent from './IncomingMessageComponent';
import OutgoingMessageComponent from './OutgoingMessageComponent';
import MessageTextbox from './MessageTextbox';
import { Card } from 'react-bootstrap';

function Chat () {
  return (
    <Card>
        <Card.Body style={{ height: '760px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ overflowY: 'auto', flex: 1 }}>
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
                {/* Add more message components here */}
            </div>
            <MessageTextbox />
        </Card.Body>
    </Card>
  );
};

export default Chat;
