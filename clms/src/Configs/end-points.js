import { baseUrl } from "./config";

export const AuthenticateEndPoints ={
    login : `${baseUrl}/Authenticate/login`,
    register : `${baseUrl}/Authenticate/register`,
    registerAdmin : `${baseUrl}/Authenticate/register-admin`,
}

export const EndPoints ={
    products : `${baseUrl}/Product`,
    productLicense : `${baseUrl}/ProductLicense`,
}