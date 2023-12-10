import Cookies from "js-cookie";

export const baseApiUrl = "https://localhost:7130/api";

const baseLoginUrl = `${baseApiUrl}/Login`;

export const registerUrl = `${baseLoginUrl}/register`;
export const authUrl = `${baseLoginUrl}/auth`;
export const authTokenUrl = `${baseLoginUrl}/authToken`;
export const getInfoUrl = `${baseLoginUrl}/getInfo?`;

const baseImagesUrl = `${baseApiUrl}/Image`;

export const getImagesUrl = `${baseImagesUrl}/getImages`;
export const newImageUrl = `${baseImagesUrl}/new`;
export const updateImageUrl = `${baseImagesUrl}/update`;
export const deleteImageUrl = `${baseImagesUrl}/delete`;

export function AuthHeader() {
    return {
        'Authorization': `Bearer ${getStoredToken()}`
    }
}

export function getStoredToken() {
    return Cookies.get('bearer-token');
}

export function setStoredToken(token) {
    Cookies.set('bearer-token', token);
}