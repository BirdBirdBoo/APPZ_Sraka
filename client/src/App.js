import './App.css';
import VerticalDoctorNavbar from './APPZComponents/VerticalDoctorNavbar';
import {Row, Col, Image, Card} from 'react-bootstrap';
import DoctorProfile from './APPZComponents/DoctorProfile';
import PatientProfile from './APPZComponents/PatientProfile';
import VerticalPatientNavbar from './APPZComponents/VerticalPatientNavbar';
import Chat from './APPZComponents/Chat';
import Calendar from './APPZComponents/Calendar';
import {useCallback, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {Navigate, useLocation} from "react-router-dom";
import ApplicationPaths from "./paths";

import "./styles/styles.css";

function App() {
    let context = useContext(AuthContext);

    let location = useLocation();

    console.log(location);

    if (!context.isLoggedIn) {
        return <Navigate to={ApplicationPaths.LoginPage}/>;
    }
    else if(location.pathname!=ApplicationPaths.PatientProfile && location.pathname!=ApplicationPaths.PatientChat)
    {
        return <Navigate to={ApplicationPaths.PatientProfile}/>;
    }
    return (
        <Row className="MOVIcontainer" style={{margin: '0px', height:'100%'}}>
            <Col xs={3} className="side-menu" style={{
                backgroundColor: '#B5D7FF',
                display: 'flex'
            }}>
                <VerticalPatientNavbar/>
            </Col>
            <Col className="content">
                {location.pathname==ApplicationPaths.PatientProfile && <PatientProfile/>}
                {location.pathname==ApplicationPaths.PatientChat && <Chat/>}
            </Col>
        </Row>
    )
}

export default App;
