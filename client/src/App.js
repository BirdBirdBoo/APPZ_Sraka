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

function App() {
    let context = useContext(AuthContext);

    let location = useLocation();
    let targetLocation = parseTargetLocation(location);

    console.log(location);

    if (!context.isLoggedIn) {
        return <Navigate to={ApplicationPaths.LoginPage}/>;
    } else if (targetLocation.isRoot) {
        return <Navigate to={ApplicationPaths.PatientProfile}/>;
    }
    return (
        <Row className="MOVIcontainer" style={{margin: '0px', height: '100%'}}>
            <Col xs={3} className="side-menu" style={{
                backgroundColor: '#B5D7FF',
                display: 'flex',

            }}>
                <VerticalPatientNavbar/>
            </Col>
            <Col className="content" style={{margin: '0px', height: '100%', paddingRight: 0}}>
                {targetLocation.isPatientProfile && <UserProfile/>}
                {targetLocation.isPatientChat && <Chat/>}
                {targetLocation.isStatsPage && <MedicalCharts/>}
                {targetLocation.isAnalysisPage && <AnalysisList/>}
            </Col>
        </Row>
    )
}

function parseTargetLocation(location) {
    const {pathname, _, __} = location;

    return {
        isRoot: pathname === ApplicationPaths.RootPath,
        isPatientProfile: pathname === ApplicationPaths.PatientProfile,
        isPatientChat: pathname === ApplicationPaths.PatientChat,
        isStatsPage: pathname === ApplicationPaths.StatsPage,
        isAnalysisPage: pathname === ApplicationPaths.AnalysisPage,
    }
}

export default App;
