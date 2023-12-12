import React from 'react';
import {Row, Col, Image, Card } from 'react-bootstrap';
import VerticalPatientNavbar from './VerticalPatientNavbar';

function PatientProfile() {
    return (
        <Row className="profile-container" style={{margin:'0px'}}>
            <Col xs={3} className="side-menu" style={{ 
                    backgroundColor: '#B5D7FF', 
                    display: 'flex',
                }}
            >
                <VerticalPatientNavbar />
            </Col>
            <Col className="profile-content">
                <Card>
                    <Card.Body style={{ height: '760px', display: 'flex', alignItems: 'start' }}>
                        {/* Image column */}
                        <Col xs={4}>
                            <Image src="https://shorturl.at/aoIL1" alt="Фото користувача" width="300px" height="300px" roundedCircle />
                        </Col>

                        {/* Text content column */}
                        <Col xs={8}>
                            {/* User name */}
                            <Card.Title>qweqwe</Card.Title>

                            {/* Personal information */}
                            <Card.Text>qweqwe</Card.Text>

                            {/* Date of birth */}
                            <Card.Text>
                                <strong>Дата народження:</strong> qweqweqwe
                            </Card.Text>

                            {/* Doctor's name */}
                            <Card.Text>
                                <strong>Лікар:</strong>qweqwe
                            </Card.Text>
                        </Col>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}


export default PatientProfile;