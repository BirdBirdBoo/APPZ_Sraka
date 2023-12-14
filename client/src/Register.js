import React from "react";
import {Button, Form, Row, ThemeProvider} from "react-bootstrap";
import $ from "jquery";
import {registerUrl, setStoredToken} from "./api";
import AppNavbar from "./AppNavbar";
import {Navigate} from "react-router-dom";
import AuthContext from "./AuthContext";
import ApplicationPaths from "./paths";

export class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            birthDate: "2003-05-02",
            name: "",
            lastName: "",
        };

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

    handleSubmit(event) {
        $.ajax(registerUrl, {
            method: "POST",
            data: JSON.stringify(this.state),
            dataType: 'json',
            contentType: 'application/json',
            headers: {'Access-Control-Allow-Origin': '*'},
        })
            .done(response => {
                console.log(`Received GUID: ${response.userId}`);

                setStoredToken(response.token);

                this.context.isLoggedIn = true;
                this.context.userId = response.userId;
                this.context.isAdmin = response.role === "Admin";

                this.handleResponse(true);
            })
            .fail(error => {
                console.log(error);

                this.handleResponse(false);
            })
        event.preventDefault();
    }

    handleResponse(isSuccessful) {
        this.setState({
            ...this.state,
            isSuccessful,
            isError: !isSuccessful
        })
    }

    render() {
        return (
            <ThemeProvider>
                <div className="px-4 px-sm-0">
                    <Form onSubmit={this.handleSubmit}
                          className="mt-3 mb-3 rounded-0 col-4 offset-4 i-am-blue-labadibabada">
                        <h4 className="text-center py-1" style={{background: '#82BBFF'}}>Реєстрація</h4>
                        <Form.Group className="p-4">
                            <Form.Group className="mb-3">
                                <Form.Label>Електронна пошта</Form.Label>
                                <Form.Control name="email" type="email" value={this.state.email}
                                              onChange={this.handleValueChange}
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Ім'я</Form.Label>
                                <Form.Control name="firstName" value={this.state.firstName}
                                              onChange={this.handleValueChange}
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Прізвище</Form.Label>
                                <Form.Control name="lastName" value={this.state.lastName}
                                              onChange={this.handleValueChange}
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Номер телефону</Form.Label>
                                <Form.Control name="phoneNumber" value={this.state.phoneNumber}
                                              onChange={this.handleValueChange}
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Дата народження</Form.Label>
                                <Form.Control type="date" name="birthDate" value={this.state.birthDate}
                                              onChange={this.handleValueChange}
                                              max="2008-01-01"/>

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password}
                                              onChange={this.handleValueChange}
                                              minLength="3" maxLength="120" required/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Повторіть пароль</Form.Label>
                                <Form.Control type="password" name="passwordRepeat" value={this.state.passwordRepeat}
                                              onChange={this.handleValueChange}
                                              isInvalid={this.state.password !== this.state.passwordRepeat}
                                              minLength="3" maxLength="120" required/>
                            </Form.Group>

                            {this.state.isError && <p className="text-danger">Input is invalid</p>}
                            {this.state.isSuccessful && <Navigate to={ApplicationPaths.RootPath}/>}

                            <Row className='mb-3 mx-1'>
                                <button type="submit" className='btn-style small submit'>Зареєструватись</button>
                            </Row>
                            <Row className='mx-1'>
                                <Button className='btn-style small'
                                        type="button"
                                        href={ApplicationPaths.LoginPage}>
                                    Увійти
                                </Button>
                            </Row>
                        </Form.Group>
                    </Form>
                </div>
            </ThemeProvider>
        );
    }
}

RegisterForm.contextType = AuthContext;