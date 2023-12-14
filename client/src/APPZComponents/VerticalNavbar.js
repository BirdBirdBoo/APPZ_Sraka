import {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import ApplicationPaths from '../paths';

import '../styles/styles.css';
import AuthContext from "../AuthContext";
import {Col} from "react-bootstrap";

function VerticalNavbar() {
    const [expandSideBar, setExpandSideBar] = useState(false);
    let context = useContext(AuthContext);

    const handleSelect = (eventKey) => {
        setExpandSideBar(false);
    };

    return (

        <Col xs='false' md={4} lg={3} xl={2} className="side-menu" style={{
            backgroundColor: '#B5D7FF',
            display: 'flex',
        }}>
            <ButtonGroup vertical size="md" className="button-group-wrapper">

                <Button className="btn-style" href={ApplicationPaths.ProfilePage}>Профіль</Button>
                {context.isPatient && <>
                    <Button className="btn-style" href={ApplicationPaths.PatientChat}>Зв'язатись з лікарем</Button>
                    <Button className="btn-style" href={ApplicationPaths.AnalysisPage}>Аналізи</Button>
                    <Button className="btn-style" href={ApplicationPaths.ChartsPage}>Графіки</Button>
                </>}

                {context.isDoctor && <>
                    <Button className="btn-style" href={ApplicationPaths.PatientsPage}>Пацієнти</Button>
                    <Button className="btn-style" href={ApplicationPaths.CalendarPage}>Записи на прийом</Button>
                </>}

                <Button className='btn-style danger' href={ApplicationPaths.LogoutPage}>Вийти</Button>
            </ButtonGroup>
        </Col>
    );
}

export default VerticalNavbar;
