import React, {useContext} from 'react';
import {Row, Col, Image, Card, Button} from 'react-bootstrap';
import VerticalPatientNavbar from './VerticalPatientNavbar';
import AuthContext from "../AuthContext";
import authContext from "../AuthContext";
import ApplicationPaths from "../paths";

function UserProfile() {
    let context = useContext(AuthContext);

    return (
        <Card style={{
            border: 'none',
            boxShadow: 'none'
        }}>
            <Card.Body style={{display: 'flex', alignItems: 'start'}}>
                {/* Image column */}
                <Col xs={4}>
                    <Image src="https://shorturl.at/aoIL1"
                           alt="Фото користувача"
                           width="240px"
                           height="240px"
                           roundedCircle/>

                </Col>

                {/* Text content column */}
                <Col xs={8}>
                    {/* User name */}
                    <Card.Title>{context.userData.firstName} {context.userData.secondName}</Card.Title>

                    {/* Personal information */}
                    {context.isPatient && <>
                        <Card.Text>Має алергію на {context.userAsPatientInfo.allergens}</Card.Text>
                        <Card.Text>Тип крові {context.userAsPatientInfo.bloodType}</Card.Text>
                    </>}

                    {context.isDoctor && <>
                        <Card.Text>Спеціалізація {context.userAsDoctorInfo.proffesion}</Card.Text>
                        <Card.Text>Стаж {context.userAsDoctorInfo.experience} років</Card.Text>
                        <Card.Text>Рейтинг: {context.userAsDoctorInfo.rating}</Card.Text>
                    </>}

                    {/* Date of birth */}
                    <Card.Text>
                        <strong>Дата народження:</strong> {context.userData.dateOfBirth}
                    </Card.Text>

                    {/* Doctor's name */}
                    {context.isPatient && <>
                        <Card.Text>
                            <strong>Лікар:</strong> {context.patientDoctorInfo?.userData?.firstName} {context.patientDoctorInfo?.userData?.secondName}
                        </Card.Text>
                    </>}
                </Col>
            </Card.Body>
        </Card>
    );
}


export default UserProfile;