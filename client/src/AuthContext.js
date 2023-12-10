import $ from "jquery";
import React from 'react';
import {AuthHeader, authTokenUrl, getStoredToken} from "./api";

let isLoggedIn = false;
let userId = undefined;

let isDesignMode = process.env.REACT_APP_IS_DESIGN_MODE;
let isAdmin = process.env.REACT_APP_IS_ADMIN && isDesignMode;

const storedToken = getStoredToken();

if (storedToken !== undefined && !isDesignMode) {
    $.ajax({
        url: authTokenUrl,
        async: false,
        method: "POST",
        headers: {
            ...AuthHeader()
        },
        success: (authData) => {
            isLoggedIn = true;
            userId = authData.userId;
            isAdmin = authData.role === "Admin";
        },
        fail: (_, __, error) => {
            console.log(`Could not login: ${error}`);
        }
    });
}

if (isDesignMode) {
    isLoggedIn = true;
    userId = "test-user-id";
}

const AuthContext = React.createContext({
    isLoggedIn,
    isAdmin,
    userId,
    isDesignMode
});

export default AuthContext;