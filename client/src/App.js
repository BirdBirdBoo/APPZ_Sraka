import './App.css';
import VerticalDoctorNavbar from './APPZComponents/VerticalDoctorNavbar';
import {Row, Col, Image, Card} from 'react-bootstrap';
import DoctorProfile from './APPZComponents/DoctorProfile';
import UserProfile from './APPZComponents/UserProfile';
import VerticalPatientNavbar from './APPZComponents/VerticalPatientNavbar';
import Chat from './APPZComponents/Chat';
import Calendar from './APPZComponents/Calendar';
import {useCallback, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {Navigate, useLocation} from "react-router-dom";
import ApplicationPaths from "./paths";
import MedicalCharts from "./some-f-ing-chatrs/MedicalCharts";
import BloodAnalysisTable from './APPZComponents/AnalysisTable';
import UrineAnalysisTable from './APPZComponents/UrineAnalysis';
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

    return (
        <Row className="MOVIcontainer" style={{margin: '0px', height: '100%'}}>
            <Col xs={3} className="side-menu" style={{
                backgroundColor: '#B5D7FF',
                display: 'flex',

            }}>
                {!context.isDoctor && <VerticalPatientNavbar/>}
                {context.isDoctor && <VerticalDoctorNavbar/>}
            </Col>
            <Col className="content" style={{margin: '0px', height: '100%', paddingRight: 0}}>
                {targetLocation.isPatientProfile && <UserProfile/>}
                {targetLocation.isPatientChat && getChat()}
                {targetLocation.isStatsPage && <MedicalCharts/>}
                {targetLocation.isPatientsPage && <DoctorPatientsList/>}
                {targetLocation.isAnalysisPage && <AnalysisList/>}
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
        isStatsPage: pathname === ApplicationPaths.StatsPage,
        isPatientsPage: pathname === ApplicationPaths.PatientsPage,
        isAnalysisPage: pathname === ApplicationPaths.AnalysisPage,
    }
}

export default App;
