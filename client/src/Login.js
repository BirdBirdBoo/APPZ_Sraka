import React from "react";
import {Button, Form, ThemeProvider} from "react-bootstrap";
import $ from "jquery";
import {authUrl, setStoredToken} from "./api";
import AppNavbar from "./AppNavbar";
import AuthContext from "./AuthContext";
import {Navigate} from "react-router-dom";
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
            headers: {'Access-Control-Allow-Origin': '*'},
        })
            .done(response => {
                console.log(`Received GUID ${response.userId}`);

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

    render() {
        return (
            <ThemeProvider>
                <AppNavbar isLogin/>
                <Form onSubmit={this.handleSubmit} className="mt-3 mb-3 border border-1 p-4 rounded-1 col-4 offset-4">
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="email" value={this.state.email}
                                      onChange={this.handleValueChange}
                                      required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={this.state.password}
                                      onChange={this.handleValueChange}
                                      minLength="3" maxLength="120"/>
                    </Form.Group>

                    {this.state.isError && <p className="text-danger">Wrong username or password</p>}
                    {this.state.isSuccessful && <Navigate to={ApplicationPaths.RootPath}/>}

                    <Button variant="primary" type="submit">Login</Button>
                </Form>
            </ThemeProvider>
        );
    }
}

LoginForm.contextType = AuthContext;