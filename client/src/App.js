import './App.css';
import VerticalDoctorNavbar from './APPZComponents/VerticalDoctorNavbar';
import {Row, Col, Image, Card } from 'react-bootstrap';
import DoctorProfile from './APPZComponents/DoctorProfile';
import PatientProfile from './APPZComponents/PatientProfile';
import VerticalPatientNavbar from './APPZComponents/VerticalPatientNavbar';
import Chat from './APPZComponents/Chat';

function App() {
    return <>
    {/* 
        <AppNavbar/>
        <ImageGallery/>
        
         Warning!
         message prop requires a string 
     */}
    {/* <DoctorProfile/>*/}

        <Row className="MOVIcontainer" style={{margin:'0px'}}>
            <Col xs={3} className="side-menu" style={{ 
                    backgroundColor: '#B5D7FF', 
                    display: 'flex'}}>
                <VerticalPatientNavbar />
            </Col>
            <Col className="content">
                {/* <PatientProfile/> */}
                <Chat/>
            </Col>
        </Row>
    </>;
}

export default App;
