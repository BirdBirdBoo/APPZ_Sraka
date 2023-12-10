import React from "react";
import {Button, Form, ThemeProvider} from "react-bootstrap";
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
                <AppNavbar isRegister/>
                <div className="px-4 px-sm-0">
                    <Form onSubmit={this.handleSubmit}
                          className="mt-4 border border-1 p-4 rounded-1 col-sm-6 offset-sm-3">
                        <h2 className="mb-4">Register</h2>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" value={this.state.email}
                                          onChange={this.handleValueChange}
                                          required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control type="date" name="birthDate" value={this.state.birthDate}
                                          onChange={this.handleValueChange}
                                          max="2008-01-01"/>

                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={this.state.password}
                                          onChange={this.handleValueChange}
                                          minLength="3" maxLength="120" required/>
                        </Form.Group>

                        {this.state.isError && <p className="text-danger">Input is invalid</p>}
                        {this.state.isSuccessful && <Navigate to={ApplicationPaths.RootPath}/>}

                        <Button variant="primary" type="submit">Register</Button>
                    </Form>
                </div>
            </ThemeProvider>
        );
    }
}

RegisterForm.contextType = AuthContext;