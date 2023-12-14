import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import '../styles/styles.css';
import ApplicationPaths from "../paths";

function VerticalDoctorNavbar() {



    return (
        <ButtonGroup vertical size="lg" className="button-group-wrapper">
            <Button className="btn-style" href={ApplicationPaths.ProfilePage}>Профіль</Button>
            <Button className="btn-style" href={ApplicationPaths.PatientsPage}>Пацієнти</Button>
            <Button className="btn-style">Записи на прийом</Button>
            <Button className='btn-style-logout' href={ApplicationPaths.LogoutPage}>Вийти</Button>
        </ButtonGroup>
    );
}

export default VerticalDoctorNavbar;