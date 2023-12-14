import AuthContext from "../AuthContext";
import {useContext} from "react";
import {Button, Col, Image, Row, Stack} from "react-bootstrap";
import img_send from '../icons/chat/send.png'
import Paths from "../paths";


export default function DoctorPatientsList() {
    let authContext = useContext(AuthContext);

    console.log("patients: ", authContext.userAsDoctorInfo);

    return (
        <div>
            <h1 className="p-3">Мої пацієнти</h1>

            <Stack gap={3} className='mx-4'>
                {authContext.userAsDoctorInfo.patients.map((patient, index) => {
                    return (
                        <Row key={index} className='border-1 p-3 me-2 mb-4 i-am-blue-labadibabada'
                             style={{borderStyle: 'solid'}}>
                            <Stack direction='horizontal'>
                                <Stack xs='6'>
                                    <h6>{patient.userData.firstName} {patient.userData.secondName}</h6>
                                    <span>Дата народження: <strong>{patient.userData.dateOfBirth}</strong></span>
                                </Stack>
                                <Stack className='align-self-center ms-auto' direction='horizontal' gap={3}>
                                    <Button style={{
                                        border: 1,
                                        padding: '0.4rem',
                                        backgroundColor: '#459BFF',
                                    }}>Аналізи</Button>
                                    <Button style={{
                                        border: 1,
                                        padding: '0.4rem',
                                        backgroundColor: '#459BFF',
                                    }} href={`${Paths.ChartsPage}?patient_id=${patient.patientId}`}>Графіки</Button>
                                    <Button style={{
                                        border: 1,
                                        padding: '0.4rem',
                                        backgroundColor: '#459BFF',
                                    }} href={`${Paths.PatientChat}?receiver_id=${patient.userId}`}>Перейти до чату</Button>
                                </Stack>
                            </Stack>
                        </Row>
                    )
                })}
            </Stack>
        </div>
    )
}