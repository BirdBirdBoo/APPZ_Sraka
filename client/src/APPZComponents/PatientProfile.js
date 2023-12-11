import React from 'react';
import {Row, Col, Image, Card } from 'react-bootstrap';
import VerticalPatientNavbar from './VerticalPatientNavbar';

function PatientProfile() {
  return (
    <Row className="profile-container">
        <Col xs={3} className="side-menu">
            <VerticalPatientNavbar/>
        </Col>
        <Col className="profile-content">
            <Card>
                <Card.Body style={{height:"760px"}}>
                    <Image src="https://shorturl.at/aoIL1" alt="Фото користувача" width="300px" height="300px" roundedCircle/>

                    {/* User name */}
                    <Card.Title>qweqwe</Card.Title>

                    {/* Personal information */}
                    <Card.Text>qweqwe</Card.Text>

                    {/* Date of birth */}
                    <Card.Text><strong>Дата народження:</strong> qweqweqwe</Card.Text>

                    {/* Doctor's name */}
                    <Card.Text><strong>Лікар:</strong>qweqwe</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  );
}

export default PatientProfile;