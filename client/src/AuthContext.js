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

    if (isDoctor) {
        userAsDoctorId = "test-user-as-doctor-id";
        userAsDoctorInfo = {
            "doctorId": "503a7d52-7965-4d94-bfe1-cf903c8c0a5f",
            "userId": "51185347-28e0-4cf6-805a-42c0ee289f35",
            "rating": 4.8,
            "proffesion": "Нейрохірург",
            "experience": 12,
            "patients": [
                {
                    "patientId": "dd3a8501-b1b0-4cf2-acb2-0690244882c6",
                    "userId": "82e526ed-c408-4606-b5d7-ce142fac1025",
                    "doctorId": "503a7d52-7965-4d94-bfe1-cf903c8c0a5f",
                    "bloodType": "1-",
                    "allergens": "молоко",
                    "userData": {
                        "userId": "82e526ed-c408-4606-b5d7-ce142fac1025",
                        "email": "dmytro.pat@gmail.com",
                        "dateOfBirth": "2016-01-25",
                        "role": "Patient",
                        "firstName": "Дмитро",
                        "secondName": "Вишневецький",
                        "phoneNumber": "+380 97 000 00 15"
                    }
                },
                {
                    "patientId": "7648ac56-ae5c-45a0-8c69-402f0cb9b0c4",
                    "userId": "c00d7002-2bcd-4d15-9bfb-8faea694ced8",
                    "doctorId": "503a7d52-7965-4d94-bfe1-cf903c8c0a5f",
                    "bloodType": "3+",
                    "allergens": "горіхи",
                    "userData": {
                        "userId": "c00d7002-2bcd-4d15-9bfb-8faea694ced8",
                        "email": "maksym.pat@gmail.com",
                        "dateOfBirth": "1990-07-07",
                        "role": "Patient",
                        "firstName": "Максим",
                        "secondName": "Оса",
                        "phoneNumber": "+380 97 000 00 14"
                    }
                }
            ]
        }
    }

    if (isPatient) {
        userAsPatientInfo = {
            "patientId": "test-user-as-patient-id",
            "userId": "c00d7002-2bcd-4d15-9bfb-8faea694ced8",
            "doctorId": "503a7d52-7965-4d94-bfe1-cf903c8c0a5f",
            "bloodType": "3+",
            "allergens": "горіхи",
            "userData": {
                "userId": "c00d7002-2bcd-4d15-9bfb-8faea694ced8",
                "email": "maksym.pat@gmail.com",
                "dateOfBirth": "1990-07-07",
                "role": "Patient",
                "firstName": "Максим",
                "secondName": "Оса",
                "phoneNumber": "+380 97 000 00 14"
            }
        }
        userAsPatientId = "test-user-as-patient-id";
    }
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