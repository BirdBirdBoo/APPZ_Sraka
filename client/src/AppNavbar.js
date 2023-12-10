import {Button, Container, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import AuthContext from "./AuthContext";
import {useContext, useEffect, useState} from "react";
import {AuthHeader, getInfoUrl} from "./api";
import ApplicationPaths from "./paths";

function initUser(context, setUsername) {
    fetch(getInfoUrl + new URLSearchParams({
        userId: context.userId
    }), {
        headers: new Headers({
            ...AuthHeader(),
        })
    })
        .then(response => response.json())
        .then(data => setUsername(data.email));
}

export default function AppNavbar(props) {
    let context = useContext(AuthContext);
    let [username, setUsername] = useState('');

    useEffect(() => {
        if (context.isLoggedIn && !context.isDesignMode) {
            initUser(context, setUsername);
        }

        if (context.isDesignMode) {
            setUsername("test@test.com");
        }
    }, [context]);


    return <>
        <Navbar bg="light" expand="md" sticky="top" className="py-3">
            <Container>
                <Navbar.Brand href={ApplicationPaths.RootPath}>The Food Gallery</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="w-100">
                        {!context.isLoggedIn && !props.isLogin &&
                            <Nav.Link href={ApplicationPaths.LoginPage}>Log In</Nav.Link>}
                        {!context.isLoggedIn && !props.isRegister &&
                            <Nav.Link href={ApplicationPaths.RegisterPage}>Register</Nav.Link>}

                        {context.isLoggedIn &&
                            <NavDropdown className="ms-auto" title={`Hi, ${username}`}>
                                <NavDropdown.Item href={ApplicationPaths.UserInfoPage}>My Profile</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href={ApplicationPaths.LogoutPage}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
}
