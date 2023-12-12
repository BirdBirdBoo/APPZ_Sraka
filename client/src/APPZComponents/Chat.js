import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import IncomingMessageComponent from './IncomingMessageComponent';
import OutgoingMessageComponent from './OutgoingMessageComponent';
import MessageTextbox from './MessageTextbox';
import { Card } from 'react-bootstrap';

function Chat () {
  return (
    <Card>
        <Card.Body style={{ height: '760px', display: 'flex', alignItems: 'start' }}>
            <Row>
                <Col>
                    <IncomingMessageComponent/>
                    <OutgoingMessageComponent/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <MessageTextbox />
                </Col>
            </Row>
        </Card.Body>
    </Card>
  );
};

export default Chat;
