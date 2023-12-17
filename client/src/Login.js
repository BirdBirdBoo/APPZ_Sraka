import React from "react";
import { Button, Col, Form, Row, ThemeProvider } from "react-bootstrap";
import $ from "jquery";
import { authUrl, setStoredToken } from "./api";
import AppNavbar from "./AppNavbar";
import AuthContext from "./AuthContext";
import { Navigate, NavLink } from "react-router-dom";
import ApplicationPaths from "./paths";

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
    }

    handleValueChange(event) {
        const newState = {
            ...this.state,
            [event.target.name]: event.target.value
        };

        this.setState(newState);
    }

    handleResponse(isSuccessful) {
        this.setState({
            ...this.state,
            isSuccessful,
            isError: !isSuccessful
        })
    }

    handleSubmit(event) {
        $.ajax(authUrl, {
            method: "POST",
            data: JSON.stringify(this.state),
            dataType: 'json',
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin': '*' },
        })
            .done(response => {
                console.log(`Received GUID ${response.userId}`);

                setStoredToken(response.token);

                this.context.isLoggedIn = true;
                this.context.userId = response.userId;
                this.context.userData = response.userData;
                this.context.isAdmin = response.role === "Admin";
                this.context.isDoctor = response.role === "Doctor";
                this.context.isPatient = response.role === "Patient";

                this.context.userAsDoctorId = response.userAsDoctorId;
                this.context.userAsDoctorInfo = response.userAsDoctorInfo;

                this.context.userAsPatientId = response.userAsPatientId;
                this.context.userAsPatientInfo = response.userAsPatientInfo;

                this.context.patientDoctorId = response.patientDoctorId;
                this.context.patientDoctorInfo = response.patientDoctorInfo;

                this.handleResponse(true);
            })
            .fail(error => {
                console.log(error);
                this.handleResponse(false);
            })
        event.preventDefault();
    }

    render() {
        return (
            <ThemeProvider>
                <Form onSubmit={this.handleSubmit}
                    className="mt-3 mb-3 rounded-0 col-md-4 col-sm-8 offset-md-4 offset-sm-2 i-am-blue-labadibabada">
                    <h4 className="text-center py-1" style={{ background: '#82BBFF' }}>Авторизація</h4>
                    <Form.Group className="p-4">
                        <Form.Group className="mb-3">
                            <Form.Label>Електронна пошта</Form.Label>
                            <Form.Control name="email" value={this.state.email}
                                onChange={this.handleValueChange}
                                required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" name="password" value={this.state.password}
                                onChange={this.handleValueChange}
                                minLength="3" maxLength="120" />
                        </Form.Group>

                        {this.state.isError && <p className="text-danger">Wrong username or password</p>}
                        {this.state.isSuccessful && <Navigate to={ApplicationPaths.RootPath} />}

                        {/* place buttons side by side */}
                        <Row className='mb-3 mx-1'>
                            <button type="submit" className='btn-style small submit'>Увійти</button>
                        </Row>
                        <Row className='mx-1'>
                            <NavLink to={ApplicationPaths.RegisterPage} className='p-0' >
                                <Button 
                                className='btn-style small'
                                type="button">Реєстрація</Button>
                            </NavLink>
                        </Row>
                    </Form.Group>
                </Form>
            </ThemeProvider>
        );
    }
}

LoginForm.contextType = AuthContext;