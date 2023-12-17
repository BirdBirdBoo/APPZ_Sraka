import React, { useContext } from 'react';
import { Row, Col, Image, Card, Button } from 'react-bootstrap';
import AuthContext from "../AuthContext";
import authContext from "../AuthContext";
import ApplicationPaths from "../paths";
import { formatDate } from '../dateFormatter';

function UserProfile() {
    let context = useContext(AuthContext);

    return (
        <Card style={{
            border: 'none',
            boxShadow: 'none'
        }}>
            <Card.Body style={{ display: 'flex', alignItems: 'start' }}>
                {/* Image column */}
                <Row>
                    <Col xs={10} md={4} className='mx-auto'>
                        <Row className='align-content-center'>
                            <Image
                                src="https://img.freepik.com/premium-photo/illustration-portrait-philosopher-confucius_756405-54715.jpg?size=338&ext=jpg&ga=GA1.1.1826414947.1699228800&semt=ais"
                                alt="Фото користувача"
                                style={{ aspectRatio: '1/1', padding: 0, maxWidth: '80vw' }}
                                roundedCircle />
                        </Row>
                    </Col>

                    {/* Text content column */}
                    <Col xs='auto' md={6}>
                        {/* User name */}
                        <Card.Title>{context.userData.firstName} {context.userData.secondName}</Card.Title>

                        {/* Personal information */}
                        {context.isPatient && <>
                            <Card.Text>Має алергію на {context.userAsPatientInfo.allergens}</Card.Text>
                            <Card.Text>Тип крові {context.userAsPatientInfo.bloodType}</Card.Text>
                        </>}

                        {context.isDoctor && <>
                            <Card.Text>Спеціалізація: {context.userAsDoctorInfo.proffesion}</Card.Text>
                            <Card.Text>Стаж: {context.userAsDoctorInfo.experience} років</Card.Text>
                            <Card.Text>Рейтинг: {context.userAsDoctorInfo.rating}</Card.Text>
                        </>}

                        {/* Date of birth */}
                        <Card.Text>
                            <strong>Дата народження:</strong> {formatDate(context.userData.dateOfBirth)}
                        </Card.Text>

                        {/* Doctor's name */}
                        {context.isPatient && <>
                            <Card.Text>
                                <strong>Лікар:</strong> {context.patientDoctorInfo?.userData?.firstName} {context.patientDoctorInfo?.userData?.secondName}
                            </Card.Text>
                        </>}
                        <Button className="btn-style" style={{ width: '300px' }}>Редагувати Профіль</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}


export default UserProfile;