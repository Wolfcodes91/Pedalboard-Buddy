import * as usersAPI from './users-api'

export async function signUp(userData) {
    // Delegate the network request code to the 
    // users-api.js module which will ultimately 
    // return the JWT (JSON Web Token)
    const token = await usersAPI.signUp(userData);
    // persist the token to localStorage
    localStorage.setItem('token', token);
    return getUser();
}

export function getToken() {
    const token = localStorage.getItem('token');
    // getItem will return null if no key
    if (!token) return null 
    const payload = JSON.parse(atob(token.split('.')[1]));
    // A JWTs expiration is expressed in seconds, not milliseconds 
    if (payload.exp < Date.now() / 1000) {
        // token has expired
        localStorage.removeItem('token');
        return null; 
    }
    return token;
}


export function getUser() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
    localStorage.removeItem('token');
}

export async function login(credentials) {
    const token = await usersAPI.login(credentials);
    localStorage.setItem('token', token);
    return getUser()
}

export async function checkToken() {
    // Just so that you don't forget how to use .then
    return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr));
}