import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import {Row, Col, Image, Card } from 'react-bootstrap';
import VerticalDoctorNavbar from './VerticalDoctorNavbar';

function DoctorProfile() {
    return (
        <Card style={{
            border: 'none', 
            boxShadow: 'none' 
        }}>
            <Card.Body style={{ display: 'flex', alignItems: 'start' }}>
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
                    <Button className="btn-style" style={{width:'300px'}}>Додати пацієнта</Button>
                </Col>
            </Card.Body>
        </Card>
    );
}


export default DoctorProfile;