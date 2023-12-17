import './App.css';
import {Row, Col, Image, Card} from 'react-bootstrap';
import UserProfile from './APPZComponents/UserProfile';
import VerticalNavbar from './APPZComponents/VerticalNavbar';
import Chat from './APPZComponents/Chat';
import Calendar from './APPZComponents/Calendar';
import {useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {Navigate, useLocation} from "react-router-dom";
import ApplicationPaths from "./paths";
import MedicalCharts from "./some-f-ing-chatrs/MedicalCharts";
import AnalysisList from './APPZComponents/AnalysisList';

import "./styles/styles.css";
import DoctorPatientsList from "./APPZComponents/DoctorPatientsList";

function App() {
    let context = useContext(AuthContext);

    let location = useLocation();
    let targetLocation = parseTargetLocation(location);

    console.log(location);

    if (!context.isLoggedIn) {
        return <Navigate to={ApplicationPaths.LoginPage}/>;
    } else if (targetLocation.isRoot) {
        return <Navigate to={ApplicationPaths.ProfilePage}/>;
    }

    function getChat() {
        if (location.search) {
            const params = new URLSearchParams(location.search);
            const receiverId = params.get('receiver_id');

            if (receiverId) {
                return <Chat receiverId={receiverId}/>;
            }
        }
        return <Chat/>;
    }

    function getAnalyzes() {
        if (location.search) {
            const params = new URLSearchParams(location.search);
            const patientId = params.get('patient_id');
            
            if (patientId) {
                return <AnalysisList patientIdFromDoctor={patientId}/>;
            }
        }
        return <AnalysisList/>;
    }

    function getMedicalCharts() {
        if (location.search) {
            const params = new URLSearchParams(location.search);
            const patientId = params.get('patient_id');

            if (patientId) {
                return <MedicalCharts patientid={patientId}/>;
            }
        }
        return <MedicalCharts/>;
    }

    return (
        <Row className="MOVIcontainer" style={{margin: '0px', height: '100%'}}>
            <VerticalNavbar/>

            <Col className="content" style={{margin: '0px', height: '100%', paddingRight: 0}}>
                {targetLocation.isPatientProfile && <UserProfile/>}
                {targetLocation.isPatientChat && getChat()}
                {targetLocation.isStatsPage && getMedicalCharts()}
                {targetLocation.isPatientsPage && <DoctorPatientsList/>}
                {targetLocation.isAnalysisPage && getAnalyzes()}
                {targetLocation.isCalendarPage && <Calendar/>}
            </Col>
        </Row>
    )
}

function parseTargetLocation(location) {
    const {pathname, _, __} = location;

    return {
        isRoot: pathname === ApplicationPaths.RootPath,
        isPatientProfile: pathname === ApplicationPaths.ProfilePage,
        isPatientChat: pathname === ApplicationPaths.PatientChat,
        isStatsPage: pathname === ApplicationPaths.ChartsPage,
        isPatientsPage: pathname === ApplicationPaths.PatientsPage,
        isAnalysisPage: pathname === ApplicationPaths.AnalysisPage,
        isCalendarPage: pathname === ApplicationPaths.CalendarPage,
    }
}

export default App;
