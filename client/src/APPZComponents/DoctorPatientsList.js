import AuthContext from "../AuthContext";
import { useContext } from "react";
import { Button, Col, Image, Row, Stack } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import img_send from '../icons/chat/send.png'
import Paths from "../paths";
import { Component } from "@react-buddy/ide-toolbox";
import { useBootstrapBreakpoints } from "react-bootstrap/ThemeProvider";
import { useTheme } from "styled-components";
import { Route, NavLink } from "react-router-dom";
import { formatDate } from "../dateFormatter";


const smallActionButtonStyle = {
    border: 1,
    padding: '0.3rem',
    backgroundColor: '#459BFF',
    margin: '0 0.5rem',
    fontSize: '0.8rem',
}

const navLinkStyle = { textDecoration: "none" };

export default function DoctorPatientsList() {
    let authContext = useContext(AuthContext);
    let isLg = useMediaQuery({ minWidth: 992 })
    console.log("isLg", isLg)


    return (
        <div>
            <h1 className="p-3">Мої пацієнти</h1>

            <Stack gap={3} className='mx-4'>
                {authContext.userAsDoctorInfo.patients.map((patient, index) => {
                    return (
                        <Row key={index} className='border-1 py-3 me-2 mb-4 i-am-blue-labadibabada'
                            style={{ borderStyle: 'solid' }}>
                            <Col xs={false} md={12} lg={5} className='px-3'>
                                <Stack>
                                    <h6>{patient.userData.firstName} {patient.userData.secondName}</h6>
                                    <span>Дата народження: <strong>{formatDate(patient.userData.dateOfBirth)}</strong></span>
                                </Stack>
                            </Col>
                            <Col xs={false} md={false} lg={7} className={['px-3', isLg ? 'my-auto' : '']} style={
                                {
                                    textAlign: isLg ? 'right' : 'center',
                                    marginTop: isLg ? '0' : '0.5rem'
                                }
                            }>
                                {/*<Stack className='align-self-end ms-auto' direction='horizontal' gap={3}>*/}
                                //mock
                                <NavLink style={navLinkStyle} to={`${Paths.AnalysisPage}?patient_id=${patient.patientId}`}>
                                    <Button style={smallActionButtonStyle}>Поточний стан</Button>
                                </NavLink>

                                <NavLink style={navLinkStyle} to={`${Paths.AnalysisPage}?patient_id=${patient.patientId}`}>
                                    <Button style={smallActionButtonStyle}>Аналізи</Button>
                                </NavLink>
                                <NavLink style={navLinkStyle} to={`${Paths.ChartsPage}?patient_id=${patient.patientId}`}>
                                    <Button style={smallActionButtonStyle}>Графіки</Button>
                                </NavLink>

                                //mock
                                <NavLink style={navLinkStyle} to={`${Paths.ChartsPage}?patient_id=${patient.patientId}`}>
                                    <Button style={smallActionButtonStyle}>Результати опитувань</Button>
                                </NavLink>
                                
                                <NavLink style={navLinkStyle} to={`${Paths.PatientChat}?receiver_id=${patient.userId}`}>
                                    <Button style={smallActionButtonStyle}>Перейти до чату</Button>
                                </NavLink>
                                {/*</Stack>*/}
                            </Col>
                        </Row>
                    )
                })}
            </Stack>
        </div>
    )
}