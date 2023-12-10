import React, {useContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {RegisterForm} from "./Register";
import {LoginForm} from "./Login";
import {setStoredToken} from "./api";
import AuthContext from "./AuthContext";
import UserInfo from "./UserInfo";
import ApplicationPaths from "./paths";

const root = ReactDOM.createRoot(document.getElementById('root'));

function Logout() {
    const context = useContext(AuthContext);

    setStoredToken(undefined);
    context.isLoggedIn = false;
    context.isAdmin = false;
    context.userId = '';

    return <Navigate to={ApplicationPaths.RootPath}/>;
}

root.render(
    <BrowserRouter>
        <Routes>
            <Route path={ApplicationPaths.RootPath} element={<App/>}/>
            <Route path={ApplicationPaths.RegisterPage} element={<RegisterForm/>}/>
            <Route path={ApplicationPaths.LoginPage} element={<LoginForm/>}/>
            <Route path={ApplicationPaths.LogoutPage} element={<Logout/>}/>
            <Route path={ApplicationPaths.UserInfoPage} element={<UserInfo/>}/>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
