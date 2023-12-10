import React from "react";
import AuthContext from "./AuthContext";
import $ from "jquery";
import {getInfoUrl, getStoredToken} from "./api";
import {Form} from "react-bootstrap";
import AppNavbar from "./AppNavbar";

export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.loadUser = this.loadUser.bind(this);
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        if (!this.context.isLoggedIn) {
            return;
        }

        $.ajax({
                url: getInfoUrl,
                method: "GET",
                data: {userId: this.context.userId},
                headers: {
                    'Authorization': `Bearer ${getStoredToken()}`
                },
            }
        ).done(response => {
            console.log(`Received GUID: ${response.userId}`);
            this.setState({
                ...this.state,
                username: response.email,
                userId: response.userId,
                dateOfBirth: response.dateOfBirth,
            })
        })
    }

    render() {
        return <>
            <AppNavbar/>
            <Form className="mt-3 mb-3 border border-1 p-4 rounded-1 col-4 offset-4">
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={this.state.username} disabled/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>User Id</Form.Label>
                    <Form.Control value={this.state.userId} disabled/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control value={this.state.dateOfBirth} disabled/>
                </Form.Group>
            </Form>
        </>
    }
}

UserInfo.contextType = AuthContext;