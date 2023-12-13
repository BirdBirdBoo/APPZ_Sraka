import $ from "jquery";
import React from 'react';
import {AuthHeader, authTokenUrl, getStoredToken} from "./api";

let isLoggedIn = false;
let userId = undefined;
let userData = undefined;

let isDesignMode = process.env.REACT_APP_IS_DESIGN_MODE;
let isAdmin = process.env.REACT_APP_IS_ADMIN && isDesignMode;
let isDoctor = process.env.REACT_APP_IS_DOCTOR && isDesignMode;
let isPatient = process.env.REACT_APP_IS_PATIENT && isDesignMode;

let userAsDoctorInfo = undefined;
let userAsPatientInfo = undefined;
let patientDoctorInfo = undefined;

let patientDoctorId = undefined;
let userAsPatientId = undefined;
let userAsDoctorId = undefined;

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
            console.log("THE FUCKING AUTH DATA: ", authData)
            isLoggedIn = true;
            userData = authData.userData;
            userId = authData.userId;
            isAdmin = authData.role === "Admin";
            isDoctor = authData.role === "Doctor";
            isPatient = authData.role === "Patient";

            userAsDoctorId = authData.userAsDoctorId;
            userAsDoctorInfo = authData.userAsDoctorInfo;

            userAsPatientId = authData.userAsPatientId;
            userAsPatientInfo = authData.userAsPatientInfo;

            patientDoctorId = authData.patientDoctorId;
            patientDoctorInfo = authData.patientDoctorInfo;
        },
        fail: (_, __, error) => {
            console.log(`Could not login: ${error}`);
        }
    });
}

if (isDesignMode) {
    isLoggedIn = true;
    userId = "test-user-id";

    userData = {
        email: "max.rudko@movi.ua",
        firstName: "Max",
        secondName: "Rudko",
        phoneNumber: "+380 99 999 99 99",
        dateOfBirth: "1999-09-09",
    };
}

const AuthContext = React.createContext({
    isLoggedIn,
    isAdmin,
    isDoctor,
    isPatient,
    userId,
    isDesignMode,
    userData,
    userAsDoctorId,
    userAsDoctorInfo,
    userAsPatientId,
    userAsPatientInfo,
    patientDoctorId,
    patientDoctorInfo,
});

export default AuthContext;