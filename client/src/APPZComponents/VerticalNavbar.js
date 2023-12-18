import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import ApplicationPaths from '../paths';
import { Route, Routes, NavLink } from 'react-router-dom';

import '../styles/styles.css';
import AuthContext from "../AuthContext";
import { Col } from "react-bootstrap";

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
                <NavLink to={ApplicationPaths.ProfilePage}>
                    <Button className="btn-style">Профіль</Button>
                </NavLink>
                {context.isPatient && <>
                    <NavLink to={ApplicationPaths.PatientChat}>
                        <Button className="btn-style">Зв'язатись з лікарем</Button>
                    </NavLink>
                    <NavLink to={ApplicationPaths.PatientChat}>
                        <Button className="btn-style">Записатись на прийом</Button>
                    </NavLink>
                    <NavLink to={ApplicationPaths.AnalysisPage}>
                        <Button className="btn-style">Аналізи</Button>
                    </NavLink>
                    <NavLink to={ApplicationPaths.ChartsPage}>
                        <Button className="btn-style">Графіки</Button>
                    </NavLink>

                    <NavLink to={ApplicationPaths.ChartsPage}>
                        <Button className="btn-style">Пройти опитування</Button>
                    </NavLink>
                </>}

                {context.isDoctor && <>
                    <NavLink to={ApplicationPaths.PatientsPage}>
                        <Button className="btn-style">Пацієнти</Button>
                    </NavLink>
                    <NavLink to={ApplicationPaths.CalendarPage}>
                        <Button className="btn-style">Записи на прийом</Button>
                    </NavLink>
                </>}

                <NavLink to={ApplicationPaths.LogoutPage}>
                    <Button className="btn-style danger">Вийти</Button>
                </NavLink>
            </ButtonGroup>
        </Col>
    );
}

export default VerticalNavbar;
