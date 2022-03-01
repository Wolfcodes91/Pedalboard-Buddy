import * as usersAPI from './users-api'

export async function signUp(userData) {
    // Delegate the network request code to the 
    // users-api.js module which will ultimately 
    // return the JWT (JSON Web Token)
    const token = await usersAPI.signUp(userData);
    // baby step by returning whatever is sent back by the server 
    return token;
}